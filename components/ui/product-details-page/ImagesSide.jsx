"use client"
import Image from 'next/image'
import React, { useState } from 'react'



const SubImageItem = ({image , title , handleShowTargetImage}) => {
  return (
    <div className='relative min-h-[70px] col-span-1 cursor-pointer group overflow-hidden'
    onClick={() => handleShowTargetImage(image)}
    >
      <Image 
      src={image} 
      className='object-cover group-hover:scale-110 transition-all duration-300'
      alt='image'
      title={title}
      fill
      />
    </div>
  )
}


function ImagesSide({title , mainImage , subImagesList}) {
  const [targetImage , setTargetImage] = useState(mainImage);
  const handleChangeTargetImage = (image) => {
    setTargetImage(image)
  }
  return (
    <div className={`images-side relative col-span-2 md:col-span-1 flex flex-col gap-y-1`}>
      <div className='main-image relative max-h-[400px] aspect-[4/3]'>
          <Image
          src={targetImage} 
          className='absolute top-0 object-cover'
          alt='image'
          title={title}
          fill
          />
      </div>
      {
        subImagesList?.length >= 1
        &&
        <div className='relative w-full h-[100px] grid grid-cols-4 gap-1'>
          <SubImageItem image={mainImage} title={mainImage} handleShowTargetImage={handleChangeTargetImage}/>
          {
            subImagesList?.map((image , index) => <SubImageItem key={index} image={image} title={image} handleShowTargetImage={handleChangeTargetImage}/>)
          }
  
        </div>
      }
  </div>
  )
}

export default ImagesSide