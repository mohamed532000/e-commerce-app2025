export const convertDataHelper = (data , locale , targetIsSub = false) => {
    // targetIsSub to handle cart data because the cart data for products structure not the same normal products
    try {
        if(data) {
            let finalData;
            if(Array.from(data)?.length >= 1) {
                if(targetIsSub) {
                    finalData = data?.map(item => {
                        const {products:i , quantity , final_price , id} = item;
                        return ({ products : {
                            ...i,
                            ...(Object.keys(i.title).length > 1 ? {title : i.title[locale]} : i.title),
                            ...(Object.keys(i.description).length > 1 ? {description : i.description[locale]} : i.description),
                            ...(Object.keys(i.slug).length > 1 ? {slug : i.slug[locale]} : i.slug),
                            ...(Object.keys(i.category).length > 1 ? {category : i.category[locale]} : i.category),
                            attributes : {...((i.attributes && Object.keys(i.attributes?.[locale])) ? i.attributes[locale] : {})}
                        },
                        ...(quantity ? {quantity} : {}) , 
                        ...(final_price ? {final_price} : {}) ,
                        ...(id ? {id} : {}) ,
                        })
                    })
                }else {
                    finalData = data?.map(item => ({
                        ...item,
                        ...(Object.keys(item.title).length > 1 ? {title : item.title[locale]} : item.title),
                        ...(Object.keys(item.description).length > 1 ? {description : item.description[locale]} : item.description),
                        ...(Object.keys(item.slug).length > 1 ? {slug : item.slug[locale]} : item.slug),
                        ...(Object.keys(item.category).length > 1 ? {category : item.category[locale]} : item.category),
                        attributes : {...((item.attributes && Object.keys(item.attributes?.[locale])) ? item.attributes[locale] : {})}
                    }))
                }
            }else {
                finalData = {
                    ...data,
                    ...(Object.keys(data.title).length > 1 ? {title : data.title[locale]} : data.title),
                    ...(Object.keys(data.description).length > 1 ? {description : data.description[locale]} : data.description),
                    ...(Object.keys(data.slug).length > 1 ? {slug : data.slug[locale]} : data.slug),
                    ...(Object.keys(data.category).length > 1 ? {category : data.category[locale]} : data.category),
                    attributes : {...((data.attributes && Object.keys(data.attributes?.[locale])) ? data.attributes[locale] : {})}
                }
            }
            return finalData
        }
    }catch(error) {
        console.log("error converting data to ->>" , locale , error)
    }
}