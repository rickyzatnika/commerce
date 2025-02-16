
import { toSlug } from './utils'
import { Data, IProductInput, IUserInput } from '@/types'
import bcrypt from 'bcryptjs'

const products: IProductInput[] = [
  // T-Shirts
  {
    name: '',
    slug: toSlug(''),
    category: '',
    images: [""],
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
    description:
      '',
    sizes: [],
    colors: [],

    reviews: [],
  },
]
const users: IUserInput[] = [
  {
    name: 'kalenx',
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
      name: 'New Arrivals',
      href: '/search?tag=new-arrival',
    },
    {
      name: 'Featured Products',
      href: '/search?tag=featured',
    },
    {
      name: 'Best Sellers',
      href: '/search?tag=best-seller',
    },
    {
      name: 'About Us',
      href: '/about-us',
    },
    {
      name: 'Help',
      href: '/help',
    },
  ],
  carousels: [
    {
      title: 'Most Popular Shoes For Sale',
      buttonCaption: 'Shop Now',
      image: '/images/banner3.jpg',
      url: '/search?category=Shoes',
      isPublished: true,
    },
    {
      title: 'Best Sellers in T-Shirts',
      buttonCaption: 'Shop Now',
      image: '/images/banner1.jpg',
      url: '/search?category=T-Shirts',
      isPublished: true,
    },
    {
      title: 'Best Deals on Wrist Watches',
      buttonCaption: 'See More',
      image: '/images/banner2.jpg',
      url: '/search?category=Wrist Watches',
      isPublished: true,
    },
  ],

}







export default data