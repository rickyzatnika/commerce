'use client'
import { useTheme } from 'next-themes'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'


export default function LogoImage() {
  const { theme } = useTheme();
  return (
    <Link href="/">
      <Image src={`${theme === 'light' ? '/icons/lg-black.png' : '/icons/lg.png'}`} alt='dystro-logo' width={100} height={75} priority={true} />
    </Link>
  )
}

