"use client"
import { useEffect, useState } from "react";

export interface ResponsiveQuote {
  desktop: string;
  mobile: [string, string];
}

interface TypewriterProps {
  quotes: (string | ResponsiveQuote)[];
  className?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseTime?: number;
}

const Typewriter: React.FC<TypewriterProps> = ({ 
  quotes, 
  className, 
  typingSpeed = 90, 
  deletingSpeed = 50, 
  pauseTime = 1800 
}) => {
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!quotes.length) return;
    const item = quotes[index % quotes.length];
    
    // Normalize into line1 and line2 targets
    const target1 = typeof item === "string" ? item : item.mobile[0];
    const target2 = typeof item === "string" ? "" : item.mobile[1];

    let timeout: NodeJS.Timeout;

    if (!isDeleting) {
      // Typing phase: line 1 first, then line 2
      if (line1.length < target1.length) {
        timeout = setTimeout(() => {
          setLine1(target1.substring(0, line1.length + 1));
        }, typingSpeed);
      } else if (target2 && line2.length < target2.length) {
        timeout = setTimeout(() => {
          setLine2(target2.substring(0, line2.length + 1));
        }, typingSpeed);
      } else {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, pauseTime);
      }
    } else {
      // Deleting phase: line 2 first, then line 1
      if (line2.length > 0) {
        timeout = setTimeout(() => {
          setLine2(line2.substring(0, line2.length - 1));
        }, deletingSpeed);
      } else if (line1.length > 0) {
        timeout = setTimeout(() => {
          setLine1(line1.substring(0, line1.length - 1));
        }, deletingSpeed);
      } else {
        setIsDeleting(false);
        setIndex((prev) => prev + 1);
      }
    }

    return () => clearTimeout(timeout);
  }, [line1, line2, isDeleting, index, quotes, typingSpeed, deletingSpeed, pauseTime]);

  const currentItem = quotes[index % quotes.length];
  const target1 = typeof currentItem === "string" ? currentItem : currentItem.mobile[0];
  const hasLine2 = typeof currentItem !== "string";
  
  // Is line 1 currently the active typing line?
  const isLine1Active = !isDeleting ? line1.length < target1.length : line2.length === 0;

  return (
    <span className={`inline-block ${className || ""}`}>
      {/* Mobile view: 2 lines stacked, with cursor attached directly to line 2 (or line 1 while line 1 types) */}
      <span className="flex md:hidden flex-col items-center justify-center text-center">
        <span className="whitespace-nowrap">
          {line1}
          {isLine1Active && hasLine2 && (
            <span className="inline-block animate-pulse text-foreground ml-0.5 select-none">|</span>
          )}
        </span>
        <span className="whitespace-nowrap min-h-[1.15em]">
          {line2}
          {(!isLine1Active || !hasLine2) && (
            <span className="inline-block animate-pulse text-foreground ml-0.5 select-none">|</span>
          )}
        </span>
      </span>

      {/* Desktop view (md+): single continuous line */}
      <span className="hidden md:inline whitespace-nowrap">
        <span>{line1}{line2 ? ` ${line2}` : ""}</span>
        <span className="inline-block animate-pulse text-foreground ml-0.5 select-none">_</span>
      </span>
    </span>
  );
};

export default Typewriter;
