import Link from 'next/link'

import Pagination from '@/components/shared/pagination'
import ProductCard from '@/components/shared/product/product-card'
import { Button } from '@/components/ui/button'
import {
  getAllCategories,
  getAllProducts,
  getAllTags,
} from '@/lib/actions/product.actions'
import { IProduct } from '@/lib/db/models/product.model'
import ProductSortSelector from '@/components/shared/product/product-sort-selector'
import { getFilterUrl, toSlug } from '@/lib/utils'
import Rating from '@/components/shared/product/rating'

import CollapsibleOnMobile from '@/components/shared/collapsible-on-mobile'

const sortOrders = [
  { value: 'price-low-to-high', name: 'Harga Terendah' },
  { value: 'price-high-to-low', name: 'Harga Tertinggi' },
  { value: 'produk-terbaru', name: 'Produk Terbaru' },
  { value: 'avg-customer-review', name: 'Rata-rata Ulasan' }

]

// const prices = [
//   {
//     name: 'Rp50.000 to Rp20.000',
//     value: '1-20',
//   },
//   {
//     name: '$21 to $50',
//     value: '21-50',
//   },
//   {
//     name: '$51 to $1000',
//     value: '51-1000',
//   },
// ]

export async function generateMetadata(props: {
  searchParams: Promise<{
    q: string
    category: string
    tag: string
    price: string
    rating: string
    sort: string
    page: string
  }>
}) {
  const searchParams = await props.searchParams
  const {
    q = 'all',
    category = 'all',
    tag = 'all',
    price = 'all',
    rating = 'all',
  } = searchParams

  if (
    (q !== 'all' && q !== '') ||
    category !== 'all' ||
    tag !== 'all' ||
    rating !== 'all' ||
    price !== 'all'
  ) {
    return {
      title: `Search ${q !== 'all' ? q : ''}
          ${category !== 'all' ? ` : Category ${category}` : ''}
          ${tag !== 'all' ? ` : Tag ${tag}` : ''}
          ${price !== 'all' ? ` : Price ${price}` : ''}
          ${rating !== 'all' ? ` : Rating ${rating}` : ''}`,
    }
  } else {
    return {
      title: 'Search Products',
    }
  }
}

export default async function SearchPage(props: {
  searchParams: Promise<{
    q: string
    category: string
    tag: string
    price: string
    rating: string
    sort: string
    page: string
  }>
}) {
  const searchParams = await props.searchParams

  const {
    q = 'all',
    category = 'all',
    tag = 'all',
    price = 'all',
    rating = 'all',
    sort = 'produk-terlaris',
    page = '1',
  } = searchParams

  const params = { q, category, tag, price, rating, sort, page }

  const categories = await getAllCategories()
  const tags = await getAllTags()
  const data = await getAllProducts({
    category,
    tag,
    query: q,
    price,
    rating,
    page: Number(page),
    sort,
  })
  return (
    <div>
      <div className='mb-2 py-2 md:border-b flex-between flex-col md:flex-row '>
        <div className='flex items-center capitalize mb-2'>
          {data.totalProducts === 0
            ? 'No'
            : `${data.from}-${data.to} dari ${data.totalProducts}`}{' '}
          Hasil pencarian
          {(q !== 'all' && q !== '') ||
            (category !== 'all' && category !== '') ||
            (tag !== 'all' && tag !== '') ||
            rating !== 'all' ||
            price !== 'all'
            ? ` untuk `
            : null}
          {q !== 'all' && q !== '' && '"' + q + '"'}
          {category !== 'all' && category !== '' && `  Category: ` + category}
          {tag !== 'all' && tag !== '' && `   Tag : ` + tag}
          {price !== 'all' && `    Price: ` + price}
          {rating !== 'all' && `   Rating: ` + rating + ` & up`}
          &nbsp;
          {(q !== 'all' && q !== '') ||
            (category !== 'all' && category !== '') ||
            (tag !== 'all' && tag !== '') ||
            rating !== 'all' ||
            price !== 'all' ? (
            <Button variant={'link'} asChild>
              <Link href='/search'>Clear</Link>
            </Button>
          ) : null}
        </div>
        <div>
          <ProductSortSelector
            sortOrders={sortOrders}
            sort={sort}
            params={params}
          />
        </div>
      </div>
      <div className='bg-card grid md:grid-cols-5 md:gap-4'>
        <CollapsibleOnMobile title='Filters'>
          <div className='space-y-4 my-3'>
            <div>
              <h1 className='font-bold'>Kategori Produk</h1>
              <ul>
                <li className='py-0.5'>
                  <Link
                    className={`${('all' === category || '' === category) && 'text-primary'
                      }`}
                    href={getFilterUrl({ category: 'all', params })}
                  >
                    All
                  </Link>
                </li>
                {categories.map((c: string) => (
                  <li key={c} className='py-0.5'>
                    <Link
                      className={`${c === category && 'text-primary'}`}
                      href={getFilterUrl({ category: c, params })}
                    >
                      {c}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            {/* <div>
              <div className='font-bold'>Price</div>
              <ul>
                <li>
                  <Link
                    className={`${'all' === price && 'text-primary'}`}
                    href={getFilterUrl({ price: 'all', params })}
                  >
                    All
                  </Link>
                </li>
                {prices.map((p) => (
                  <li key={p.value}>
                    <Link
                      href={getFilterUrl({ price: p.value, params })}
                      className={`${p.value === price && 'text-primary'}`}
                    >
                      {p.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div> */}
            <div>
              <h3 className='font-bold'>Ulasan Pelanggan</h3>
              <ul>
                <li>
                  <Link
                    href={getFilterUrl({ rating: 'all', params })}
                    className={`${'all' === rating && 'text-primary'}`}
                  >
                    All
                  </Link>
                </li>

                <li>
                  <Link
                    href={getFilterUrl({ rating: '4', params })}
                    className={`${'4' === rating && 'text-primary'}`}
                  >
                    <div className='flex'>
                      <Rating size={4} rating={4} /> & Up
                    </div>
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <div className='font-bold mb-1'>Tag</div>
              <ul>
                <li className='py-0.5' >
                  <Link
                    className={`${('all' === tag || '' === tag) && 'text-primary'
                      }`}
                    href={getFilterUrl({ tag: 'all', params })}
                  >
                    All
                  </Link>
                </li>
                {tags.map((t: string) => (
                  <li key={t} className='py-0.5' >
                    <Link
                      className={`${toSlug(t) === tag && 'text-primary'}`}
                      href={getFilterUrl({ tag: t, params })}
                    >
                      {t}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CollapsibleOnMobile>

        <div className='md:col-span-4 space-y-4'>
          <div className='py-3'>
            <div className='font-bold text-xl'>Hasil pencarian</div>
            <div>Periksa setiap halaman produk untuk opsi pembelian lainnya</div>
          </div>

          <div className='grid grid-cols-1 gap-4 md:grid-cols-2  lg:grid-cols-3  '>
            {data.products.length === 0 && <div>Pencarian tidak ditemukan</div>}
            {data.products.map((product: IProduct) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
          {data.totalPages > 1 && (
            <Pagination page={page} totalPages={data.totalPages} />
          )}
        </div>
      </div>
    </div>
  )
}