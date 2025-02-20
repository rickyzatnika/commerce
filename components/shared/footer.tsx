/* eslint-disable react/no-unescaped-entities */
'use client'

import { ChevronUp } from 'lucide-react'

import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { APP_NAME } from '@/lib/constants'
import Image from 'next/image'



const data = [
  {
    id: '1',
    src: '/icons/bca.png',
  },
  {
    id: '2',
    src: '/icons/bni.png',
  },
  {
    id: '3',
    src: '/icons/bri.png',
  },
  {
    id: '4',
    src: '/icons/permata.png',
  },
  {
    id: '5',
    src: '/icons/mandiri.png',
  },
  {
    id: '6',
    src: '/icons/shopepay.png',
  },
  {
    id: '7',
    src: '/icons/spay.png',
  },
  {
    id: '8',
    src: '/icons/gopay.png',
  },
  {
    id: '9',
    src: '/icons/dana.png',
  },
  {
    id: '10',
    src: '/icons/indomart.png',
  },
  {
    id: '11',
    src: '/icons/alfamart2.png',
  },
  {
    id: '12',
    src: '/icons/kredivo.png',
  },
  {
    id: '13',
    src: '/icons/mc.png',
  },
  {
    id: '14',
    src: '/icons/visa.png',
  },

]






export default function Footer() {
  return (
    <footer className="w-full">
      <div className="py-16 px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-y-8 gap-x-6">

          {/* Brand & Deskripsi (Lebih Lebar) */}
          <div className="lg:col-span-2 px-0 md:px-4">
            <h1 className="text-2xl font-bold">{APP_NAME} "Look Different"</h1>
            <p className="text-sm mt-3 leading-relaxed text-muted-foreground">
              adalah Brand fashion yang menghadirkan gaya unik dan berbeda bagi setiap individu khususnya pria.
            </p>
          </div>

          {/* Metode Pembayaran */}
          <div>
            <h3 className="text-md font-semibold mb-3">Metode Pembayaran</h3>
            <div className="grid grid-cols-4 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {data.map((d) => (
                <Image key={d.id} src={d.src} alt="logo" width={60} height={40} className="object-contain bg-white p-1 shadow" />
              ))}
            </div>
          </div>

          {/* Partner Kami */}
          <div className='mx-auto w-full md:w-fit'>
            <h3 className="text-md font-semibold mb-3">Partner Kami</h3>
            <div className="space-y-2 flex flex-row md:flex-col items-start gap-3">
              <Image src="/icons/midtrans.png" alt='logo-midtrans' width={100} height={75} priority={true} className='bg-white p-1' />
              <Image src="/icons/depe.png" alt='logo-midtrans' width={100} height={75} priority={true} className='bg-white p-1 py-3' />
            </div>
          </div>

          {/* Layanan Pelanggan */}
          <div>
            <h3 className="text-md font-semibold mb-3">Layanan Pelanggan</h3>
            <div className="flex flex-col space-y-2 text-sm  text-muted-foreground">
              <Link href="/help" className="hover:underline text-muted-foreground">Pusat Bantuan</Link>
              <Link href="/customer-service" className="hover:underline text-muted-foreground">Customer Service</Link>
              <Link href="/contact-us" className="hover:underline text-muted-foreground">Hubungi Kami</Link>
            </div>
          </div>

        </div>
      </div>


      {/* Section Bawah */}
      <div className="bg-[#080808] py-8 px-6 relative antialiased">
        {/* Tombol Scroll ke Atas */}
        <Button
          variant="outline"
          size="icon"
          className="rounded-full absolute -top-4 right-4 size-12"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <ChevronUp />
        </Button>

        {/* Links Footer */}
        <div className="flex flex-col text-gray-200 items-center space-y-2 md:flex-row md:justify-center md:space-x-6 md:space-y-0 text-sm">
          <Link href="/conditions-of-use" className="hover:underline">Conditions of Use</Link>
          <Link href="privacy-policy" className="hover:underline">Privacy Notice</Link>
          <Link href="/help" className="hover:underline">Help</Link>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm mt-4 text-gray-200 ">
          <p>© 2000-2024, {APP_NAME}, Inc. or its affiliates</p>
          <p className=" mt-2">Jl. Cigadung Barat No.123/152C, Jakarta, Indonesia</p>
        </div>
      </div>
    </footer>
  )
}