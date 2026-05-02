import React from 'react';
import { getTranslations } from 'next-intl/server';
import { CiDeliveryTruck, CiStar } from "react-icons/ci";
import { TbTruckReturn } from "react-icons/tb";
import { PiTreeLight } from "react-icons/pi";
import { Link } from '@/i18n/navigation';

async function AboveFooter() {
    const t = await getTranslations("aboveFooter");
    const boxBorder = "border-b-[.3px] md:border-b-0 md:ltr:border-r-[.3px] md:rtl:border-l-[.3px] border-slate-200";
    return (
        <div className="border-y-[.3px] border-slate-200 dark:bg-transparent mt-[50px]">
            <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 ">
                {/* Item 1 */}
                <div className={`flex flex-col items-center justify-center text-center py-10 px-4 ${boxBorder}`}>
                    <CiDeliveryTruck className="text-[40px] mb-4 text-slate-800 dark:text-slate-200" />
                    <h3 className="font-serif text-lg mb-2 text-slate-900 dark:text-slate-100">{t("Free Shipping")}</h3>
                    <p className="text-xs">{t("Fast & free delivery")}</p>
                </div>

                {/* Item 2 */}
                <div className={`flex flex-col items-center justify-center text-center py-10 px-4 ${boxBorder}`}>
                    <TbTruckReturn className="text-[40px] mb-4 text-slate-800 dark:text-slate-200" />
                    <h3 className="font-serif text-lg mb-2 text-slate-900 dark:text-slate-100">{t("90 Day Returns")}</h3>
                    <p className="text-xs">{t("Easy returns & exchanges")}</p>
                </div>

                {/* Item 3 */}
                <div className={`flex flex-col items-center justify-center text-center py-10 px-4 ${boxBorder}`}>
                    <CiStar className="text-[40px] mb-4 text-slate-800 dark:text-slate-200" />
                    <h3 className="font-serif text-lg mb-2 text-slate-900 dark:text-slate-100">{t("5-Star Care")}</h3>
                    <p className="text-xs">
                        {t("We're here for you anytime")} 
                        <Link href={`mailto:${"ezat6518@gmail.com"}`} className='text-active-text-primary mx-1 underline transition-all duration-300'>
                            ezat6518@gmail.com
                        </Link>
                    </p>
                </div>

                {/* Item 4 */}
                <div className="flex flex-col items-center justify-center text-center py-10 px-4">
                    <PiTreeLight className="text-[40px] mb-4 text-slate-800 dark:text-slate-200" />
                    <h3 className="font-serif text-lg mb-2 text-slate-900 dark:text-slate-100">{t("Feel Good")}</h3>
                    <p className="text-xs">{t("Sustainable purchases mean you're doing good for yourself and the planet")}</p>
                </div>
            </div>
        </div>
    );
}

export default AboveFooter;
