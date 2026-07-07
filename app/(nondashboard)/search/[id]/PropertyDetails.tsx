import { useGetPropertyQuery } from '@/app/asset-download/asset-download/client/state/api'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AmenityIcons, HighlightIcons } from '@/lib/constants'
import { formatEnumString } from '@/lib/utils'
import { HelpCircle, MapPin, Star } from 'lucide-react'
import React from 'react'

const PropertyDetails = ({ propertyId}: PropertyDetailsProps) => {
   const {
    data: property,
    isError,
    isLoading
   } = useGetPropertyQuery(propertyId)
   
   if (isLoading) return <>Loading...</>
   if(isError || !property) return <>Property not found</> 
  
    return (
    <div className='mb-6'>
      
    </div>
    )
  
}

export default PropertyDetails