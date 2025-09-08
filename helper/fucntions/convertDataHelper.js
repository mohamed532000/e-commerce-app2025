export const convertDataHelper = (data , locale) => {
    const finalData = data?.map(item => ({
        ...item,
        title : item.title[locale],
        description : item.description[locale],
        slug : item.slug[locale],
        category : item.category[locale],
        attributes : {...(Object.keys(item.attributes?.[locale]) ? item.attributes[locale] : {})}
    }))
    return finalData
}