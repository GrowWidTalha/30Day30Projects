"use server";
import { ANSWERS_COLLECTION_ID, CHALLENGES_COLLECTION_ID, DATABASE_ID, databases } from "@/appwrite.config";
import { Challenge } from "@/lib/types.appwrite";
import { parseStringify } from "@/lib/utils";
import { revalidatePath } from "next/cache"; // Correct import for revalidatePath
import { ID, Query } from "node-appwrite";

// Create a challenge and revalidate paths related to challenges
export const createChallenge = async ({ dayNo, briefDescription, completeDescription, startDate, endDate, name }: createChallengeProps) => {
  try {
    const document = await databases.createDocument(
      DATABASE_ID!,
      CHALLENGES_COLLECTION_ID!,
      ID.unique(),
      {
        name: name,
        briefDescription: briefDescription,
        completeDescription: completeDescription,
        startDate: startDate,
        endDate: endDate,
        DayNo: dayNo,
        numberOfResponses: 0
      }
    );

    // Revalidate paths related to challenges
    revalidatePath("/app");
    revalidatePath("/app/challenge/[challengeId]");
    revalidatePath("/admin");

    return parseStringify(document);
  } catch (error) {
    console.log("Error creating challenge: ", error);
  }
};

// Fetch all challenges
export const getAllChallenges = async () => {
  try {
    const documents = await databases.listDocuments(
      DATABASE_ID!,
      CHALLENGES_COLLECTION_ID!,
      [Query.orderDesc("startDate")]
    );

    return parseStringify(documents.documents);
  } catch (error) {
    console.log("Error occurred while fetching all challenges: ", error);
  }
};

// Delete a challenge by ID and revalidate paths
export const deleteChallengeById = async (id: string) => {
  try {
    const document = await databases.deleteDocument(
      DATABASE_ID!,
      CHALLENGES_COLLECTION_ID!,
      id
    );

    // Revalidate paths related to challenges
    revalidatePath("/admin");
    revalidatePath(`/app/challenge/[challengeId]`);
    revalidatePath(`/app`);

    return parseStringify(document);
  } catch (error) {
    console.log("Error occurred while deleting challenge: ", error);
  }
};

// Update a challenge and revalidate paths
export const updateChallenge = async (id: string, challenge: createChallengeProps) => {
  try {
    const document = await databases.updateDocument(
      DATABASE_ID!,
      CHALLENGES_COLLECTION_ID!,
      id,
      challenge
    );

    // Revalidate paths related to challenges
    revalidatePath("/admin");
    revalidatePath(`/challenge/${id}`);
revalidatePath("/app")
    return parseStringify(document);
  } catch (error) {
    console.log("Error occurred while updating challenge: ", error);
  }
};

// Get a challenge by ID
export const getChallengeById = async (id: string) => {
  try {
    const document = await databases.getDocument(
      DATABASE_ID!,
      CHALLENGES_COLLECTION_ID!,
      id
    );

    return parseStringify(document);
  } catch (error) {
    console.log("Error occurred while getting challenge by ID: ", error);
  }
};

// Update the response count for a challenge
export const UpdateResponseCount = async (challengeId: string) => {
  try {
    const challenge = await getChallengeById(challengeId);
    if (challenge) {
      await databases.updateDocument(
        DATABASE_ID!,
        CHALLENGES_COLLECTION_ID!,
        challengeId,
        {
          numberOfResponses: challenge.numberOfResponses + 1
        }
      );

      // Revalidate the specific challenge path after updating response count
      revalidatePath(`/challenge/${challengeId}`);
      revalidatePath(`/admin`);
    }
  } catch (error) {
    console.log("Error updating response count: ", error);
  }
};
