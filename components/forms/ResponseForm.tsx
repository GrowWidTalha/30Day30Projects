"use client"
import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { createAnswer } from '@/actions/answers.actions'
import { User } from '@clerk/nextjs/server'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
const formSchema = z.object({
    githubUrl: z.string().url({ message: "Invalid url"}),
    linkedinUrl: z.string().optional(),
    deployedUrl: z.string().url({message: "Invalid Url"}),
  })
const ResponseForm = ({challengeId, userId}: {challengeId: string, userId: string}) => {
const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      githubUrl: "",
      linkedinUrl: "",
      deployedUrl: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    try {
        const solution = {
            userId: userId,
            challengeId: challengeId,
            githubUrl: values.githubUrl,
            linkedinUrl: values.linkedinUrl,
            deployedUrl: values.deployedUrl
        }
        const data = await createAnswer(solution)
        if(data){
            toast.success("Response submitted successfully.")
            router.refresh()
        }
    } catch (error) {
        toast.error(`Something went wrong: ${error}`)

        console.log("error submitting response form: ", error)
    }
    setIsSubmitting(false)
  }
  return (
    <Card className="w-full max-w-4xl mx-auto mt-8">
        <CardHeader>
          <CardTitle>Submit Your Solution</CardTitle>
          <CardDescription>Share your solution to this challenge</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="githubUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Github URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://github.com/username/reponame"
                        // className="min-h-[200px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="deployedUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deployed URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://project.vercel.app/"
                        // className="min-h-[200px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="linkedinUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Linkedin Post URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://linkedin.com/username/post"
                        // className="min-h-[200px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit solution'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
  )
}

export default ResponseForm
