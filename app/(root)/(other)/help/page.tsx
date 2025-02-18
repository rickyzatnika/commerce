/* eslint-disable react/no-unescaped-entities */
import { Metadata } from 'next'
import React from 'react'
import HelpAccordion from './helpAccordion'
import { APP_NAME } from '@/lib/constants'

const PAGE_TITLE = 'Help'
export const metadata: Metadata = {
  title: PAGE_TITLE,
}
export default function AccountPage() {
  return (
    <div className='w-full h-full'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch '>
        <div>
          <h1 className='mb-2 text-xl font-bold'>Halaman Bantuan {APP_NAME} "Look Different" </h1>
          <div className='p-2'>
            <h1 className='font-bold'>Bantuan</h1>
            <p className='text-gray-700 dark:text-gray-300'>Selamat datang di Pusat Bantuan kami! Kami siap membantu Anda dengan pertanyaan atau kendala yang mungkin Anda hadapi saat berbelanja dengan kami. Baik itu mengenai pesanan, manajemen akun, atau pertanyaan seputar produk, halaman ini menyediakan semua informasi yang Anda butuhkan untuk menavigasi platform kami dengan mudah.</p>
          </div>
          <div className='p-2'>
            <h1 className='font-bold'>Melakukan dan Mengelola Pesanan</h1>
            <p className='text-gray-700 dark:text-gray-300'>Melakukan pemesanan itu mudah dan aman. Telusuri kategori produk kami, tambahkan barang ke keranjang, lalu lanjutkan ke pembayaran. Setelah pesanan dibuat, Anda dapat melacak statusnya melalui akun Anda di bagian "Pesanan Saya". Jika Anda perlu mengubah atau membatalkan pesanan, silakan hubungi kami sesegera mungkin untuk mendapatkan bantuan.</p>
          </div>
          <div className='p-2'>
            <h1 className='font-bold'>Pengiriman dan Pengembalian</h1>
            <p className='text-gray-700 dark:text-gray-300'>Kami menawarkan berbagai opsi pengiriman yang sesuai dengan kebutuhan Anda, termasuk pengiriman standar dan ekspres. Untuk informasi lebih lanjut mengenai biaya pengiriman dan estimasi waktu pengiriman, kunjungi halaman Kebijakan Pengiriman kami. Jika Anda tidak puas dengan pembelian Anda, proses pengembalian kami yang mudah memungkinkan Anda untuk mengajukan pengembalian dalam jangka waktu yang telah ditentukan. Lihat Kebijakan Pengembalian kami untuk detail lebih lanjut.</p>
          </div>
          <div className='p-2'>
            <h1 className='font-bold'>Akun dan Dukungan</h1>
            <p className='text-gray-700 dark:text-gray-300'>Mengelola akun Anda sangat mudah. Masuk untuk memperbarui informasi pribadi, metode pembayaran, dan alamat yang tersimpan. Jika Anda mengalami kendala atau membutuhkan bantuan lebih lanjut, tim dukungan pelanggan kami tersedia melalui email, live chat, atau telepon. Kunjungi halaman Hubungi Kami untuk mengetahui jam operasional dan detail kontak..</p>
          </div>
        </div>
        <div>
          <h1 className="mb-6 text-xl font-bold">FAQ <i className='font-normal text-md'>(Frequently Ask Question)</i></h1>
          <HelpAccordion />
        </div>
      </div>
    </div>
  )
}