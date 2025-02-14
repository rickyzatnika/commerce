import Link from 'next/link'
import CartButton from './cart-button';
import UserButton from './user-button';



const Menu = () => {
  return (
    <div className="flex justify-end ">
      <nav className="flex gap-3 w-full">
        <Link href='/sign-in' className='flex items-center header-button'>
          Hello, Sign in
        </Link>
        <UserButton />
        <CartButton />
      </nav>
    </div>
  )
}

export default Menu