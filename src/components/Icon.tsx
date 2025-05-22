import React from 'react';
import Image from 'next/image';

interface IconProps {
  name: string;
  width: number;
  height: number;
  alt?: string;
  style?: string;
  className?: string;
  onClick?: () => void;
}

const Icon: React.FC<IconProps> = ({
  name,
  width,
  height,
  alt,
  style,
  onClick,
}) => (
  <div
    className=""
    onClick={onClick}
    role="button"
    aria-label={alt || name}
    tabIndex={0}
  >
    <Image
      src={`/Icons/${name}.svg`}
      alt={alt || name}
      width={width}
      height={height}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    />
  </div>
);

export default Icon;
