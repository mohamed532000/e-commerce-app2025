"use client"
import React, { useEffect, useState } from 'react';
import HandleTranslate from '@/helper/HandleTranslate';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { GoTrash } from 'react-icons/go';

function DeleteSomethingbtn({
    className,
    iconElement = <GoTrash className='inline-block cursor-pointer'/> , 
    title = "Are you absolutely sure?" , 
    descrip , 
    deleteFunc , 
    loading,
    loadingElement = <><HandleTranslate word={"Loading"} page={"global"}/>..</>
}) {
  const [openConfirmation , setOpenConfirmation] = useState(false);
  const handleDelete = () => {
    deleteFunc();
  }
  return (
    <>
      <AlertDialog open={openConfirmation} onOpenChange={setOpenConfirmation}>
        <AlertDialogTrigger
        className={`relative bg-transparent outline-0 border-0 cursor-pointer ${className}`}
        >
          {loading ? loadingElement : iconElement }
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogDescription>
              {descrip}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
            >
              <HandleTranslate word={"Cancel"} page={"global"} />
            </AlertDialogCancel>
            <AlertDialogAction
              disabled = {loading}
              onClick={handleDelete}
            >
              {
                loading
                ?
                loadingElement
                :
                <HandleTranslate word={"Continue"} page={"global"}/>
              }
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default DeleteSomethingbtn