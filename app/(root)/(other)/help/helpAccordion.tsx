import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { APP_NAME } from "@/lib/constants"


import React from 'react'

const HelpAccordion = () => {
  return (
    <div>
      <Accordion type="single" collapsible defaultValue="item-1" >
        <AccordionItem defaultValue="item-1" value="item-1" className="AccordionItem">
          <AccordionTrigger className="px-3 text-lg  font-bold bg-gray-900 dark:bg-white dark:text-black text-white">Bagaimana Kebijakan Pengembalian / Penukaran Produk di {APP_NAME} ?</AccordionTrigger>
          <AccordionContent className="px-4 py-2  text-md">
            <ul className="list-disc px-4 space-y-2 text-md ">
              <li className="list-item">
                Anda wajib melakukan video unboxing setelah paket diterima agar jika ada kendala pada produknya, dapat kami proses secepatnya.
              </li>
              <li className="list-item">
                Pastikan tagging produk masih ada & tidak rusak. Pengembalian produk tidak akan diterima jika tagging produk tidak ada.
              </li>
              <li className="list-item">
                Pengajuan pengembalian atau penukaran produk hanya berlaku dalam waktu 3x24 jam setelah barang diterima.
              </li>
              <li className="list-item">
                Produk yang dikembalikan harus dalam kondisi baru, belum digunakan, dan lengkap dengan kemasan serta aksesoris aslinya.
              </li>
              <li className="list-item">
                Pengembalian tidak berlaku untuk produk yang rusak akibat kesalahan penggunaan atau kelalaian pembeli.
              </li>
              <li className="list-item">
                Jika terjadi kesalahan pengiriman produk, kami akan menanggung biaya pengembalian dan pengiriman ulang.
              </li>
              <li className="list-item">
                Untuk proses pengembalian atau penukaran, silakan hubungi layanan pelanggan kami melalui WhatsApp atau email dengan menyertakan bukti video unboxing dan foto produk.
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2" className="antialiased">
          <AccordionTrigger className="px-3 text-lg  font-bold bg-gray-900 dark:bg-white dark:text-black text-white">Bagaimana Cara Mengembalikan Produk?</AccordionTrigger>
          <AccordionContent className="px-4 py-2  text-md">
            <ul className="list-disc px-4 space-y-2 text-md ">
              <li className="list-item">
                Isi Formulir Pengembalian Produk.
              </li>
              <li className="list-item">
                Kemas rapih produk yang akan dikembalikan.
              </li>
              <li className="list-item">
                Kirim paket menggunakan layanan jasa pengiriman terdekat dari lokasi anda ke alamat Gudang {APP_NAME}.
              </li>
              <li className="list-item">
                Tungu notifikasi pemberitahuan berupa email dari kami.
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3" className="antialiased">
          <AccordionTrigger className="px-3 text-lg font-bold bg-gray-900 dark:bg-white dark:text-black text-white">
            Berapa lama estimasi waktu setelah Produk dikembalikan?
          </AccordionTrigger>
          <AccordionContent className="px-4 py-2 text-md">
            <ul className="list-disc px-4 space-y-2 text-md">
              <li className="list-item">
                Setelah produk dikembalikan, tim kami akan melakukan verifikasi dalam waktu 2-5 hari kerja untuk memastikan kondisi produk sesuai dengan kebijakan pengembalian.
              </li>
              <li className="list-item">
                Jika pengembalian disetujui, proses refund atau pengiriman produk pengganti akan dilakukan dalam 3-7 hari kerja tergantung metode pembayaran atau ketersediaan produk.
              </li>
              <li className="list-item">
                Untuk pengembalian dana melalui transfer bank atau e-wallet, waktu pencairan dana dapat memakan waktu 1-3 hari kerja setelah proses refund disetujui.
              </li>
              <li className="list-item">
                Anda akan menerima notifikasi melalui email atau WhatsApp mengenai status pengembalian dan estimasi waktu penyelesaiannya.
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export default HelpAccordion