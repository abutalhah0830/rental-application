"use client"

import { useGetAuthUserQuery, useUpdateManagerSettingsMutation, useUpdateTenantSettingsMutation } from '@/app/asset-download/asset-download/client/state/api'
import SettingsForm from '@/components/SettingsForm'
import React from 'react'

const ManagerSettings = () => {
    const { data: authUser, isLoading} = useGetAuthUserQuery()
    console.log('authUser:', authUser)
    const [updateManager] = useUpdateManagerSettingsMutation()

    if(isLoading) return <>Loading...</>

    const initialData = {
        name: authUser?.userInfo?.name ,
        email: authUser?.userInfo?.email ,
        phoneNumber: authUser?.userInfo?.phoneNumber ,
    }

    const handleSubmit = async (data: typeof initialData) => {
        await updateManager({
            cognitoId : authUser?.cognitoInfo?.userId,
            ...data,
        })
    }
   console.log('initialData:', JSON.stringify(initialData))
  
  
    return (
        <SettingsForm
        initialData={initialData}
        onSubmit={handleSubmit}
        userType='manager'
        />
    )
  
}

export default ManagerSettings