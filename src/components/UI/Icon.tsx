// src/components/UI/InputItem.tsx
import React from "react";

interface IconProps {
  iconComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  size?: number;
  fillColor?: string;
  outlineColor?: string;
}

const Icon = ({
  iconComponent: IconComponent,
  size,
  fillColor = "currentColor",
  outlineColor = "currentColor",
}: IconProps) => (
  <div
    className={`
      inline-flex items-center justify-center
      ${size ? `w-[${size}px] h-[${size}px]` : ""}
    `}
    style={
      {
        "--fill-color": fillColor,
        "--outline-color": outlineColor,
      } as React.CSSProperties
    }
  >
    <IconComponent
      className={`
        fill-[var(--fill-color)]
        [&>path]:stroke-[var(--outline-color)]
      `}
      width={size}
      height={size}
    />
  </div>
);

export default Icon;
