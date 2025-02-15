'use client'


import { useTheme } from "next-themes";
import Image from "next/image";


export default function LoadingPage() {

    const { theme } = useTheme()

    return (
        <div className='w-full flex flex-col items-center justify-center min-h-screen '>
            <Image src={theme === 'light' ? '/images/black.svg' : '/images/white.svg'} alt='loading' width={100} height={75} style={{ width: '100px', height: '100px' }} priority={true} />
        </div>
    )
}