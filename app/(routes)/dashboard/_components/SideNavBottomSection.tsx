import { Button } from '@/components/ui/button';
import { Archive, Flag, Github } from 'lucide-react';
import React, { useState } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import Constant from '@/app/_constant/Constant';
import PricingDialog from './PricingDialog';

function SideNavBottomSection({ onFileCreate, totalFiles }: any) {
  const menuList = [
    {
      id: 1,
      name: 'Getting Started',
      icon: Flag,
      path: '',
      badge: true,
    },
    {
      id: 2,
      name: 'Github',
      icon: Github,
      path: '',
      badge: true,
    },
    {
      id: 3,
      name: 'Archive',
      icon: Archive,
      path: '',
      badge: true,
    }
  ];

  const [fileInput, setFileInput] = useState('');

  return (
    <div className="space-y-6">
      {/* Menu List */}
      <div className="flex flex-col gap-2">
        {menuList.map((menu) => (
          <div
            key={menu.id}
            className="relative  flex items-center gap-3 p-3 text-sm rounded-lg cursor-pointer 
                     hover:bg-gray-50/50 transition-colors group border hover:border-gray-200"
          >
            <menu.icon className="h-5 w-5 text-blue-600" />
            <span className="text-gray-700 font-medium">{menu.name}</span>
            {menu.badge && (
              <span className="absolute -top-1.5 -right-1.5 bg-teal-500 text-white text-[8px] px-2 py-0.5 
                             rounded-full shadow-sm border border-teal-600">
                Coming Soon
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Add New File Button */}
      <Dialog>
        <DialogTrigger className="w-full" asChild>
          <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-600 hover:from-blue-700 
                           hover:to-purple-700 text-white shadow-lg hover:shadow-blue-500/30 transition-all">
            <span className="bg-white/10 p-1 rounded-lg mr-2">✨</span>
            New File
          </Button>
        </DialogTrigger>
        {totalFiles < Constant.MAX_FREE_FILE ? (
          <DialogContent className="rounded-xl border-0 shadow-xl">
            <DialogHeader>
              <DialogTitle className="text-gray-800">Create New File</DialogTitle>
              <DialogDescription className="mt-3">
                <Input
                  placeholder="Enter File Name"
                  className="focus-visible:ring-2 focus-visible:ring-blue-500 border-gray-200"
                  onChange={(e) => setFileInput(e.target.value)}
                />
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="mt-4">
              <DialogClose asChild>
                <Button
                  className="bg-gradient-to-r from-blue-600 to-blue-600 hover:from-blue-700 
                           hover:to-purple-700 text-white"
                  disabled={!(fileInput && fileInput.length > 3)}
                  onClick={() => onFileCreate(fileInput)}
                >
                  Create
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        ) : (
          <PricingDialog />
        )}
      </Dialog>

      {/* Progress Bar */}
      <div className="space-y-3">
        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-blue-500 rounded-full transition-all duration-500"
            style={{ width: `${(totalFiles / Constant.MAX_FREE_FILE) * 100}%` }}
          ></div>
        </div>

        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-500">
            <strong className="text-gray-700">{totalFiles}</strong> files used
          </span>
          <span className="text-gray-500">
            <strong>{Constant.MAX_FREE_FILE}</strong> limit
          </span>
        </div>

        <div className="text-xs text-blue-600 font-medium flex items-center gap-1">
          ⚡ Upgrade for unlimited access
        </div>
      </div>
    </div>
  );
}

export default SideNavBottomSection;