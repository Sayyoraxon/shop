"use client"

import { ProductType } from '@/interfaces';
import Image from 'next/image';
import React, { FC, useState } from 'react'


const ImageComponent: FC<{url: ProductType}> = ({url}) => {

  const [isLoading, setIsLoading] = useState<boolean>(true)

  return (
    <>
        <Image src={url.image} alt="product" fill 
        className={`object-contain duration-700 ease-in-out group-hover:opacity-75 ${
          isLoading
            ? 'scale-110 blur-2xl grayscale'
            : 'scale-100 blur-0 grayscale-0'
        }}`}
        onLoadingComplete={()=>setIsLoading(false)}/>
    </>
  )
}

export default ImageComponent