import { FileListContext } from '@/app/_context/FilesListContext'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { Archive, MoreHorizontal } from 'lucide-react';
import moment from 'moment';
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from 'next/navigation';

export interface FILE{
  archive:boolean,
  createdBt:string,
  document:string,
  fileName:string,
  teamId:string,
  whiteboard:string,
  _id:string,
  _creationTime:number
}
function FileList() {

  const {fileList_,setFileList_}=useContext(FileListContext);
  const [fileList,setFileList]=useState<any>();
  const {user}:any=useKindeBrowserClient();
  const router=useRouter();
  useEffect(()=>{
    fileList_&&setFileList(fileList_);
    console.log(fileList_);
  },[fileList_])

  return (
    <div className='mt-10'>
      <div className="overflow-x-auto rounded-lg border shadow-sm">
        <table className="min-w-full divide-y divide-gray-200 bg-white text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">File Name</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Created At</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Edited</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Author</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900"></th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {fileList&&fileList.map((file:FILE,index:number)=>(
              <tr 
                key={index} 
                className="transition-colors hover:bg-gray-50/50 cursor-pointer"
                onClick={()=>router.push('/workspace/'+file._id)}
              >
                <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
                  {file.fileName}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-gray-600">
                  {moment(file._creationTime).format('DD MMM YYYY')}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-gray-600">
                  {moment(file._creationTime).format('DD MMM YYYY')}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-gray-600">
                  {user&& <Image 
                    src={user?.picture}
                    alt='user'
                    width={32}
                    height={32}
                    className='rounded-full border-2 border-white shadow-sm'
                  />}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-gray-600">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="hover:bg-gray-100 p-1 rounded-lg">
                      <MoreHorizontal className="h-5 w-5 text-gray-400"/>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="rounded-lg shadow-lg border">
                      <DropdownMenuItem className="gap-3 px-4 py-2 hover:bg-gray-50">
                        <Archive className="h-4 w-4 text-gray-600"/>
                        <span className="text-gray-700">Archive</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default FileList