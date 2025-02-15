
import { APP_COPYRIGHT, APP_NAME } from '@/lib/constants'
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
        <div className='space-x-1'>
          <span>Welcome to</span>
          <Link href='/'>
            <span className='text-lg font-bold underline text-black dark:text-white'>
              {APP_NAME}
            </span>
          </Link>
        </div>
      </header>
      <main className='mx-auto max-w-sm min-w-80 p-4'>{children}</main>
      <footer className=' flex-1 mt-8  bg-gray-800 w-full flex flex-col gap-4 items-center p-8 text-sm'>
        <div className='flex justify-center space-x-4'>
          <Link href='/page/conditions-of-use'>Conditions of Use</Link>
          <Link href='/page/privacy-policy'> Privacy Notice</Link>
          <Link href='/page/help'> Help </Link>
        </div>
        <div>
          <p className='text-gray-400'>{APP_COPYRIGHT}</p>
        </div>
      </footer>
    </div>
  )
}