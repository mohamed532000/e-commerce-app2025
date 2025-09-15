import React, { useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
function CountriesPhoneCodeSelect({className , handleSetPhoneCode}) {
    const [code , setCode] = useState();
    const countryPhoneCodes = [
        { country: "United States", code: "+1" },
        { country: "Canada", code: "+1" },
        { country: "United Kingdom", code: "+44" },
        { country: "Germany", code: "+49" },
        { country: "France", code: "+33" },
        { country: "Italy", code: "+39" },
        { country: "Spain", code: "+34" },
        { country: "Netherlands", code: "+31" },
        { country: "Belgium", code: "+32" },
        { country: "Switzerland", code: "+41" },
        { country: "Sweden", code: "+46" },
        { country: "Norway", code: "+47" },
        { country: "Denmark", code: "+45" },
        { country: "Finland", code: "+358" },
        { country: "Ireland", code: "+353" },
        { country: "Poland", code: "+48" },
        { country: "Russia", code: "+7" },
        { country: "Turkey", code: "+90" },
        { country: "Egypt", code: "+20" },
        { country: "Saudi Arabia", code: "+966" },
        { country: "United Arab Emirates", code: "+971" },
        { country: "Qatar", code: "+974" },
        { country: "Kuwait", code: "+965" },
        { country: "Bahrain", code: "+973" },
        { country: "Oman", code: "+968" },
        { country: "India", code: "+91" },
        { country: "Pakistan", code: "+92" },
        { country: "Bangladesh", code: "+880" },
        { country: "China", code: "+86" },
        { country: "Japan", code: "+81" },
        { country: "South Korea", code: "+82" },
        { country: "Philippines", code: "+63" },
        { country: "Indonesia", code: "+62" },
        { country: "Malaysia", code: "+60" },
        { country: "Thailand", code: "+66" },
        { country: "Vietnam", code: "+84" },
        { country: "Australia", code: "+61" },
        { country: "New Zealand", code: "+64" },
        { country: "South Africa", code: "+27" },
        { country: "Nigeria", code: "+234" },
        { country: "Kenya", code: "+254" },
        { country: "Brazil", code: "+55" },
        { country: "Argentina", code: "+54" },
        { country: "Mexico", code: "+52" },
        { country: "Chile", code: "+56" },
        { country: "Colombia", code: "+57" }
    ];
    const handleSelectCode = (code) => {
        handleSetPhoneCode(code)
        setCode(code)
    }
    return (
        <Select value={code} className={`relative ${className}`}
        onValueChange={(value) => {
            const [country , code] = value.split("-");
            console.log(code)
            handleSelectCode(code)
        }}
        >
            <SelectTrigger className={" relative"}>
                <SelectValue placeholder={code} value={code}/>
            </SelectTrigger>
            <SelectContent>
                {
                countryPhoneCodes.map((item , index) => (
                    <SelectItem key={index} value={`${item.country}-${item.code}`}>{item.country} {item.code}</SelectItem>
                ))
                }
            </SelectContent>
        </Select>
    )
}

export default CountriesPhoneCodeSelect