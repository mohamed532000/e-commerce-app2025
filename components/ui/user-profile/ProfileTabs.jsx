"use client"
import React, { useState } from 'react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../tabs";
import HandleTranslate from '@/helper/HandleTranslate';
import UserInformationForm from '@/app/forms/user/UserInformationForm';
import { useLocale } from 'next-intl';
import { UserAuth } from '@/context/AuthProvider';
import SecurityForm from '@/app/forms/user/SecurityForm';
import { FaUserLock } from "react-icons/fa";
import { CiUser } from "react-icons/ci";
import { FaPeopleCarryBox } from "react-icons/fa6";

function ProfileTabs() {
  const {profile} = UserAuth();
  const [activeTab , setActiveTab] = useState("info")
  const currentLocale = useLocale();
  return (
    <div className="flex w-full relative flex-col gap-6">
    <Tabs value={activeTab} onValueChange={(value) => {
      setActiveTab(value)
    }}
    dir={currentLocale === "ar" ? "rtl" : "ltr"}
    >
        <TabsList className={"bg-background border-b border-slate-300 rounded-none w-full relative"}>
            <TabsTrigger value="info" className={"rounded-sm cursor-pointer"}>
              <CiUser/>
              <><HandleTranslate word={"Info"} page={"global"} />..</>
            </TabsTrigger>
            <TabsTrigger value="orders" className={"rounded-sm cursor-pointer"}>
              <FaPeopleCarryBox/>
              <HandleTranslate word={"Orders"} page={"global"} />
            </TabsTrigger>
            <TabsTrigger value="security" className={"rounded-sm cursor-pointer"}>
              <FaUserLock/>
              <HandleTranslate word={"Security"} page={"global"} />
            </TabsTrigger>
        </TabsList>
        <TabsContent  value="info" className={"flex flex-col"}>
            <UserInformationForm 
            profileData={profile} 
            style = {{animationDelay : "100ms"}} 
            className={`${activeTab === "info" ? "fade-up" : ""} transition-all duration-500`}
            />
        </TabsContent>
        <TabsContent value="orders">
            <h2>Orders here</h2>
        </TabsContent>
        <TabsContent value="security">
            <SecurityForm 
            profileData={profile} 
            style = {{animationDelay : "100ms"}} 
            className={`${activeTab === "security" ? "fade-up" : ""} transition-all duration-500`} 
            />
        </TabsContent>
    </Tabs>
</div>
  )
}
export default ProfileTabs