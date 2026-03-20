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
import { GoTrash } from 'react-icons/go';
import { useDeleteWishlistItem } from '@/services/shopping/wishlsit/useDeleteWishlistItem';
import DeleteSomethingbtn from '../actions-buttons/DeleteSomethingBtn';
import { Spinner } from '../spinner';
function WishlistProductCard({className , wishlistItemid ,  item}) {
    const currentLocale = useLocale();
    const {profile  , session} = UserAuth();
    const {data} = useWishlistData({userId : session?.user?.id});
    const {addItem , cartData , updateItemQuantity} = useCartStore();
    const {mutate:deleteItemFunc , isPending:deleteLoading} = useDeleteWishlistItem();
    const handleDeleteWishlistItem = () => {
        deleteItemFunc({itemId : wishlistItemid})
    }
    return (
        <div className={`product-card relative flex flex-col justify-center items-center ${className} dark:shadow-accent-foreground mt-9 w-fit rounded-3xl bg-white dark:bg-background shadow-flexable-shadow px-2 py-3 max-w-[300px]`}>
            <Link href={`/product-details/${item?.slug}`}>
                <div className='image-div aspect-[4/3] relative rounded-3xl overflow-hidden w-full h-[170px]'>
                    <Image
                        src={item.image_url}
                        alt={`${item?.title} product image`} 
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
                        {item?.title}
                    </p>
                    {
                        item?.discount_amount >= 1
                        ?
                        <div className='relative flex justify-center items-center md:justify-start gap-2'>
                            <p className='font-bold text-center md:text-start'>{item.price_after_discount}$</p>
                            <p className='font-bold text-center md:text-start line-through text-red-700'>{item.price}$</p>
                        </div>
                        :
                        <div className='relative flex justify-center items-center md:justify-start gap-2'>
                            <p className='font-bold text-center md:text-start'>{item.price}$</p>
                        </div>
                    }
                    <p className='text-center line-clamp-2 md:text-start'
                    onClick={() => {
                        updateItemQuantity(item.id)
                    }}
                    >
                        {item?.description}
                    </p>
                </div>
                {
                    <HandleOutOfStockActions
                    className={"my-1"}
                    item={item}
                    elements={
                        <div className='card-icons relative flex justify-between w-full my-2'>
                            <AddToCartBtn 
                                className={"w-full"}
                                item={item}
                            />
                        </div>
                    }
                    />
                }
            </div>
            {
                item.discount_amount >= 1
                &&
                <p className={`absolute inset-y-0 translate-y-4 h-fit ${currentLocale == "ar" ? "right-3" : "left-3"} bg-red-600 text-center md:text-start text-white py-1 px-2`}>
                    -
                    {
                        item.discount_type === "fixed"
                        ?
                        `${item.discount_amount}$`
                        :
                        `${item.discount_amount}%`
                    }
                </p>
            }
            <div className="absolute top-2 flex justify-center items-center rounded-[50%] bg-slate-400 p-3 right-2 w-fit">
                <DeleteSomethingbtn
                    deleteFunc={handleDeleteWishlistItem}
                    loading={deleteLoading}
                    loadingElement={<Spinner className="size-4"/>}
                    descrip={"When confirm will delete this item from your wihslist!"}
                />
            </div>
        </div>
    )
}

export default WishlistProductCard