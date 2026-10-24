import React, { useEffect, useState, useRef } from 'react';

interface TextScrambleProps {
  text: string;
  speed?: number;
  trigger?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const GLYPHS = '!<>-_\\/[]{}—=+*^?#________0123456789';

export const TextScramble: React.FC<TextScrambleProps> = ({
  text,
  speed = 35,
  trigger = true,
  className = '',
  style = {},
}) => {
  const [displayText, setDisplayText] = useState(text);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!trigger) {
      setDisplayText(text);
      return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setDisplayText(text);
      return;
    }

    let frame = 0;
    const totalFrames = text.length * 3;

    const update = () => {
      let output = '';
      let complete = 0;

      for (let i = 0; i < text.length; i++) {
        const from = text[i];
        if (from === ' ' || from === '/' || from === '-' || from === ':') {
          output += from;
          complete++;
          continue;
        }

        const charProgress = Math.floor((frame / totalFrames) * text.length);
        if (i < charProgress) {
          output += from;
          complete++;
        } else {
          output += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
      }

      setDisplayText(output);

      if (complete < text.length && frame < totalFrames + 5) {
        frame++;
        frameRef.current = window.setTimeout(update, speed);
      } else {
        setDisplayText(text);
      }
    };

    update();

    return () => {
      if (frameRef.current) clearTimeout(frameRef.current);
    };
  }, [text, trigger, speed]);

  return (
    <span className={className} style={{ ...style, fontFamily: 'monospace, var(--font-heading)' }}>
      {displayText}
    </span>
  );
};
