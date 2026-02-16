import { toast } from "sonner";
import { create } from "zustand";

export const useCartStore = create((set) => ({
    data : {id : "", items : [] , total_price : 0},
    setItems : (data) => {
        set(state => {
            const {id , products , total_price} = data;
            return {data : {id , items : products  , total_price}}
        })
    },
    // addItem : ({item , serverAction}) => {
    //     set(state => {
    //         const items = state.data?.items
    //         const alreadyExist = items?.some(i => i.products.id == item.products.id);
    //         const cartTotalPrice = state.data.total_price + item.final_price
    //         if(alreadyExist) {
    //             toast.error("Item Already In Cart");
    //             return state;
    //         }
    //         else {
    //             serverAction()
    //             return {data : {items : [...state.data?.items , item] , total_price : +(cartTotalPrice).toFixed(2)}}
    //         }
    //         }
    //     )
    // },
    deleteItem : (id , quantity , price_after_discount) => {
        set(state => {
            const items = state.data?.items
            const alreadyExist = items?.some(i => i.id == id);
            const cartTotalPrice = +(state.data.total_price - (quantity * price_after_discount)).toFixed(2);
            if(!alreadyExist) {
                toast.error("Item Already Deleted");
                return state;
            }
            return {data : {items : items?.filter(i => i.id !== id) , total_price : cartTotalPrice}}
        })
    },
    updateItem : (item , status) => {
        // need id and new quantity and price_after_discount
        set(state => {
            const items = state.data.items;
            const {id , products:itemData , quantity , final_price} = item;
            const {price_after_discount} = itemData;
            const alreadyExist = items.some(i => i.id == id);
            if(alreadyExist) {
                const final_price = +(itemData.price_after_discount * quantity).toFixed(2);
                const itemAfterUpdate = {...item , quantity , final_price}
                const cartTotalPrice = status == "increase" ? state.data.total_price + price_after_discount : state.data.total_price - price_after_discount;
                const newItems = items.map((i) => {
                    if(i.id == itemAfterUpdate.id) {
                        return itemAfterUpdate
                    }else {
                        return i
                    }
                })
                toast.success("Updated Success");
                return {data : {items : newItems , total_price : +(cartTotalPrice).toFixed(2)}}
            }else {
                toast.error("Item Not Found");
                return state
            }
        })
    },
    clearCart : (state) => ({data : {items: [] , total_price : 0}})
}))