import CouponForm from '@/app/forms/cart/CouponForm'
import HandleTranslate from '@/helper/HandleTranslate'
import React from 'react'

function CartSummarySide() {
    const divsClasses = "relative flex justify-between items-center py-2"
    return (
        <div className='relative flex flex-col gap-y-1.5 rounded-3xl p-4 border shadow-flexable-shadow'>
            <h1 className='py-2 border-b border-slate-500 dark:border-stone-100'><HandleTranslate word={"Order Summary"} page={"shopping"} /></h1>
            <div className='relative flex flex-col gap-y-1.5'>
                <div className={`${divsClasses}`}>
                    <h2>Sub total</h2>
                    <p>3200</p>
                </div>
                <div className={`${divsClasses}`}>
                    <h2>Shipping</h2>
                    <p>3200</p>
                </div>
                <div className={`${divsClasses}`}>
                    <h2>Discount</h2>
                    <p>-300</p>
                </div>
                <div className={`${divsClasses}`}>
                    <h2>Tax</h2>
                    <p>30</p>
                </div>
            </div>
            <div className={`${divsClasses} border-t border-slate-500 dark:border-stone-100`}>
                <h2>Total</h2>
                <p>30</p>
            </div>
            <div className={`${divsClasses} flex justify-start items-start gap-y-1.5 flex-col`}>
                <h2 className='text-sm'>Do you have coupon ?</h2>
                <CouponForm/>
            </div>
        </div>
    )
}

export default CartSummarySide