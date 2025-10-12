export const convertDataHelper = (data , locale) => {
    try {
        let finalData;
        if(Array.from(data)?.length > 1) {
            finalData = data?.map(item => ({
                ...item,
                title : item.title[locale],
                description : item.description[locale],
                slug : item.slug[locale],
                category : item.category[locale],
                attributes : {...(Object.keys(item.attributes?.[locale]) ? item.attributes[locale] : {})}
            }))
        }else {
            finalData = {
                ...data,
                title : data?.title[locale],
                slug : data?.slug[locale],
                description : data?.description[locale],
                category : data.category[locale],
                attributes : {...(Object.keys(data.attributes?.[locale]) ? data.attributes[locale] : {})}
            }
        }
        return finalData
    }catch(error) {
        console.log("error converting data to ->>" , locale , error)
    }
}