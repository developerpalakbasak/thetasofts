import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk, Syne } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/section/Navbar";
import Footer from "@/components/section/Footer";
import CustomCursor from "@/components/utils/CustomCursor";
import Atmosphere from "@/components/utils/Atmosphere";
import { Providers } from "@/components/theme";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});
const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "ThetaSofts — We Build Websites, Apps & Online Stores That Grow Your Business",
  description: "ThetaSofts is a full-service digital agency. We build beautiful websites, mobile apps, and online stores for businesses of all sizes. Get found on Google, sell more, and grow faster — without the tech headache.",
  keywords: "software development, software agency, custom software development, web development, website development, web application development, mobile app development, iOS app development, Android app development, desktop app development, Windows app development, macOS app development, Linux app development, cross-platform app development, custom applications, business software, SaaS development, software maintenance, software management, software solutions, digital solutions, UI UX design, full stack development, e-commerce development",
  verification: {
    google: "KMrbK_PGnXRbjMg6r6ZJYJ_z3mbDiVtffzUHC0ERqG4",
  },
  openGraph: {
    title: "ThetaSofts — Your Business, Online & Growing",
    description: "We build websites, apps, and online stores that get results. No tech jargon. Just real growth for your business.",
    type: "website",
    url: "https://thetasofts.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "ThetaSofts — Websites, Apps & Online Stores",
    description: "We help businesses grow online. Get a free consultation today.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} ${syne.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground relative">
        <Providers>
          <CustomCursor />
          <Atmosphere />
          <Navbar />
          <main className="flex-1 w-full relative z-10">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
