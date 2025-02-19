
import { APP_COPYRIGHT, APP_NAME, APP_SLOGAN } from '@/lib/constants'
import Link from 'next/link'
import React from 'react'

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='flex flex-col items-center min-h-screen highlight-link  '>
      <header className='pt-5'>
        <div className='space-x-1 w-full flex text-xl md:text-2xl '>
          <Link href='/' className='flex gap-1 items-center '>
            <p className=' font-bold  text-black dark:text-gray-100'>
              {APP_NAME}
            </p>
            <p className='text-black font-bold  dark:text-gray-100 '>&quot;{APP_SLOGAN}&quot;</p>
          </Link>
        </div>
      </header>
      <main className='mx-auto max-w-sm min-w-80 p-4'>{children}</main>
      <footer className=' flex-1 mt-8 bg-[#080808] w-full flex flex-col gap-4 items-center p-8 text-sm'>
        <div className='flex justify-center space-x-4'>
          <Link href='/conditions-of-use'>Conditions of Use</Link>
          <Link href='/privacy-policy'> Privacy Policy</Link>
          <Link href='/help'> Help </Link>
        </div>
        <div>
          <p className='text-gray-400'>{APP_COPYRIGHT}</p>
        </div>
      </footer>
    </div>
  )
}