import React from 'react'

async function page({params}) {
  const {slug} = await params
  params && console.log(params)
  return (
    <div>products page here will be all products {slug}</div>
  )
}

export default page