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

function AttributeItem({attr , value , parentTabName , activeTab , index}) {
  return (
    <div className={`relative py-2 flex items-center border-b border-slate-200 w-full gap-x-1 ${parentTabName === activeTab ? "fade-in" : ""}`}
    style={{ animationDelay: `${index * 100}ms` }}
    >
        <span>{attr}</span>
        :
        <span>{value}</span>
    </div>
  )
}
function DetailsTabs({item}) {
  const [activeTab , setActiveTab] = useState("description")
  return (
    <div className="flex w-full relative flex-col gap-6">
    <Tabs value={activeTab} onValueChange={(value) => {
      setActiveTab(value)
    }}>
        <TabsList className={"bg-background border-b border-slate-300 rounded-none w-full relative"}>
            <TabsTrigger value="description" className={"rounded-sm cursor-pointer"}>
              <HandleTranslate word={"Description"} page={"global"} />
            </TabsTrigger>
            <TabsTrigger value="attributes" className={"rounded-sm cursor-pointer"}>
                <HandleTranslate word={"Attributes"} page={"global"} />
            </TabsTrigger>
        </TabsList>
        <TabsContent value="attributes" className={"flex flex-col"}>
            {
                Object.keys(item?.attributes)?.length >= 1
                ?
                Object.entries(item?.attributes).map(([key , value] , index) => <AttributeItem key={index} attr={key} value={value} parentTabName={"attributes"} activeTab={activeTab} index={index}/>)
                :
                <EmptyData emptyText={"No attributes for this item"} className={"my-3"}/>
            }
        </TabsContent>
        <TabsContent value="description">
            {
              <p className={`${activeTab === "description" ? "fade-in" : ""}`}
              style={{ animationDelay: `100ms` }}
              >
                {item?.description}
              </p>
            }
        </TabsContent>
    </Tabs>
</div>
  )
}
export default DetailsTabs