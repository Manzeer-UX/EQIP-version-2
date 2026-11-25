import Image from "next/image";
import lockup from "@/assets/brand/eqip-logo.svg";

/**
 * EQIP primary lockup, placed exactly as supplied (white letters for Ink and
 * Navy grounds). Never redraw, recolour or crop it. The brand minimum width
 * for the lockup is 120px.
 */
export function Logo({
  width = 120,
  priority = false,
  className,
}: {
  width?: number;
  priority?: boolean;
  className?: string;
}) {
  const w = Math.max(120, width);
  return (
    <Image
      src={lockup}
      alt="EQIP"
      width={w}
      height={Math.round((w * 416.721) / 620)}
      priority={priority}
      className={className}
    />
  );
}
