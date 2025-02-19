'use client'

import { useState } from 'react'
import Image from 'next/image'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
export default function ProductGallery({ images }: { images: string[] }) {
  const [selectedImage, setSelectedImage] = useState(0)
  return (
    <div className='flex flex-col-reverse '>
      <div className='flex gap-2 md:gap-0'>
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => {
              setSelectedImage(index)
            }}
            onMouseOver={() => {
              setSelectedImage(index)
            }}
            className={`bg-white ml-0 md:ml-3 w-fit mb-2 rounded-lg overflow-hidden ${selectedImage === index
              ? 'ring-2 ring-blue-500'
              : 'ring-1 ring-gray-300'
              }`}
          >
            <Image
              src={image}
              alt={'product image'}
              width={100}
              height={75}
              priority={true}
              className='w-14 h-14 md:h-20 md:w-20'
            />
          </button>
        ))}
      </div>

      <div className='w-full '>
        <Zoom>
          <div className='relative w-full h-[320px] md:h-[500px] mb-3'>
            <Image
              src={images[selectedImage]}
              alt={'product image'}
              fill
              sizes='90vw'
              className='object-contain'
              priority={true}
            />
          </div>
        </Zoom>
      </div>
    </div>
  )
}