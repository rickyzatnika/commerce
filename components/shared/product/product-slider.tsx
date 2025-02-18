'use client'

import * as React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import ProductCard from './product-card'
import { IProduct } from '@/lib/db/models/product.model'

export default function ProductSlider({
  title,
  products,
  hideDetails = false,
}: {
  title?: string
  name?: string
  products: IProduct[]
  hideDetails?: boolean
}) {
  return (
    <div className='w-full bg-background'>
      <h2 className='h2-bold mb-5'>{title}</h2>
      <Carousel
        opts={{
          align: 'start',
        }}
        className='w-full'
      >
        <CarouselContent>
          {products.map((product) => (
            <CarouselItem
              key={product.slug}
              className={
                hideDetails
                  ? 'sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6'
                  : 'sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5'
              }
            >
              <ProductCard
                hideDetails={hideDetails}

                hideBorder
                product={product}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className='left-0' />
        <CarouselNext className='right-0' />
      </Carousel>
    </div>
  )
}