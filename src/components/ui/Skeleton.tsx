import type { CSSProperties, HTMLAttributes } from 'react'
import './ui.css'

export interface SkeletonProps extends HTMLAttributes<HTMLSpanElement> {
  width?: CSSProperties['width']
  height?: CSSProperties['height']
  variant?: 'text' | 'circle' | 'rect'
}

export function Skeleton({
  className = '',
  height,
  style,
  variant = 'rect',
  width,
  ...props
}: SkeletonProps) {
  return (
    <span
      {...props}
      className={['ui-skeleton', `ui-skeleton--${variant}`, className]
        .filter(Boolean)
        .join(' ')}
      style={{ width, height, ...style }}
      aria-hidden="true"
    />
  )
}
