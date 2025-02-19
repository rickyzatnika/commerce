/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import Image from 'next/image'
import { useState } from 'react'

const ImageHover = ({
  src,
  hoverSrc,
  alt,
}: {
  src: string
  hoverSrc: string
  alt: string
}) => {
  const [isHovered, setIsHovered] = useState(false)
  let hoverTimeout: any
  const handleMouseEnter = () => {
    hoverTimeout = setTimeout(() => setIsHovered(true), 100) // 1 second delay
  }

  const handleMouseLeave = () => {
    clearTimeout(hoverTimeout)
    setIsHovered(false)
  }

  return (
    <div
      className='relative '
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Image
        src={src}
        alt={alt}
        priority={true}
        width={500}
        height={175}
        className={`object-contain transition-opacity duration-200 ${isHovered ? 'opacity-0' : 'opacity-100'
          }`}
      />
      <Image
        src={hoverSrc}
        alt={alt}
        priority={true}
        width={500}
        height={175}
        className={`absolute inset-0 object-contain transition-opacity duration-200 ${isHovered ? 'opacity-100' : 'opacity-0'
          }`}
      />
    </div>
  )
}

export default ImageHover