import mongoose, { Connection } from "mongoose";
import dns from "dns";

// Fallback DNS for Node.js SRV resolution issue on certain local networks
function configureDns(uri: string) {
  if (uri.startsWith("mongodb+srv://")) {
    try {
      // Avoid resetting if it's already set or custom
      dns.setServers(["8.8.8.8", "1.1.1.1"]);
    } catch (err) {
      console.warn("Mongoose: Failed to set custom DNS servers", err);
    }
  }
}

interface MongooseConnectionsCache {
  connections: { [key: string]: Connection };
  promises: { [key: string]: Promise<Connection> };
}

declare global {
  var mongooseCache: MongooseConnectionsCache | undefined;
}

const cached = (global.mongooseCache as any) || {};

if (!cached.connections) {
  cached.connections = {};
}
if (!cached.promises) {
  cached.promises = {};
}

global.mongooseCache = cached;

interface ResolvedConnectionInfo {
  connectionString: string;
  cacheKey: string;
}

function resolveConnectionString(uri: string, path: string = ""): ResolvedConnectionInfo {
  const trimmedUri = uri.trim();
  const dbName = path.replace(/^\//, "").trim();

  // Pattern matches:
  // Group 1: protocol and cluster host/auth (e.g. mongodb+srv://user:pass@cluster0.mongodb.net)
  // Group 2: existing database name if any (e.g. Thetasofts)
  // Group 3: query string if any (e.g. ?retryWrites=true)
  const regex = /^(mongodb(?:\+srv)?:\/\/[^\/?#]+)(?:\/([^?#]*))?(\?.*)?$/;
  const match = trimmedUri.match(regex);

  if (!match) {
    return { connectionString: trimmedUri, cacheKey: dbName || "default" };
  }

  const base = match[1];
  const uriDb = (match[2] || "").trim();
  const query = match[3] || "";

  // If MONGODB_URI already specifies a database name, use that database
  if (uriDb) {
    return {
      connectionString: `${base}/${uriDb}${query}`,
      cacheKey: uriDb,
    };
  }

  // If no database was in MONGODB_URI, but a path was provided, use it as database name
  if (dbName) {
    return {
      connectionString: `${base}/${dbName}${query}`,
      cacheKey: dbName,
    };
  }

  return {
    connectionString: `${base}${query}`,
    cacheKey: "default",
  };
}

export async function dbConnect(path: string = ""): Promise<Connection> {
  const rawUri = process.env.MONGODB_URI?.trim();

  if (!rawUri) {
    throw new Error("Please define the MONGODB_URI environment variable");
  }

  configureDns(rawUri);

  const { connectionString, cacheKey } = resolveConnectionString(rawUri, path);

  if (cached.connections[cacheKey]) {
    return cached.connections[cacheKey];
  }

  if (!cached.promises[cacheKey]) {
    cached.promises[cacheKey] = mongoose.createConnection(connectionString, {
      bufferCommands: false,
      family: 4,
    }).asPromise();
  }

  try {
    cached.connections[cacheKey] = await cached.promises[cacheKey];
  } catch (error) {
    delete cached.promises[cacheKey];
    throw error;
  }

  return cached.connections[cacheKey];
}
