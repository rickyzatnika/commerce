"use client"
import Link from 'next/link'
import { ShoppingCartIcon } from "lucide-react";
// import { signOut, useSession } from 'next-auth/react'

// interface CustomSession {
//   user: {
//     id: string;
//     username: string;
//     email: string;
//     image?: string;
//     role: string;
//   };
// }

const Menu = () => {
  // const { data: session } = useSession() as { data: CustomSession | null };
  return (
    <div className="flex justify-end ">
      <nav className="flex gap-3 w-full">
        <Link href="/sign-in" className="flex items-center header-button">
          Hello, Sign in!
        </Link>
        <Link href="/cart" className="header-button">
          <div className='flex items-end gap-[1px]'>
            <ShoppingCartIcon className='w-6 h-6' />
            <span className='text-xs'>Cart</span>
          </div>
        </Link>
      </nav>
    </div>
  )
}

export default Menu