'use client'

import ImageComponent from '@/components/image'
import { ProductType } from '@/interfaces'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const ShoppingCard = () => {

    const [products, setProducts] = useState<ProductType[]>(JSON.parse(localStorage.getItem('carts') as string) || [])
    const [total, setTotal] = useState<number>(0)

    const removeCart = (id: number) => {
        const upDatedData = products.filter((product) => product.id !== id)
        setProducts(upDatedData)
        localStorage.setItem('carts', JSON.stringify(upDatedData))
    }

    const handleIncrement = (id: number) => {
        const updatedCart = products.map((product) => {
            if (product.id === id) {
                return {
                    ...product,
                    quantity: (product.quantity ?? 0) + 1,
                };
            }

            return product;
        });

        setProducts(updatedCart)
        localStorage.setItem('carts', JSON.stringify(updatedCart))
    }

    const handleDecrement = (id: number) => {
        const exitProduct = products.find((product) => product.id === id)

        if (exitProduct?.quantity === 1) {
            removeCart(exitProduct.id)
        } else {
            const updatedCart = products.map((product) => {
                if (product.id === id) {
                    return {
                        ...product,
                        quantity: (product.quantity ?? 0) - 1
                    }
                }
                return product
            })


            setProducts(updatedCart);
            localStorage.setItem('carts', JSON.stringify(updatedCart));


        }

    }

    useEffect(()=>{
        const total = products.reduce((acc: number, item: ProductType)=>{
            return acc + item.price * (item.quantity ?? 0)
        }, 0)

        setTotal(total)
    },[products])


    return (
        <>
            {
                products.length ?
                    (<section className="py-24 relative">
                        <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">

                            <h2 className="title font-manrope font-bold text-4xl leading-10 mb-8 text-center text-black">Shopping Cart
                            </h2>
                            <div className="hidden lg:grid grid-cols-2 py-6">
                                <div className="font-normal text-xl leading-8 text-gray-500">Product</div>
                                <p className="font-normal text-xl leading-8 text-gray-500 flex items-center justify-between">
                                    <span className="w-full max-w-[200px] text-center">Delivery Charge</span>
                                    <span className="w-full max-w-[260px] text-center">Quantity</span>
                                    <span className="w-full max-w-[200px] text-center">Total</span>
                                </p>
                            </div>

                            {
                                products.map((product) => (
                                    <div key={product.id} className="grid grid-cols-1 lg:grid-cols-2 min-[550px]:gap-6 border-t border-gray-200 py-6">
                                        <div
                                            className="flex items-center flex-col min-[550px]:flex-row gap-3 min-[550px]:gap-6 w-full max-xl:justify-center max-xl:max-w-xl max-xl:mx-auto">
                                            <div className="relative w-40 h-40 mr-8">
                                                <ImageComponent url={product} />
                                            </div>
                                            <div className="pro-data w-full max-w-sm ">
                                                <h5 className="font-semibold text-xl leading-8 text-black max-[550px]:text-center">
                                                    {product.title}
                                                </h5>
                                                <p
                                                    className="font-normal text-lg leading-8 text-gray-500 my-2 min-[550px]:my-3 max-[550px]:text-center">
                                                    {product.category}
                                                </p>
                                                <div className='flex justify-between'>
                                                    <h6 className="font-medium text-lg leading-8 text-indigo-600  max-[550px]:text-center">
                                                        {`$${product.price}`}
                                                    </h6>
                                                    <button onClick={() => removeCart(product.id)}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-7">
                                                            <path d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75C22.5 3.839 21.66 3 20.625 3H3.375Z" />
                                                            <path fillRule="evenodd" d="m3.087 9 .54 9.176A3 3 0 0 0 6.62 21h10.757a3 3 0 0 0 2.995-2.824L20.913 9H3.087Zm6.133 2.845a.75.75 0 0 1 1.06 0l1.72 1.72 1.72-1.72a.75.75 0 1 1 1.06 1.06l-1.72 1.72 1.72 1.72a.75.75 0 1 1-1.06 1.06L12 15.685l-1.72 1.72a.75.75 0 1 1-1.06-1.06l1.72-1.72-1.72-1.72a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                                                        </svg>
                                                    </button>
                                                </div>

                                            </div>
                                        </div>
                                        <div
                                            className="flex items-center flex-col min-[550px]:flex-row w-full max-xl:max-w-xl max-xl:mx-auto gap-2">
                                            <h6 className="font-manrope font-bold text-2xl leading-9 text-black w-full max-w-[176px] text-center">
                                                $15.00 <span className="text-sm text-gray-300 ml-3 lg:hidden whitespace-nowrap">(Delivery
                                                    Charge)</span></h6>
                                            <div className="flex items-center w-full mx-auto justify-center">
                                                <button onClick={() => handleDecrement(product.id)}
                                                    className="group rounded-l-full px-6 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:border-gray-300 hover:bg-gray-50">
                                                    <svg className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                                                        xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22"
                                                        fill="none">
                                                        <path d="M16.5 11H5.5" stroke="" strokeWidth="1.6" strokeLinecap="round" />
                                                        <path d="M16.5 11H5.5" stroke="" strokeOpacity="0.2" strokeWidth="1.6"
                                                            strokeLinecap="round" />
                                                        <path d="M16.5 11H5.5" stroke="" strokeOpacity="0.2" strokeWidth="1.6"
                                                            strokeLinecap="round" />
                                                    </svg>
                                                </button>
                                                <input type="text"
                                                    className="border-y border-gray-200 outline-none text-gray-900 font-semibold text-lg w-full max-w-[118px] min-w-[80px] placeholder:text-gray-900 py-[15px] text-center bg-transparent"
                                                    placeholder={`${product.quantity}`} />
                                                <button onClick={() => handleIncrement(product.id)}
                                                    className="group rounded-r-full px-6 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:border-gray-300 hover:bg-gray-50">
                                                    <svg className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                                                        xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22"
                                                        fill="none">
                                                        <path d="M11 5.5V16.5M16.5 11H5.5" stroke="" strokeWidth="1.6"
                                                            strokeLinecap="round" />
                                                        <path d="M11 5.5V16.5M16.5 11H5.5" stroke="" strokeOpacity="0.2" strokeWidth="1.6"
                                                            strokeLinecap="round" />
                                                        <path d="M11 5.5V16.5M16.5 11H5.5" stroke="" strokeOpacity="0.2" strokeWidth="1.6"
                                                            strokeLinecap="round" />
                                                    </svg>
                                                </button>
                                            </div>
                                            <h6
                                                className="text-indigo-600 font-manrope font-bold text-2xl leading-9 w-full max-w-[176px] text-center">
                                                {`$${(product.price * (product.quantity ?? 0)).toFixed(2)}`}
                                            </h6>
                                        </div>
                                    </div>
                                ))
                            }


                            <div className="bg-gray-50 rounded-xl p-6 w-full mb-8 max-lg:max-w-xl max-lg:mx-auto">
                                <div className="flex items-center justify-between w-full mb-6">
                                    <p className="font-normal text-xl leading-8 text-gray-400">Sub Total</p>
                                    <h6 className="font-semibold text-xl leading-8 text-gray-900">{total.toLocaleString('en-US', {
										currency: 'usd',
										style: 'currency',
									})}</h6>
                                </div>
                                <div className="flex items-center justify-between w-full pb-6 border-b border-gray-200">
                                    <p className="font-normal text-xl leading-8 text-gray-400">Delivery Charge</p>
                                    <h6 className="font-semibold text-xl leading-8 text-gray-900">{(15).toLocaleString('en-US', {
										currency: 'usd',
										style: 'currency',
									})}</h6>
                                </div>
                                <div className="flex items-center justify-between w-full py-6">
                                    <p className="font-manrope font-medium text-2xl leading-9 text-gray-900">Total</p>
                                    <h6 className="font-manrope font-medium text-2xl leading-9 text-indigo-500">{(total+15).toLocaleString('en-US', {
										currency: 'usd',
										style: 'currency',
									})}</h6>
                                </div>
                            </div>
                            <div className="flex items-center flex-col sm:flex-row justify-center gap-3 mt-8">
                                <button
                                    className="rounded-full py-4 w-full max-w-[280px]  flex items-center bg-indigo-50 justify-center transition-all duration-500 hover:bg-indigo-100">
                                    <span className="px-2 font-semibold text-lg leading-8 text-indigo-600">Add Coupon Code</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                        <path d="M8.25324 5.49609L13.7535 10.9963L8.25 16.4998" stroke="#4F46E5" strokeWidth="1.6"
                                            strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                                <button
                                    className="rounded-full w-full max-w-[280px] py-4 text-center justify-center items-center bg-indigo-600 font-semibold text-lg text-white flex transition-all duration-500 hover:bg-indigo-700">Continue
                                    to Payment
                                    <svg className="ml-2" xmlns="http://www.w3.org/2000/svg" width="23" height="22" viewBox="0 0 23 22"
                                        fill="none">
                                        <path d="M8.75324 5.49609L14.2535 10.9963L8.75 16.4998" stroke="white" strokeWidth="1.6"
                                            strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </section>) :
                    (
                        <div className='flex h-[calc(100vh-80px)] items-center justify-center p-5 bg-white w-full'>
                            <div className='text-center'>
                                <div className='inline-flex rounded-full bg-yellow-100 p-4'>
                                    <div className='rounded-full stroke-yellow-600 bg-yellow-200 p-4'>
                                        <svg
                                            className='w-16 h-16'
                                            viewBox='0 0 28 28'
                                            fill='none'
                                            xmlns='http://www.w3.org/2000/svg'
                                        >
                                            <path
                                                d='M14.0002 9.33337V14M14.0002 18.6667H14.0118M25.6668 14C25.6668 20.4434 20.4435 25.6667 14.0002 25.6667C7.55684 25.6667 2.3335 20.4434 2.3335 14C2.3335 7.55672 7.55684 2.33337 14.0002 2.33337C20.4435 2.33337 25.6668 7.55672 25.6668 14Z'
                                                strokeWidth='2'
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                            ></path>
                                        </svg>
                                    </div>
                                </div>
                                <h1 className='mt-5 text-[36px] font-bold text-slate-800 lg:text-[50px]'>
                                    Shopping cart is empty
                                </h1>
                                <p className='text-slate-600 mt-5 lg:text-lg'>
                                    The page you are looking for doesn't exist or <br />
                                    has been removed.
                                </p>
                                <Link href={'/products'}>
                                    <button className='button bg-blue-600 mt-4 text-white border-transparent hover:border-blue-600 hover:bg-transparent hover:text-black'>
                                        Products
                                    </button>
                                </Link>
                            </div>
                        </div>
                    )
            }
        </>


    )
}

export default ShoppingCard