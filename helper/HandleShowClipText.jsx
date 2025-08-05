import React from 'react'

function HandleShowClipText({text , max , start , end}) {
  return (
    text?.length >= max ? `${text.slice(start , end)}...` : text
  )
}

export default HandleShowClipText