"use server"
import { clerkClient } from '@clerk/nextjs/server'

export const getUserById = async (userId: string) => {
   try {
        const user = await clerkClient.users.getUser(userId)
        return user
   } catch (error) {
       console.log("error fetching user by userId", error)
   }
}
