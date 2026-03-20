import { create } from "zustand";
const cartShape = {
    products : [] , 
    sub_total: 0 , 
    total_price : 0 , 
    status : "pending" , 
    tax: 0
}
export const useCartStore = create(set => ({
    cartData : cartShape,
    setItems : (data) => set(() => {
        return {cartData : data}
    }),
    clearItems : () => set(() => {
        return cartShape
    }),
    addItem : (item) => set(state => {
        return {cartData : {...state.cartData , products : [...state.cartData.products , item]}}
    }),
    updateItemQuantity : ({id , updateType}) => set((state) => {
        const newItemsAfterUpdate = state.cartData.products?.map(item => {
            return item.products?.id == id ? {
                ...item , 
                quantity : updateType == "increase" ? item.quantity+1 : item.quantity-1
            } : item
        });
        return {cartData : {...state.cartData , products : newItemsAfterUpdate}}
    })
}))