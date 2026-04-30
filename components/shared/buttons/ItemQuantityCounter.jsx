"use client"
import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import Counter from '@/components/Counter';
import { useUpdateItemQuantity } from '@/services/shopping/cart/useUpdateItemQuantity';
import { useTranslations } from 'next-intl';
import { useCartStore } from '@/services/state_management/useCartStore';
import { useDeleteItemFromCart } from '@/services/shopping/cart/useDeleteItemFromCart';
import { Spinner } from '@/components/ui/spinner';

export const ItemQuantityCounter = (
  {
    item,
    minusIcon = "-" ,
    plusIcon = "+"
  }
) => {
  const shoppingT = useTranslations("shopping");
  const {updateItemQuantity} = useCartStore();
  const {mutate:updateMutate , isPending:updateLoading} = useUpdateItemQuantity();
  const [quantity , setQuantity] = useState(item?.quantity);
  const {mutate:deleteItemFunc , isPending:deleteItemLoading , variables:deletingVariables} = useDeleteItemFromCart();
  let updateTimeout = useRef(null)

  const handleUpdateServerQuantity = (quantity) => {
    if(updateTimeout.current) clearTimeout(updateTimeout);
    updateTimeout = setTimeout(() => {
      updateMutate({itemId : item?.id , quantity , translate : shoppingT});
    },500)
  }

  const handleIncreaseQu = () => {
    if(quantity < 10) {
      setQuantity(prev => {
        const newQ = prev + 1
        handleUpdateServerQuantity(newQ)
        return newQ
      });
      updateItemQuantity({id : item?.id , updateType : "increase"})
    }
  }
  const handleDecreaseQu = () => {
    if(quantity > 1) {
      setQuantity(prev => {
        const newQ = prev - 1
        handleUpdateServerQuantity(newQ)
        return newQ;
      });
      updateItemQuantity({id : item?.id , updateType : "decrease"})
    }else {
      deleteItemFunc({item : {id : item?.id , products : item?.products , quantity:item?.quantity , final_price:item?.final_price}})
    }
  }

  return (
        <div className="flex justify-center items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handleDecreaseQu}
            className="w-8 h-8 cursor-pointer"
            disabled={deletingVariables?.item?.id == item?.id && deleteItemLoading}
          >
            {
              deletingVariables?.item?.id == item?.id
              ?
              <Spinner className={"size-4"} />
              :
              minusIcon
            }
          </Button>
          <Counter
            value={quantity}
            places={quantity >= 10 ? [10, 1] : [1]}
            fontSize={30}
            padding={5}
            gap={2}
            fontWeight={300}
          />
          <Button
            variant="outline"
            size="icon"
            onClick={handleIncreaseQu}
            className="w-8 h-8 cursor-pointer"
            disabled={deletingVariables?.item?.id == item?.id && deleteItemLoading}
          >
            {plusIcon}
          </Button>
        </div>
  )
}