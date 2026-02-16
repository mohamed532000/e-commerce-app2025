"use client"
import React, { useEffect, useState } from 'react';
import { Link } from '@/i18n/navigation';
import { useLocale, useTranslations } from 'next-intl';
import AddToCartBtn from '../AddToCartBtn';
import AddToWhishlistBtn from '../AddToWhishlistBtn';
import Image from 'next/image';
import HandleOutOfStockActions from '@/helper/HandleOutOfStockActions';
import { useAddToCart } from '@/services/shopping/useAddToCart';
import { UserAuth } from '@/context/AuthProvider';
import HandleTranslate from '@/helper/HandleTranslate';
import { Spinner } from '../spinner';
import { useCartStore } from '@/services/client/useCartStore';
import { convertDataHelper } from '@/helper/fucntions/convertDataHelper';
import { toast } from 'sonner';
import SelecktonLoading from '../loading/SelecktonLoading';

function ProductCard({className , product , productAfterConvert}) {
    const currentLocale = useLocale();
    const {profile , cart:cartData , cartLoading} = UserAuth();
    const {data : {id:cart_id , items , total_price} , deleteItem} = useCartStore()
    // const {mutate:addTocart , isPending:addTocartLoading} = useAddToCart(profile?.id);
    const [alreadyInCart , setAlreadyInCart] = useState();
    const [alreadyInShishlist , setAlreadyInShishlist] = useState();

    useEffect(() => {
        if(items) {
            const alreadyInCart = items?.find(item => item.products.id == product.id)
            alreadyInCart ? setAlreadyInCart(true) : setAlreadyInCart(false)
        }
    },[items])
    return (
        <div className={`product-card relative flex flex-col justify-center items-center ${className} dark:shadow-accent-foreground mt-9 w-fit rounded-3xl bg-white dark:bg-background shadow-flexable-shadow px-2 py-3 max-w-[300px]`}>
            <Link href={`/product-details/${productAfterConvert.slug}`}>
                <div className='image-div aspect-[4/3] relative rounded-3xl overflow-hidden w-full h-[170px]'>
                    <Image
                        src={product.image_url}
                        alt={`${productAfterConvert.title} product image`} 
                        fill
                        sizes='(max-width: 768px) 50vw, (max-width: 1024px) 30vw, 250px'
                        className='object-cover hover:scale-105 hover:rotate-2 transition-all duration-300'
                        quality={85}
                        priority={false}
                    />
                </div>
            </Link>
            <div className='flex flex-col gap-1 px-2'>
                <div className='product-info relative flex flex-col gap-1'>
                    <p className='font-bold line-clamp-1 text-foreground text-center md:text-start'>
                        {productAfterConvert.title}
                    </p>
                    {
                        product.discount_amount >= 1
                        ?
                        <div className='relative flex justify-center items-center md:justify-start gap-2'>
                            <p className='font-bold text-center md:text-start'>{product.price_after_discount}$</p>
                            <p className='font-bold text-center md:text-start line-through text-red-700'>{product.price}$</p>
                        </div>
                        :
                        <div className='relative flex justify-center items-center md:justify-start gap-2'>
                            <p className='font-bold text-center md:text-start'>{product.price}$</p>
                        </div>
                    }
                    <p className='text-center line-clamp-2 md:text-start'>
                        {productAfterConvert.description}
                    </p>
                </div>
                {
                    <HandleOutOfStockActions
                    className={"my-1"}
                    item={product}
                    elements={
                        cartLoading
                        ?
                        <div className='card-icons relative flex justify-between w-full my-2'>
                            <SelecktonLoading className={"w-[70px] rounded-md"}/>
                            <SelecktonLoading className={"w-[70px] rounded-md"}/>
                        </div>
                        :
                        <div className='card-icons relative flex justify-between w-full my-2'>
                            {
                                alreadyInCart
                                ?
                                <h1 className='text-active-text-primary flex justify-center items-center'><HandleTranslate word={"Already in cart"} page={"shopping"} /></h1>
                                :
                                <AddToCartBtn 
                                // addingFunc = {handleAddToCart}
                                item={product}
                                // loading = {addTocartLoading || cartLoading}
                                />
                            }
                            {
                                alreadyInShishlist
                                ?
                                <h1 className='text-active-text-primary flex justify-center items-center'><HandleTranslate word={"Already in whishlist"} page={"shopping"} /></h1>
                                :
                                <AddToWhishlistBtn/>
                            }
                        </div>
                    }
                    />
                }
            </div>
            {
                product.discount_amount >= 1
                &&
                <p className={`absolute inset-y-0 translate-y-4 h-fit ${currentLocale == "ar" ? "right-3" : "left-3"} bg-red-600 text-center md:text-start text-white py-1 px-2`}>
                    -
                    {
                        product.discount_type === "fixed"
                        ?
                        `${product.discount_amount}$`
                        :
                        `${product.discount_amount}%`
                    }
                </p>
            }
        </div>
    )
}

export default ProductCard