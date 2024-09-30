import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  iconComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  size: number;
  fillColor?: string;
}

const Icon = ({
  iconComponent: IconComponent,
  size,
  fillColor,
  className,
  ...props
}: IconProps) => {
  return (
    <IconComponent
      width={size}
      height={size}
      fill={fillColor}
      className={className}
      {...props}
    />
  );
};

export default Icon;
