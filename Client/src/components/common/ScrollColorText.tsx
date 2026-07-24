import { motion, MotionValue, useTransform } from "framer-motion";

interface ScrollColorTextProps {
  text: string;
  scrollProgress: MotionValue<number>;
  /** [start, end] of scrollProgress over which the WHOLE reveal happens */
  range: [number, number];
  /** color at the start of the reveal (washed-out / light) */
  fromColor?: string;
  /** color once fully revealed (the "landed" state) */
  toColor?: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

/**
 * Splits `text` into words and animates each word's color from
 * `fromColor` to `toColor`, staggering each word's sub-range slightly
 * within the overall `range` — so the color sweeps across the text
 * left-to-right as the section scrolls into place, rather than every
 * word changing color at once.
 */
const ScrollColorText = ({
  text,
  scrollProgress,
  range,
  fromColor = "#6b7280", // muted gray — "light"/washed-out state
  toColor = "#ffffff", // full white — "landed" state
  className = "",
  as = "span",
}: ScrollColorTextProps) => {
  const words = text.split(" ");
  const [start, end] = range;
  const totalSpan = end - start;
  // Cast needed because `motion` isn't typed for dynamic string indexing —
  // at runtime motion.h1/h2/h3/p/span all exist and behave identically.
  const Tag = motion[as] as typeof motion.span;

  return (
    <Tag className={className}>
      {words.map((word, i) => {
        // Each word gets its own slightly-offset sub-range within the
        // overall range, so words later in the sentence finish their
        // color transition slightly after earlier ones — the sweep.
        const wordStart = start + (totalSpan * i) / (words.length + 2);
        const wordEnd = wordStart + totalSpan * 0.5;

        return (
          <WordSpan
            key={i}
            word={word}
            isLast={i === words.length - 1}
            scrollProgress={scrollProgress}
            wordRange={[wordStart, Math.min(wordEnd, end)]}
            fromColor={fromColor}
            toColor={toColor}
          />
        );
      })}
    </Tag>
  );
};

const WordSpan = ({
  word,
  isLast,
  scrollProgress,
  wordRange,
  fromColor,
  toColor,
}: {
  word: string;
  isLast: boolean;
  scrollProgress: MotionValue<number>;
  wordRange: [number, number];
  fromColor: string;
  toColor: string;
}) => {
  const color = useTransform(scrollProgress, wordRange, [fromColor, toColor]);

  return (
    <motion.span style={{ color }}>
      {word}
      {!isLast && "\u00A0"}
    </motion.span>
  );
};

export default ScrollColorText;
