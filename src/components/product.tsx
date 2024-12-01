import { ProductType } from '@/interfaces'
import React, { FC } from 'react'
import ImageComponent from './image'
import Link from 'next/link'

const Product: FC<{ product: ProductType }> = ({ product }) => {

    return (
        <Link
			href={`/product/${product.id}`}
			className='h-[490px] flex flex-col p-6 rounded-lg group hover:scale-105 transition-transform ease-out duration-200 border'
		>
            <div className="rounded-lg">
                <div className='relative h-72 mb-10'>
                    <ImageComponent url={product}/>
                </div>
                <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font">{product.category}</h3>
                <div className='font-semibold flex items-center justify-between mt-4 mb-1'>
                    <p className='w-44 truncate'>
                        {product.title}
                    </p>
                    <p>{`$${product.price}`}</p>
                </div>
                <p className={`leading-relaxed text-base line-clamp-2`}>
                    {product.description}
                </p>
            </div>
        </Link>
    )
}

export default Product