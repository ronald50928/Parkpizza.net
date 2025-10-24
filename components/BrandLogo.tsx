"use client"
import React from 'react'
import Image from 'next/image'

type Props = {
  variant?: 'nav' | 'hero'
  className?: string
  alt?: string
}

export default function BrandLogo({ variant = 'nav', className = '', alt = 'Park Pizza' }: Props) {
  const initial = '/newlogo.png'
  const fallbacks = ['/parkpizza-logo.png', '/logo.png']
  const [src, setSrc] = React.useState(initial)
  const [idx, setIdx] = React.useState(0)

  const onError = () => {
    if (idx < fallbacks.length) {
      setSrc(fallbacks[idx])
      setIdx(idx + 1)
    }
  }

  const sizeClass = variant === 'hero' ? 'logo-hero' : 'logo-responsive'
  
  // Determine dimensions based on variant
  const dimensions = variant === 'hero' ? { width: 200, height: 200 } : { width: 60, height: 60 }

  return (
    <Image
      src={src}
      onError={onError}
      alt={alt}
      width={dimensions.width}
      height={dimensions.height}
      className={`${sizeClass} object-contain ${className}`}
      priority={variant === 'hero'}
      quality={90}
    />
  )
}

