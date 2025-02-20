'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

import { cn } from '@/lib/utils'

const links = [
  {
    title: 'Ringkasan',
    href: '/admin/overview',
  },
  {
    title: 'Produk',
    href: '/admin/products',
  },
  {
    title: 'Pesanan',
    href: '/admin/orders',
  },
  {
    title: 'Pengguna',
    href: '/admin/users',
  },


]
export function AdminNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname()
  return (
    <nav
      className={cn(
        'flex items-center flex-wrap overflow-hidden gap-2 md:gap-4',
        className
      )}
      {...props}
    >
      {links.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            '',
            pathname.includes(item.href) ? 'border-b border-[#FACC15]' : 'text-muted-foreground text-gray-400 hover:text-gray-300'
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  )
}