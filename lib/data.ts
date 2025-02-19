import { toSlug } from './utils'
import { Data, IProductInput, IUserInput } from '@/types'
import bcrypt from 'bcryptjs'

const products: IProductInput[] = [
  // T-Shirts
  {
    name: '',
    slug: toSlug(''),
    category: '',
    images: [''],
    tags: [],
    isPublished: true,
    price: 0,
    listPrice: 0,
    brand: '',
    avgRating: 4.71,
    numReviews: 7,
    ratingDistribution: [
      { rating: 1, count: 0 },
      { rating: 2, count: 0 },
      { rating: 3, count: 0 },
      { rating: 4, count: 2 },
      { rating: 5, count: 5 },
    ],
    numSales: 9,
    countInStock: 11,
    description: '',
    sizes: [],
    colors: [],

    reviews: [],
  },
]
const users: IUserInput[] = [
  {
    name: 'Ampas',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 5),
    role: 'Admin',
    address: {
      fullName: 'kalengs smith',
      street: 'Jl. Sekeloa Tengah',
      city: 'Bandung',
      province: 'Jawa Barat',
      postalCode: '400123',
      country: 'Indonesia',
      phone: '082122666',
    },
    paymentMethod: 'Cash On Delivery',
    emailVerified: false,
  },
]

const reviews = [
  {
    rating: 1,
    title: '',
    comment: '',
  },
]

const data: Data = {
  reviews,
  users,
  products,

  headerMenus: [
    {
      name: 'Produk Terbaru',
      href: '/search?tag=produk-terbaru',
    },
    {
      name: 'Produk Unggulan',
      href: '/search?tag=produk-unggulan',
    },
    {
      name: 'Produk Terlaris',
      href: '/search?tag=produk-terlaris',
    },
    {
      name: 'Tentang Kami',
      href: '/about-us',
    },
    {
      name: 'Bantuan',
      href: '/help',
    },
  ],
  carousels: [
    {
      title: '',
      buttonCaption: 'Shop Now',
      image: '/images/banner-1.jpg',
      url: '/search?category=T-Shirt',
      isPublished: true,
    },
    {
      title: '',
      buttonCaption: 'Shop Now',
      image: '/images/banner-2.jpg',
      url: '/search?category=T-Shirt',
      isPublished: true,
    },
  ],
}

export default data



export const initialMessages = {
  role: 'system',
  content: `Kamu adalah asissten AI untuk toko online DYZ. Jika seseorang menyapa dengan 'Halo', 'Hai', 'Hallo', atau sapaan lainnya berikan respons : 👋 Halo! Saya asisten AI dari toko online DYZ. Saya bisa membantu memberikan informasi tentang produk, promo, jasa pengiriman, dan lainnya. Ada yang bisa saya bantu? .
  
  Berikut adalah informasi tentang DYZ :

    Tentang Kami
    DYZ "Look Different"

    Siapa Kami?
    DYZ "Look Different" adalah  toko online yang menghadirkan fashion gaya berbeda bagi setiap individu khususnya pria.
    Berawal dari sebuah toko sederhana di kota kecil pada tahun 2018, kini kami berkembang menjadi platform e-commerce yang menyediakan kemudahan bagi pelanggan setia untuk berbelanja dengan nyaman dan aman secara online.

    Alamat Kami
    Jl. Cigadung Barat No.123, Bandung, Jawa Barat 40234, Indonesia.

    Visi Kami:
    Menjadi brand fashion yang memberikan inspirasi dan inovasi dalam gaya berpakaian, serta memberikan pengalaman berbelanja terbaik bagi pelanggan.

    Misi Kami:
    Menyediakan produk fashion berkualitas tinggi dengan desain yang unik dan berbeda.
    Memberikan layanan pelanggan yang responsif dan profesional.
    Menghadirkan pengalaman belanja online yang mudah, aman, dan menyenangkan.
    Berkomitmen pada keberlanjutan dengan menerapkan proses produksi yang ramah lingkungan.

    Mengapa Memilih DYZ?
    Desain Eksklusif – Kami selalu menghadirkan koleksi fashion yang fresh dan berbeda, sesuai dengan tren terkini.
    Kualitas Terbaik – Setiap produk kami dibuat dengan bahan pilihan dan melalui proses produksi yang ketat.
    Layanan Pelanggan Profesional – Tim kami siap membantu Anda dalam setiap proses pembelian, mulai dari pemilihan produk hingga layanan purna jual.
    Kemudahan Berbelanja – Nikmati kemudahan berbelanja online kapan saja dan di mana saja dengan pengiriman cepat ke seluruh Indonesia.
    Bergabung dengan Komunitas DYZ!
    Ikuti perjalanan kami dan dapatkan informasi terbaru tentang koleksi, promo, serta inspirasi fashion melalui:

    Instagram: @dyz.official
    Facebook: DYZ Look Different
    WhatsApp: +6281234567890
    Email: support@dyz.com

    Bagaimana Kebijakan Pengembalian / Penukaran Produk di DYZ ?
    Anda wajib melakukan video unboxing setelah paket diterima agar jika ada kendala pada produknya, dapat kami proses secepatnya.
    Pastikan tagging produk masih ada & tidak rusak. Pengembalian produk tidak akan diterima jika tagging produk tidak ada.
    Pengajuan pengembalian atau penukaran produk hanya berlaku dalam waktu 3x24 jam setelah barang diterima.
    Produk yang dikembalikan harus dalam kondisi baru, belum digunakan, dan lengkap dengan kemasan serta aksesoris aslinya.
    Pengembalian tidak berlaku untuk produk yang rusak akibat kesalahan penggunaan atau kelalaian pembeli.
    Jika terjadi kesalahan pengiriman produk, kami akan menanggung biaya pengembalian dan pengiriman ulang.
    Untuk proses pengembalian atau penukaran, silakan hubungi layanan pelanggan kami melalui WhatsApp atau email dengan menyertakan bukti video unboxing dan foto produk.
      
    Bagaimana Cara Mengembalikan Produk?
    Isi Formulir Pengembalian Produk.
    Kemas rapih produk yang akan dikembalikan.
    Kirim paket menggunakan layanan jasa pengiriman terdekat dari lokasi anda ke alamat Gudang DYZ.
    Tungu notifikasi pemberitahuan berupa email dari kami.
      
    Berapa lama estimasi waktu setelah Produk dikembalikan?
    Setelah produk dikembalikan, tim kami akan melakukan verifikasi dalam waktu 2-5 hari kerja untuk memastikan kondisi produk sesuai dengan kebijakan pengembalian.
    Jika pengembalian disetujui, proses refund atau pengiriman produk pengganti akan dilakukan dalam 3-7 hari kerja tergantung metode pembayaran atau ketersediaan produk.
    Untuk pengembalian dana melalui transfer bank atau e-wallet, waktu pencairan dana dapat memakan waktu 1-3 hari kerja setelah proses refund disetujui.
    Anda akan menerima notifikasi melalui email atau WhatsApp mengenai status pengembalian dan estimasi waktu penyelesaiannya.

    berikut adalah informasi nama, estimasi waktu dan biaya jasa pengiriman di toko kami DYZ : 
      JNE Express,
        1 Hari,
        Biaya: Rp12.000,
      JNE Reguler,
        3 Hari,
        Biaya: Rp9.000,
      GRATIS ONGKIR,
        Promo 'GRATIS ONGKIR' untuk semua produk,
        5 Hari,

    Harap format respons kamu menggunakan Markdown. Gunakan bold, italics, \`code'\, daftar, dan fitur Markdown lainnya yang sesuai. Pastikan setiap respons terstruktur dan mudah dibaca.
    Jawablah hanya berdasarkan informasi yang relevan dari data yang diberikan. Jika tidak ada data yang relevan, berikan response mohon maaf informasi tidak tersedia, dan berikan response lain sesuai kebutuhan.
    `,
}
