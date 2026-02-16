"use client"
import React, { useState } from 'react';
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


function DeleteItemFromCartBtn({deleteFunc}) {
  const [openConfirmation , setOpenConfirmation] = useState(false);
//   const {mutate:signOut , isPending} = useSignOut();
    const isPending= false
  const handleDelete = () => {
    deleteFunc();
  }
  return (
    <>
      <AlertDialog open={openConfirmation} onOpenChange={setOpenConfirmation}>
        <AlertDialogTrigger
        className="relative bg-transparent outline-0 border-0 cursor-pointer"
        >
          <GoTrash className='inline-block cursor-pointer'/>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your Item data from Cart.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
            >
              <HandleTranslate word={"Cancel"} page={"global"} />
            </AlertDialogCancel>
            <AlertDialogAction
            //   disabled = {isPending}
              onClick={handleDelete}
            >
              {
                isPending
                ?
                <><HandleTranslate word={"Loading"} page={"global"}/>..</>
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

export default DeleteItemFromCartBtn