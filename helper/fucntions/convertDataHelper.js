export const convertDataHelper = (data , locale) => {
    const finalData = data?.map(item => ({
        ...item,
        title : item.title[locale],
        description : item.description[locale],
        category : item.category[locale]
    }))
    return finalData
}