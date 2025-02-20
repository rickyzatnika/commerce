import { HelpCircle } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className=' p-4'>
      <header className='bg-card mb-3 ]'>
        <div className='max-w-6xl mx-auto flex bg-[#080808] text-white p-4 justify-between items-center'>
          <Link href='/'>
            <Image
              src='/icons/logo2.png'
              alt='logo'
              width={100}
              height={50}
              priority={true}
            />
          </Link>
          <div>
            <h1 className='text-3xl'>Checkout</h1>
          </div>
          <div>
            <Link href='/help'>
              <HelpCircle className='w-8 h-8' />
            </Link>
          </div>
        </div>
      </header>
      {children}
    </div>
  )
}