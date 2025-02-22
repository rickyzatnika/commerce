import { HelpCircle } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import CheckoutText from './checkoutText'

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className=' p-4'>
      <header className='bg-card mb-3 '>
        <div className='max-w-6xl mx-auto flex bg-[#080808] text-white p-4 justify-between items-center'>
          <Link href='/'>
            <Image
              src='/icons/logo2.png'
              alt='logo'
              width={50}
              height={25}
              style={{ width: 'auto', height: 'auto' }}
              priority={true}
            />
          </Link>
          <div>
            <CheckoutText />
          </div>
          <div>
            <Link href='/help'>
              <HelpCircle className='w-6 md:w-8 h-6 md:h-8' />
            </Link>
          </div>
        </div>
      </header>
      {children}
    </div>
  )
}