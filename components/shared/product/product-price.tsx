'use client'
import { cn, formatCurrency } from '@/lib/utils'

const ProductPrice = ({
  price,
  className,
  listPrice = 0,
  isDeal = false,
  forListing = true,
  plain = false,
}: {
  price: number
  isDeal?: boolean
  listPrice?: number
  className?: string
  forListing?: boolean
  plain?: boolean
}) => {
  const discountPercent = Math.round(100 - (price / listPrice) * 100)


  // STYLING UNTUK CURRENCY DOLLAR
  // const stringValue = price.toString()
  // const [intValue, floatValue] = stringValue.includes('.')
  //   ? stringValue.split('.')
  //   : [stringValue, '']
  // bertujuan untuk memisahkan bagian bilangan bulat (integer) dan desimal (float) dari harga (price).
  // Jika price = 12500.75, maka stringValue = "12500.75".



  return plain ? (
    formatCurrency(price)
  ) : listPrice == price || listPrice < price ? (
    <div className={cn('text-2xl', className)}>
      <span className='text-xs align-super'></span>
      {formatCurrency(price)}
    </div>
  ) : isDeal ? (
    <div className='space-y-1'>
      <div className='flex justify-center items-center gap-1 mt-2'>
        <span className='bg-red-700 rounded-sm p-1 text-white text-sm font-semibold'>
          {discountPercent}% Off
        </span>
        <span className='text-red-700 text-xs font-bold'>
          Penawaran Terbatas
        </span>
      </div>
      <div
        className={`flex flex-col ${forListing && 'justify-center'
          } items-center`}
      >
        <div className={cn('text-2xl', className)}>
          <span className='text-xs align-super'></span>
          {formatCurrency(price)}
        </div>
        <div className='text-muted-foreground text-md py-2'>
          <i className='line-through text-md text-red-700'>{formatCurrency(listPrice)}</i>
        </div>
      </div>
    </div>
  ) : (
    <div className=''>
      <div className='flex justify-center gap-2'>
        <div className='text-2xl text-red-600'>-{discountPercent}%</div>
        <div className={cn('text-2xl', className)}>
          <span className='text-xs align-super'></span>
          {formatCurrency(price)}
        </div>
      </div>
      <div className='text-muted-foreground text-red-700 text-md py-2'>
        <i className='line-through'>{formatCurrency(listPrice)}</i>
      </div>
    </div>
  )
}

export default ProductPrice