/* eslint-disable react/no-unescaped-entities */
import Image from 'next/image'
import Link from 'next/link'
import Search from './search'
import Menu from './menu'
import { APP_NAME } from '@/lib/constants'
import data from '@/lib/data'
import Sidebar from './sidebar'
import { getAllCategories } from '@/lib/actions/product.actions'


export default async function Header() {

  const categories = await getAllCategories()

  return (
    <header className='bg-[#080808]  text-white'>
      <div className='px-2'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center'>
            <Link
              href='/'
              className='flex gap-1 flex-col items-center header-button font-extrabold text-2xl m-1 '
            >
              <div className='flex gap-1 items-center'>
                <Image
                  src='/icons/logo2.png'
                  width={75}
                  height={25}
                  style={{ width: 'auto', height: 'auto' }}
                  alt={`${APP_NAME} logo`}
                />
              </div>
            </Link>
          </div>
          <div className='hidden md:block flex-1 max-w-xl'>
            <Search />
          </div>
          <Menu />
        </div>
        <div className='md:hidden block py-2'>
          <Search />
        </div>
      </div>
      <div className='flex items-center px-3 mb-[1px]  bg-white text-[#010101]'>

        <Sidebar categories={categories} />
        <div className='flex items-center flex-wrap gap-3 overflow-hidden   max-h-[42px]'>
          {data.headerMenus.map((menu) => (
            <Link
              href={menu.href}
              key={menu.href}
              className='header-button !p-2'
            >
              {menu.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  )
}