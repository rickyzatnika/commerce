import { APP_NAME } from '@/lib/constants'
import Link from 'next/link'
import React from 'react'

export default function CheckoutFooter() {
  return (
    <div className='border-t-2 space-y-3 my-4 py-4 text-sm md:text-base '>
      <p>
        Butuh bantuan? Periksa <Link href='/help'>Pusat Bantuan kami</Link> atau{' '}
        <Link href='/contact-us'>Hubungi Kami</Link>{' '}
      </p>
      <p className='antialiased leading-relaxed'>
        Untuk barang yang dipesan dari {APP_NAME}, Saat Anda mengklik tombol &apos;Lanjutkan&apos; kami akan mengirimkan email yang berisi tanda terima pesanan Anda.
        Kontrak Anda untuk membeli suatu barang tidak akan selesai sampai kami mengirimi Anda email yang memberitahukan bahwa barang tersebut telah dikirimkan kepada Anda.
        Dengan melakukan pemesanan, Anda menyetujui{' '}
        <Link href='/privacy-policy'>Kebijakan Privasi</Link> dan
        <Link href='/conditions-of-use'> ketentuan Penggunaan </Link> {APP_NAME}.
      </p>
      <p>
        Dalam waktu 3 hari setelah barang diterima, dan kemungkinan ada kerusakan atau tidak sesuai. Anda dapat mengembalikan barang baru yang belum dibuka dalam kondisi aslinya.{' '}
        Syarat dan Ketentuan berlaku. Lihat <Link href='/help'>Kebijakan Pengembalian
        </Link> Dyzstore.
      </p>
    </div>
  )
}