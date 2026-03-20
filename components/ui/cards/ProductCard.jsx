"use client"
import React, { useEffect, useState } from 'react';
import { Link } from '@/i18n/navigation';
import { useLocale } from 'next-intl';
import AddToCartBtn from '../../shared/buttons/AddToCartBtn';
import AddToWhishlistBtn from '../../shared/buttons/AddToWhishlistBtn';
import Image from 'next/image';
import HandleOutOfStockActions from '@/helper/HandleOutOfStockActions';
import { UserAuth } from '@/context/AuthProvider';
import HandleTranslate from '@/helper/HandleTranslate';
// import { useDeleteItemFromCart } from '@/services/shopping/cart/useDeleteItem';
import { useCartData } from '@/services/shopping/cart/useCartData';
import { useCartStore } from '@/services/state_management/useCartStore';
import { useWishlistData } from '@/services/shopping/wishlsit/useWishlistData';
import { useAppSettings } from '@/services/settings/useAppSettings';

function ProductCard({className , product , productAfterConvert}) {
    const currentLocale = useLocale();
    const {profile  , session} = UserAuth();
    const {data} = useWishlistData({userId : session?.user?.id});
    const [alreadyInShishlist , setAlreadyInShishlist] = useState();
    const {addItem , cartData , updateItemQuantity} = useCartStore();
    const {data:settingsData} = useAppSettings()
    
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
                    <p className='font-bold line-clamp-1 text-foreground text-center md:text-start'
                    onClick={() => {
                        addItem({id : 1 , title : "new item"})
                    }}
                    >
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
                    <p className='text-center line-clamp-2 md:text-start'
                    onClick={() => {
                        updateItemQuantity(product.id)
                    }}
                    >
                        {productAfterConvert.description}
                    </p>
                </div>
                {
                <div className='card-icons relative flex justify-between w-full my-2'>
                    <HandleOutOfStockActions
                    className={"my-1"}
                    item={product}
                    elements={ <AddToCartBtn item={product}/> }
                    />
                    <AddToWhishlistBtn item={product} />
                </div>
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
                        `${product.discount_amount}${settingsData?.currency}`
                        :
                        `${product.discount_amount}%`
                    }
                </p>
            }
        </div>
    )
}

export default ProductCard