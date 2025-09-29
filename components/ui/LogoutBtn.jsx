"use client"
import React, { useEffect, useState } from 'react';
import { MdLogout } from 'react-icons/md';
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
import { useSignOut } from '@/services/auth/SignOut';
import { toast } from 'sonner';


function LogoutBtn() {
  const [openConfirmation , setOpenConfirmation] = useState(false);
  const {mutate:signOut , isPending , isSuccess} = useSignOut();
  useEffect(() => {
    if(isSuccess) {
      toast.success("Logout successfully!")
    }
  } , [isSuccess])
  return (
    <>
      <AlertDialog open={openConfirmation} onOpenChange={setOpenConfirmation}>
        <AlertDialogTrigger
        className="relative flex items-center gap-x-1.5 bg-transparent outline-0 border-0 cursor-pointer"
        >
          <MdLogout/>
          <span><HandleTranslate word={"Logout"} page={"global"}/></span>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your session data from our website until login again.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
            >
              <HandleTranslate word={"Cancel"} page={"global"} />
            </AlertDialogCancel>
            <AlertDialogAction
              disabled = {isPending}
              onClick={() => {
                signOut()
              }}
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

export default LogoutBtn