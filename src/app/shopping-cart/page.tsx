'use client'

import ImageComponent from '@/components/image'
import { ProductType } from '@/interfaces'
import React, { useEffect, useState } from 'react'

const ShoppingCard = () => {
    const [products, setProducts] = useState<ProductType[]>([])

    useEffect(() => {
        const savedCart = localStorage.getItem('carts');
        if (savedCart) {
            setProducts(JSON.parse(savedCart));
        }
    }, []);

    const removeCart = (id: number) => {
        const updatedData = products.filter((product) => product.id !== id);
        setProducts(updatedData);
        localStorage.setItem('carts', JSON.stringify(updatedData));
    };

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

        setProducts(updatedCart);
        localStorage.setItem('carts', JSON.stringify(updatedCart));
    };

    const handleDecrement = (id: number) => {
        const existingProduct = products.find((product) => product.id === id);

        if (existingProduct?.quantity === 1) {
            removeCart(existingProduct.id);
        } else {
            const updatedCart = products.map((product) => {
                if (product.id === id) {
                    return {
                        ...product,
                        quantity: (product.quantity ?? 0) - 1,
                    };
                }
                return product;
            });

            setProducts(updatedCart);
            localStorage.setItem('carts', JSON.stringify(updatedCart));
        }
    };

    return (
        <>
            {
                products.length ? (
                    <section className="py-24 relative">
                        <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
                            <h2 className="title font-manrope font-bold text-4xl leading-10 mb-8 text-center text-black">Shopping Cart</h2>
                            <div className="hidden lg:grid grid-cols-2 py-6">
                                <div className="font-normal text-xl leading-8 text-gray-500">Product</div>
                                <p className="font-normal text-xl leading-8 text-gray-500 flex items-center justify-between">
                                    <span className="w-full max-w-[200px] text-center">Delivery Charge</span>
                                    <span className="w-full max-w-[260px] text-center">Quantity</span>
                                    <span className="w-full max-w-[200px] text-center">Total</span>
                                </p>
                            </div>

                            {products.map((product) => (
                                <div key={product.id} className="grid grid-cols-1 lg:grid-cols-2 min-[550px]:gap-6 border-t border-gray-200 py-6">
                                    <div className="flex items-center flex-col min-[550px]:flex-row gap-3 min-[550px]:gap-6 w-full max-xl:justify-center max-xl:max-w-xl max-xl:mx-auto">
                                        <div className="relative w-40 h-40 mr-8">
                                            <ImageComponent url={product} />
                                        </div>
                                        <div className="pro-data w-full max-w-sm ">
                                            <h5 className="font-semibold text-xl leading-8 text-black max-[550px]:text-center">
                                                {product.title}
                                            </h5>
                                            <p className="font-normal text-lg leading-8 text-gray-500 my-2 min-[550px]:my-3 max-[550px]:text-center">
                                                {product.category}
                                            </p>
                                            <div className='flex justify-between'>
                                                <h6 className="font-medium text-lg leading-8 text-indigo-600 max-[550px]:text-center">
                                                    {`$${product.price}`}
                                                </h6>
                                                <button onClick={() => removeCart(product.id)}>
                                                    {/* Delete icon */}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center flex-col min-[550px]:flex-row w-full max-xl:max-w-xl max-xl:mx-auto gap-2">
                                        <h6 className="font-manrope font-bold text-2xl leading-9 text-black w-full max-w-[176px] text-center">
                                            $15.00 <span className="text-sm text-gray-300 ml-3 lg:hidden whitespace-nowrap">(Delivery Charge)</span>
                                        </h6>
                                        <div className="flex items-center w-full mx-auto justify-center">
                                            <button onClick={() => handleDecrement(product.id)}>
                                                {/* Decrement button */}
                                            </button>
                                            <input type="text" className="text-center" value={product.quantity} readOnly />
                                            <button onClick={() => handleIncrement(product.id)}>
                                                {/* Increment button */}
                                            </button>
                                        </div>
                                        <h6 className="text-indigo-600 font-manrope font-bold text-2xl leading-9 w-full max-w-[176px] text-center">
                                            {`$${(product.price * (product.quantity ?? 0)).toFixed(2)}`}
                                        </h6>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                ) : (
                    <p>Your cart is empty.</p>
                )
            }
        </>
    );
};

export default ShoppingCard;
