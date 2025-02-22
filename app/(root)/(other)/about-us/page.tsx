/* eslint-disable react/no-unescaped-entities */
import { APP_NAME } from '@/lib/constants'


const AboutUs = () => {
  return (
    <div className='w-full md:w-3/4 mx-auto antialiased'>
      <h1 className='text-3xl font-extrabold mb-6 border-b pb-3 border-gray-500 dark:border-gray-200'>
        Tentang Kami
      </h1>

      <p className='text-lg font-bold w-full'>{APP_NAME} "Look Different"</p>

      <div className='px-3 mb-6 text-gray-700 dark:text-gray-300'>
        <div className='leading-relaxed'>
          <h3 className='pt-3 font-bold'>Siapa Kami?</h3>
          <p className='px-2'>
            DYZ "Look Different" Adalah brand fashion yang hadir dengan gaya yang unik dan berani, yang membuat kalian tampil beda, sesua dengan TAG LINE brand ini sendiri “LOOK DIFFERENT”. Berawal dari ide sang pemilik brand ini yang pernah menajalankan bisnis yang sama pada tahun 2014 dengan nama brand “NUABI MERCH”, yang harus bangkrut pada tahun 2021. Di akhir tahun 2024, muncul kembali ide untuk menjalankan kembali bisnis nya, namun kini hadir dengan nama dan tema yang berbeda, berawal hanya dari berjualan online di beberapa sosial media miliknya, dan kini berkembang menjadi platform e-commerce yang menyediakan kemudahan bagi pelanggan setia untuk berbelanja dengan nyaman dan aman secara online.

          </p>
        </div>

        <div className='leading-relaxed'>
          <h3 className='pt-3 font-bold'>Alamat Kami</h3>
          <p className='px-2'>
            Jl. Alfa 1 Cigadung, Dago - Bandung, Jawa Barat 40191, Indonesia
          </p>
        </div>

        <div className='leading-relaxed'>
          <h3 className='pt-3 font-bold'>Visi Kami</h3>
          <p className='px-2'>
            Menjadi brand fashion yang memberikan inspirasi dan inovasi dalam gaya berpakaian, serta memberikan pengalaman berbelanja terbaik bagi pelanggan.
          </p>
        </div>

        <div className='leading-relaxed'>
          <h3 className='pt-3 font-bold'>Misi Kami</h3>
          <ul className='list-item list-inside px-2'>
            <li>
              Menyediakan produk fashion berkualitas tinggi dengan desain yang unik dan berbeda.
            </li>
            <li>
              Memberikan layanan pelanggan yang responsif dan profesional.
            </li>
            <li>
              Menghadirkan pengalaman belanja online yang mudah, aman, dan
              menyenangkan.
            </li>
            <li>
              Berkomitmen pada keberlanjutan dengan menerapkan proses produksi
              yang ramah lingkungan.
            </li>
          </ul>
        </div>
      </div>

      <div>
        <h3 className='text-lg font-bold mb-3'>Mengapa Memilih DYZ?</h3>
        <ul className='list-disc list-inside px-2 space-y-1 text-gray-700 dark:text-gray-300'>
          <li>
            ✅ Desain Eksklusif – Kami selalu menghadirkan koleksi fashion yang
            fresh dan berbeda, sesuai dengan tren terkini.
          </li>
          <li>
            {' '}
            ✅ Kualitas Terbaik – Setiap produk kami dibuat dengan bahan pilihan
            dan melalui proses produksi yang ketat.
          </li>
          <li>
            {' '}
            ✅ Layanan Pelanggan Profesional – Tim kami siap membantu Anda dalam
            setiap proses pembelian, mulai dari pemilihan produk hingga layanan
            purna jual.
          </li>
          <li>
            {' '}
            ✅ Kemudahan Berbelanja – Nikmati kemudahan berbelanja online kapan
            saja dan di mana saja dengan pengiriman cepat ke seluruh Indonesia.
          </li>
        </ul>
        <h3 className='text-lg font-bold mt-6'>
          Bergabung dengan Komunitas DYZ!
        </h3>
        <p>
          Ikuti perjalanan kami dan dapatkan informasi terbaru tentang koleksi,
          promo, serta inspirasi fashion melalui:
        </p>
        <ul className='list-disc list-inside px-2 space-y-1 mt-2 text-gray-700 dark:text-gray-300'>
          <li>Instagram: @dyzlookdifferent</li>
          <li>WhatsApp: +62 8516 1055 339</li>
          <li>Email: support@dyzstore.id</li>
        </ul>

        <p className='mt-6 text-gray-700 dark:text-gray-300'>
          Kami percaya bahwa setiap orang memiliki gaya uniknya sendiri. Bersama DYZ, tunjukkan perbedaan dan ekspresikan diri anda dengan percaya diri!
        </p>

        <p className='mt-6 font-bold'>
          “DIFFERENT WITH THEM”
        </p>
      </div>
    </div>
  )
}

export default AboutUs
