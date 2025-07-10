"use client"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertCircle, ArrowLeft, MailIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function VerifyEmail() {
    const router = useRouter()
  return (
    <Card className='min-w-xs lg:min-w-sm'>
        <CardHeader className='flex flex-col gap-3 items-center'>
            <div className='bg-purple-100 text-purple-600 p-4 rounded-full w-fit mx-auto'>
                <MailIcon className='size-12' />
            </div>
            <CardTitle className='text-xl font-semibold'>Check your email</CardTitle>
            <CardDescription className='text-center'>We have send a verification link to your email address.</CardDescription>
        </CardHeader>
        <CardContent className='grid gap-6'>
            <div className='flex items-center gap-2 p-4 bg-yellow-50 text-yellow-600 rounded-lg'>
                <AlertCircle/>
                <span>Check your spam folder too.</span>
            </div>
            <Button onClick={()=> router.back()} variant={"outline"} className='w-full cursor-pointer'>
                <ArrowLeft className='size-4'/>
                Back to Login
            </Button>
        </CardContent>
    </Card>
  )
}
