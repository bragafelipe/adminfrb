import type { BrandLogo as BrandLogoType } from '@/types/config'

interface BrandLogoProps {
  logo: BrandLogoType
  className?: string
}

export function BrandLogo({ logo, className = '' }: BrandLogoProps) {
  return (
    <img
      src={logo.src}
      alt={logo.alt}
      width={logo.width ?? 32}
      height={logo.height ?? 32}
      className={`brand-badge__logo ${className}`.trim()}
    />
  )
}
