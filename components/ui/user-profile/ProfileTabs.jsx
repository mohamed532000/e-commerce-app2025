"use client"
import React, { useState } from 'react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../tabs";
import HandleTranslate from '@/helper/HandleTranslate';
import EmptyData from '../data-status/EmptyData';
import UserInformationForm from '@/app/forms/user/UserInformationForm';
import { useLocale } from 'next-intl';
import { UserAuth } from '@/context/AuthProvider';
function ProfileTabs() {
  const {profile , profileLoading} = UserAuth();
  const [activeTab , setActiveTab] = useState("updateDataForm")
  const currentLocale = useLocale();
  return (
    <div className="flex w-full relative flex-col gap-6">
    <Tabs value={activeTab} onValueChange={(value) => {
      setActiveTab(value)
    }}
    dir={currentLocale === "ar" ? "rtl" : "ltr"}
    >
        <TabsList className={"bg-background border-b border-slate-300 rounded-none w-full relative"}>
            <TabsTrigger value="updateDataForm" className={"rounded-sm cursor-pointer"}>
              <HandleTranslate word={"Update data"} page={"global"} />
            </TabsTrigger>
            <TabsTrigger value="orders" className={"rounded-sm cursor-pointer"}>
                <HandleTranslate word={"Orders"} page={"global"} />
            </TabsTrigger>
        </TabsList>
        <TabsContent  value="updateDataForm" className={"flex flex-col"}>
            <UserInformationForm profileData={profile}/>
        </TabsContent>
        <TabsContent value="orders">
            Orders table here
        </TabsContent>
    </Tabs>
</div>
  )
}
export default ProfileTabs