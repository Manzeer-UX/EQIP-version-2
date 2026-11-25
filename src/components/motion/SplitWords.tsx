import { Fragment } from "react";

/**
 * Splits a headline into words that each rise out of their own line slot.
 * Used inside <Reveal kind="words"> (on scroll) or a .load-words parent
 * (on page load). Spaces stay real text, so wrapping and reading are normal.
 * The last two words are kept together so a headline never ends on a lone word.
 */
export function SplitWords({ text, start = 0, keepLast = true }: { text: string; start?: number; keepLast?: boolean }) {
  const words = text.split(" ");
  if (keepLast && words.length > 2) {
    const last = words.pop()!;
    words[words.length - 1] += ` ${last}`;
  }
  return (
    <>
      {words.map((word, i) => (
        <Fragment key={i}>
          <span className="split-word">
            <span className="split-inner" style={{ ["--i" as string]: start + i }}>
              {word}
            </span>
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </>
  );
}
