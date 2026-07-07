"use client";

import Navbar from '@/components/Navbar'
import { SidebarProvider, useSidebar } from '@/components/ui/sidebar'
import Sidebar from "@/components/AppSidebar"
import { NAVBAR_HEIGHT } from '@/lib/constants'
import React, { useEffect, useState } from 'react'
import { useGetAuthUserQuery } from '../asset-download/asset-download/client/state/api'
import { usePathname, useRouter } from 'next/navigation';

type UserType = 'manager' | 'tenant';

// Add this inside layout.tsx above DashboardLayout
const DashboardContent = ({ children, userType }: { children: React.ReactNode, userType: UserType }) => {
    const { open } = useSidebar();
    
    return (
        <main className='flex'>
            <Sidebar userType={userType} />
            <div 
                className='flex-grow transition-all duration-300'
                style={{
                    marginLeft: open ? '16rem' : '10rem'  // 256px expanded, 48px collapsed
                }}
            >
                {children}
            </div>
        </main>
    )
}

const DashboardLayout = ({ children }: {children: React.ReactNode}) => {
    const { data: authUser, isLoading: authLoading } = useGetAuthUserQuery();
    const router = useRouter();
    const pathname = usePathname();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (authUser) {
            const userRole = authUser.userRole?.toLowerCase();
            if(
                (userRole === "manager" && pathname.startsWith("/tenants")) ||
                (userRole === "tenants" && pathname.startsWith("/managers"))
            ) {
                router.push(
                    userRole === "manager"
                    ? "/managers/properties"
                    : "/tenants/favorites",
                   { scroll : false}
                )
            } else{
               setIsLoading(false)   
            }
        }
    }, [authUser, router, pathname]);

    if (authLoading || isLoading) return <>Loading...</>  
    if(!authUser?.userRole) return null;

    return (
    <SidebarProvider>
        <div className='min-h-screen w-full bg-primary-100'>
        <Navbar/>
        <div style ={{ paddingTop: `${NAVBAR_HEIGHT}px`}}>
           <DashboardContent userType={authUser.userRole.toLowerCase()}>
                    {children}
                </DashboardContent>
        </div>
    </div>
    </SidebarProvider>
  )
}

export default DashboardLayout