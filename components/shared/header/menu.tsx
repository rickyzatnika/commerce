"use client"
import Link from 'next/link'
import CartButton from './cart-button';
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
        <CartButton />
      </nav>
    </div>
  )
}

export default Menu