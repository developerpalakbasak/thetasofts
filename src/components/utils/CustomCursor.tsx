"use client";

import { useEffect, useState } from 'react';
import styles from './CustomCursor.module.css';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useTheme } from 'next-themes';

const CustomCursor = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hasHover, setHasHover] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  const { resolvedTheme } = useTheme();
  const isDark = mounted ? resolvedTheme === 'dark' : true;
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    setMounted(true);
    const mediaQuery = window.matchMedia('(hover: hover)');
    setHasHover(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setHasHover(e.matches);
    };

    mediaQuery.addEventListener('change', handleMediaChange);
    return () => mediaQuery.removeEventListener('change', handleMediaChange);
  }, []);

  useEffect(() => {
    if (!hasHover) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      
      try {
        const isInteractive = 
          target.tagName === 'A' || 
          target.tagName === 'BUTTON' || 
          !!target.closest('button') || 
          !!target.closest('a') ||
          target.classList.contains('clickable') ||
          window.getComputedStyle(target).cursor === 'pointer';
          
        setIsHovered(isInteractive);
      } catch {
        setIsHovered(false);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleHover);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleHover);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };

  }, [cursorX, cursorY, isVisible, hasHover]);

  if (!hasHover) return null;

  return (
    <>
      <motion.div
        className={styles.cursor}
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        animate={{
          scale: isHovered ? 2.2 : 1,
          opacity: isVisible ? 1 : 0,
          backgroundColor: isDark
            ? (isHovered ? 'rgba(156, 254, 202, 0.15)' : 'rgba(156, 254, 202, 0.03)')
            : (isHovered ? 'rgba(5, 150, 105, 0.15)' : 'rgba(5, 150, 105, 0.04)'),
          borderColor: isDark
            ? (isHovered ? 'rgba(156, 254, 202, 0.85)' : 'rgba(156, 254, 202, 0.4)')
            : (isHovered ? 'rgba(5, 150, 105, 0.85)' : 'rgba(5, 150, 105, 0.45)'),
          boxShadow: isDark
            ? (isHovered ? '0 0 16px rgba(156, 254, 202, 0.25)' : '0 0 10px rgba(156, 254, 202, 0.1)')
            : (isHovered ? '0 0 14px rgba(5, 150, 105, 0.3)' : '0 0 8px rgba(5, 150, 105, 0.15)'),
          borderWidth: isHovered ? '2px' : '1px'
        }}
        transition={{
          opacity: { duration: 0.15 },
          scale: { type: "spring", stiffness: 350, damping: 22 }
        }}
      />
      <motion.div
        className={styles.cursorDot}
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          scale: isHovered ? 1.5 : 1,
          opacity: isVisible ? 1 : 0,
          backgroundColor: isDark
            ? (isHovered ? '#ffffff' : '#9cfeca')
            : (isHovered ? '#0f172a' : '#059669'),
          boxShadow: isDark
            ? (isHovered ? '0 0 10px #ffffff' : '0 0 8px #9cfeca')
            : (isHovered ? '0 0 8px rgba(15, 23, 42, 0.5)' : '0 0 8px rgba(5, 150, 105, 0.6)')
        }}
        transition={{
          opacity: { duration: 0.15 },
          scale: { type: "spring", stiffness: 450, damping: 25 }
        }}
      />
    </>
  );
};

export default CustomCursor;
