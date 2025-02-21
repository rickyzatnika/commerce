"use client"



import { usePathname } from 'next/navigation'
import React from 'react'

const CheckoutText = () => {

    const pathname = usePathname();

    const isFinish = pathname === '/checkout/finish';

    return (
        <div className={isFinish ? 'hidden' : 'flex font-bold mr-6 text-4xl'} >Checkout</div>
    )
}

export default CheckoutText