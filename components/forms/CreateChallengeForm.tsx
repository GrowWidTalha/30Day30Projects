'use client'

import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import dynamic from 'next/dynamic'
import dayjs from 'dayjs'
import { createChallenge, updateChallenge } from '@/actions/challenge.actions'
import SubmitButton from '../submitButton'
import { useRouter } from 'next/navigation'
import { Challenge } from '@/lib/types.appwrite'
import { toast } from 'sonner'

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false })

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  dayNo: z.string().min(1, 'Day no is required'),
  briefDescription: z.string().min(1, 'Brief description is required'),
  completeDescription: z.string().min(1, 'Complete description is required'),
  startDate: z.date(),
  endDate: z.date(),
})

type ChallengeFormProps = {
  type: 'create' | "update",
  challenge?: Challenge
}

export default function ChallengeForm({ type, challenge }: ChallengeFormProps) {
    const router = useRouter()
  const [mdValue, setMdValue] = useState(challenge ? challenge.completeDescription : "")
  const [isLoading, setisLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: challenge ? challenge.name : "",
      dayNo: challenge ? challenge.DayNo : "",
      briefDescription: challenge ? challenge.name : "",
      completeDescription: challenge ? challenge.name : "",
      startDate:challenge ? challenge.startDate : new Date() ,
      endDate:challenge ? challenge.endDate :  new Date(),
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setisLoading(true)
    try {
        console.log(values)
        if(type === "create"){
            const challengeData = {
            dayNo: values.dayNo,
                name: values.name,
                briefDescription: values.briefDescription,
                completeDescription: values.completeDescription,
                startDate: values.startDate,
                endDate: values.endDate,
            }
            const doc = await createChallenge(challengeData)
            if(doc) {
        toast.success("Challenge created successfully")

                router.push(`/app/challenge/${doc.$id}`)
            }
        }
    if(type === 'update' && challenge){
        const challengeData = {
            dayNo: values.dayNo,
            name: values.name,
            briefDescription: values.briefDescription,
            completeDescription: values.completeDescription,
            startDate: values.startDate,
            endDate: values.endDate,
        }
        toast.success("Challenge Updated successfully")
        const doc = await updateChallenge(challenge?.$id, challengeData)
        if(doc) router.push(`/app/challenge/${doc.$id}`)
    }

    } catch (error) {
        console.log("error submitting form", error)
    }
    setisLoading(false)
}

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Create Challenge</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Day no
                </label>
                <Input
                  id="dayNo"
                  {...form.register('dayNo')}
                  placeholder="Enter Day no eg. Day 1"
                />
                {form.formState.errors.name && (
                  <p className="text-sm text-red-500">{form.formState.errors.name.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Challenge Name
                </label>
                <Input
                  id="name"
                  {...form.register('name')}
                  placeholder="Enter challenge name"
                />
                {form.formState.errors.name && (
                  <p className="text-sm text-red-500">{form.formState.errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="briefDescription" className="text-sm font-medium">
                  Brief Description
                </label>
                <Textarea
                  id="briefDescription"
                  {...form.register('briefDescription')}
                  placeholder="Enter a brief description"
                />
                {form.formState.errors.briefDescription && (
                  <p className="text-sm text-red-500">{form.formState.errors.briefDescription.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Complete Description (Markdown)</label>
                <MDEditor
                  value={mdValue}
                  onChange={(val) => {
                    setMdValue(val || '')
                    form.setValue('completeDescription', val || '')
                  }}
                />
                {form.formState.errors.completeDescription && (
                  <p className="text-sm text-red-500">{form.formState.errors.completeDescription.message}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Start Date</label>
                  <Controller
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <DatePicker
                        value={dayjs(field.value)}
                        format='YYYY-MM-DD'
                        onChange={(newValue) => field.onChange(newValue?.toDate())}
                        slotProps={{
                          textField: {
                            variant: 'outlined',
                            fullWidth: true,
                            error: !!form.formState.errors.startDate,
                            helperText: form.formState.errors.startDate?.message,
                          },
                        }}
                      />
                    )}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">End Date</label>
                  <Controller
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <DatePicker
                        value={dayjs(field.value)}

                        format='YYYY-MM-DD'
                        onChange={(newValue) => field.onChange(newValue?.toDate())}
                        slotProps={{
                          textField: {
                            variant: 'outlined',
                            fullWidth: true,
                            error: !!form.formState.errors.endDate,
                            helperText: form.formState.errors.endDate?.message,
                          },
                        }}
                      />
                    )}
                  />
                </div>
              </div>
              <SubmitButton isLoading={isLoading}>Create Challenge</SubmitButton>
            </form>
          </Form>
        </CardContent>
      </Card>
    </LocalizationProvider>
  )
}
