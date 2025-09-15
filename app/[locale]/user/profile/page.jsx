import React from 'react';
import ProfileContent from './ProfileContent';




async function Profile() {
  return (
    <div className='relative w-full flex min-h-screen'>
      <div className={`profile-data relative w-full`}>
        {/* <Section className={""} containerClassName={"!mt-0"}>
          <div className='header relative border-b border-slate-300 p-2 flex justify-between items-center'>
            <h1 className=''>Profile information</h1>
            <ProfileActions/>
          </div>
          <div className='relative flex-flex-col py-5'>
            <div className='relative flex flex-col md:flex-row items-center justify-center md:justify-start gap-x-2.5 p-2'>
              <div className='relative user-img w-[100px] h-[100px] max-w-[100px] max-h-[100px] rounded-[50%] overflow-hidden'>
                <Image 
                  src={"https://i.pinimg.com/1200x/d9/e1/4c/d9e14c251d468cc476c0ec33f969b5da.jpg"} 
                  alt='image'
                  title='user.name'
                  fill
                />
              </div>
              <div className='info relatie flex flex-col gap-y-3.5'>
                <div className=''>
                  <h1 className='font-bold text-center md:text-start'>Mohamed Ezat Mohamed</h1>
                  <p className='flex items-center gap-x-0.5 text-center justify-center md:justify-start'>
                    <HiOutlineMail className='translate-y-0.5'/>
                    ezat6518@gmai.com
                  </p>
                </div>
                <EditPassAndImageBtns/>
              </div>
            </div>
          </div>
          <ProfileTabs/>
        </Section> */}
        <ProfileContent/>
      </div>
    </div>
  )
}

export default Profile