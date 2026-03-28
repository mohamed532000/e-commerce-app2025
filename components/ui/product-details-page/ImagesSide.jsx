"use client"
import Image from 'next/image'
import React, { useState } from 'react'



const SubImageItem = ({image , title , handleShowTargetImage}) => {
  return (
    <div className='relative min-h-[70px] row-span-2 cursor-pointer group overflow-hidden'
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
    <div className={`images-side relative grid grid-cols-10 col-span-2 md:col-span-1 gap-x-1`}>
      {
        subImagesList?.length >= 1
        &&
        <div className='relative col-span-2 grid grid-rows-8 gap-y-1'>
          <SubImageItem image={mainImage} title={mainImage} handleShowTargetImage={handleChangeTargetImage}/>
          {
            subImagesList?.map((image , index) => <SubImageItem key={index} image={image} title={image} handleShowTargetImage={handleChangeTargetImage}/>)
          }
  
        </div>
      }
      <div className='main-image col-span-8 relative min-h-full max-h-[500px] aspect-[4/3]'>
          <Image
          src={targetImage} 
          className='absolute top-0 object-cover'
          alt='image'
          title={title}
          fill
          />
      </div>
  </div>
  )
}

export default ImagesSide