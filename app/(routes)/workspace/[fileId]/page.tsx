"use client"
import React, { useEffect, useState } from 'react'
import WorkspaceHeader from '../_components/WorkspaceHeader'
import Editor from '../_components/Editor'
import { useConvex } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { FILE } from '../../dashboard/_components/FileList';
import Canvas from '../_components/Canvas';

function Workspace({params}:any) {
   const [triggerSave,setTriggerSave]=useState(false);
   const convex=useConvex();
   const [fileData,setFileData]=useState<FILE|any>();
   
   useEffect(()=>{
    console.log("FILEID",params.fileId)
    params.fileId&&getFileData();
   },[])

   const getFileData=async()=>{
    const result=await convex.query(api.files.getFileById,{_id:params.fileId})
    setFileData(result);
  }

  return (
    <div className='h-screen flex flex-col'>
      <WorkspaceHeader onSave={()=>setTriggerSave(!triggerSave)} />

      {/* Responsive Workspace Layout */}
      <div className='flex-1 grid grid-cols-1 md:grid-cols-4'>
        {/* Document - Top on mobile (25% width on desktop) */}
        <div className='order-2 md:order-1 h-[40vh] md:h-full md:col-span-1 overflow-auto border-t md:border-r'>
          <Editor 
            onSaveTrigger={triggerSave}
            fileId={params.fileId}
            fileData={fileData}
          />
        </div>

        {/* Canvas - Top on mobile (75% width on desktop) */}
        <div className='order-1 md:order-2 h-[60vh] md:h-full md:col-span-3 border-l'>
          <Canvas
            onSaveTrigger={triggerSave}
            fileId={params.fileId}
            fileData={fileData}
          />
        </div>
      </div>
    </div>
  )
}

export default Workspace