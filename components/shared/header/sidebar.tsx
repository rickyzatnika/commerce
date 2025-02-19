import * as React from 'react'
import Link from 'next/link'
import { X, ChevronRight, UserCircle, MenuIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SignOut } from '@/lib/actions/user.actions'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { auth } from '@/auth'

export default async function Sidebar({
  categories,
}: {
  categories: string[]
}) {
  const session = await auth()

  return (
    <Drawer direction='left'>
      <DrawerTrigger className='header-button flex items-center !p-2  '>
        <MenuIcon className='h-5 w-5 mr-1' />
        All
      </DrawerTrigger>
      <DrawerContent className='w-[350px] mt-0 top-0'>
        <div className='flex flex-col h-full'>
          {/* User Sign In Section */}
          <div className='dark bg-background dark:bg-foreground dark:text-black text-card-foreground flex items-center justify-between  '>
            <DrawerHeader>
              <DrawerTitle className='flex items-center'>
                <UserCircle className='h-6 w-6 mr-2' />
                {session ? (
                  <DrawerClose asChild>
                    <Link href='/account'>
                      <span className='text-lg font-semibold'>
                        Hi, {session.user.name}
                      </span>
                    </Link>
                  </DrawerClose>
                ) : (
                  <DrawerClose asChild>
                    <Link href='/sign-in'>
                      <span className='text-lg font-semibold'>
                        Masuk/Daftar
                      </span>
                    </Link>
                  </DrawerClose>
                )}
              </DrawerTitle>

            </DrawerHeader>
            <DrawerClose asChild>
              <Button variant="outline" size='icon' className='mr-2 dark:text-white'>
                <X className='h-5 w-5' />
              </Button>
            </DrawerClose>
          </div>

          {/* Shop By Category */}
          <div className=' overflow-y-auto'>
            <div className='p-4 border-b'>
              <h2 className='text-lg font-semibold'>Semua Kategori</h2>
            </div>
            <nav className='flex flex-col px-3'>
              {categories.map((category) => (
                <DrawerClose asChild key={category}>
                  <Link
                    href={`/search?category=${category}`}
                    className={`flex items-center justify-between item-button`}
                  >
                    <span>{category}</span>
                    <ChevronRight className='h-4 w-4' />
                  </Link>
                </DrawerClose>
              ))}
            </nav>
          </div>

          {/* Setting and Help */}
          <div className='border-t flex flex-col '>
            <div className='p-4'>
              <h2 className='text-lg font-semibold'>Bantuan & Pengaturan</h2>
            </div>
            <div className='px-3 flex flex-col'>
              <DrawerClose asChild>
                <Link href='/account' className='item-button'>
                  Profile Account
                </Link>
              </DrawerClose>{' '}
              <DrawerClose asChild>
                <Link href='/customer-service' className='item-button'>
                  Customer Service
                </Link>
              </DrawerClose>
              {session ? (
                <form action={SignOut} className='w-full'>
                  <Button
                    className='w-full justify-start item-button text-base'
                    variant='ghost'
                  >
                    Keluar
                  </Button>
                </form>
              ) : (
                <Link href='/sign-in' className='item-button'>
                  Masuk
                </Link>
              )}
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}