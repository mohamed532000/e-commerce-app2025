import React from 'react';
import ProfileContent from './ProfileContent';

async function Profile() {
  return (
    <div className='relative w-full flex min-h-screen'>
      <div className={`profile-data relative w-full`}>
        <ProfileContent/>
      </div>
    </div>
  )
}

export default Profile