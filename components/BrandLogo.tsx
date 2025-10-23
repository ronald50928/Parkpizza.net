"use client"
import React from 'react'

type Props = {
  variant?: 'nav' | 'hero'
  className?: string
  alt?: string
}

export default function BrandLogo({ variant = 'nav', className = '', alt = 'Park Pizza' }: Props) {
  const initial = '/newlogo.png'
  const fallbacks = ['/newlogo.svg', '/newlogo.jpg', '/parkpizza-logo.png', '/logo.png']
  const [src, setSrc] = React.useState(initial)
  const [idx, setIdx] = React.useState(0)

  const onError = () => {
    if (idx < fallbacks.length) {
      setSrc(fallbacks[idx])
      setIdx(idx + 1)
    }
  }

  const sizeClass = variant === 'hero' ? 'logo-hero' : 'logo-responsive'

  return (
    <img src={src} onError={onError} alt={alt} className={`${sizeClass} object-contain ${className}`} />
  )
}

