"use client"
import React from 'react'
import { Bell, Menu, Moon, Settings, Sun } from 'lucide-react'
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/app/redux';
import { setIsDarkMode, setIsSidebarCollapsed } from '@/app/state';
import Image from 'next/image';
const Navbar = () => {
    const dispatch = useAppDispatch();
    const isSidebarCollapsed = useAppSelector((state)=> state.global.isSidebarCollapsed);
    const toggleSidebar = () => {
      dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
    }
  
    const isSDarkMode = useAppSelector((state)=> state.global.isDarkMode)
    const toggleDarkMode = () => {
        dispatch(setIsDarkMode(!isSDarkMode));
      }
    // const sidebarClassNames = `fixed flex flex-col ${
    //     isSidebarCollapsed ? "w-0 md:w-16" : "w-72 md:w-64"
    // } bg-white transition-all duration-300 overflow-hidden h-full`

  return (
    <div className='flex justify-between items-center w-full mb-7'>
        <div className='flex justify-between items-center gap-5'>
            <button className='px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-10' onClick={toggleSidebar}>
            <Menu className='w-4 h-4'/>
            </button>
        
        <div className='relative'>
            <input type='search' placeholder='Start typing to search groups and projects' className='pl-10 pr-4 py-2 w-50 md:w-60 border-2 border-gray-300 bg-white rounded-lg focus:outline-none focus:border-blue-500'/>
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none '>
            <Bell className='text-gray-500'/>
            </div>
        </div>
        </div>
        <div className='flex justify-between items-center gap-5 '>
            <div className="hidden md:flex justify-between items-center gap-5">
                <div>
                    <button onClick={toggleDarkMode}>
                        {isSDarkMode ? (<Sun className='cursor-pointer text-gray-500' size={24}/>) : (<Moon className='cursor-pointer text-gray-500' size={24}/>)}                    </button>
                </div>
                <div className="relative">
                    <Bell className='cursor-pointer text-gray-500' size={24}/>
                    <span className='absolute -top-2 inline-flex items-center justify-center px-[0.4rem] py-1 text-xs font-semibold leading-none text-red-100 bg-red-400 rounded-full '>3</span>
                </div>
                <hr className='w-0 h-7 border border-solid border-l border-gray-300 mx-3' />
                <div className="flex -tems-cener gap-3 cursor-pointer">
                    <div className="w-9 h-9">
                        <Image src="https://nj-inventory-management-1.s3.af-south-1.amazonaws.com/profile.jpg"
                        alt="Profile"
                        width={50}
                        height={50}
                        className="rounded-full h-full object-cover" />
                    </div>
                    <span className='font-semibold'> Nick J</span>
                </div>
            </div>
            <Link href='/settings'>
            <Settings className='cursor-pointer text-gray-500' size={24}/>
            </Link>
        </div>
    </div>
  )
}

export default Navbar