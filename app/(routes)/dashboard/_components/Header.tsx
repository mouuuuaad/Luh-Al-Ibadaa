import { Button } from '@/components/ui/button';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { Search, Send } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

function Header() {
    const { user }: any = useKindeBrowserClient();

    return (
        <div className='flex justify-end w-full gap-3 items-center'>
            {/* Search Bar */}
            

            {/* User Avatar */}
            <div className='relative h-8 w-8 rounded-full border-2 border-purple-200 shadow-sm'>
                <Image
                    src={user?.picture}
                    alt='user'
                    fill
                    className='rounded-full object-cover'
                />
            </div>

            {/* Invite Button */}
            <div className="relative group">
                <Button className='gap-2 flex text-sm py-2 px-4 h-9 bg-blue-600 text-white shadow-lg hover:shadow-purple-200/40
                                transition-all duration-300'>
                    <Send className='h-4 w-4' /> 
                    <span>Invite</span>
                </Button>
                <div className="absolute -top-2 -right-3 bg-teal-500 text-white text-[9px] font-medium px-2 py-1 
                             rounded-full shadow-md border border-teal-600/50 transition-transform group-hover:scale-105">
                    Coming Soon
                </div>
            </div>
        </div>
    );
}

export default Header;