"use server"
import { ANSWERS_COLLECTION_ID, CHALLENGES_COLLECTION_ID, DATABASE_ID, databases } from "@/appwrite.config";
import { parseStringify } from "@/lib/utils";
import { ID, Query } from "node-appwrite";
import { UpdateResponseCount } from "./challenge.actions";
import { revalidatePath } from "next/cache"; // Import revalidatePath

export const createAnswer = async (answer: createAnswerProps) => {
  try {
    const ans = await databases.createDocument(
      DATABASE_ID!,
      ANSWERS_COLLECTION_ID!,
      ID.unique(),
      {
        userId: answer.userId,
        challenge: answer.challengeId,
        githubUrl: answer.githubUrl,
        linkedinUrl: answer.linkedinUrl,
        deployedUrl: answer.deployedUrl,
      }
    );

    await UpdateResponseCount(answer.challengeId);

    // Revalidate paths related to challenges and responses
    revalidatePath(`/challenge`);
    revalidatePath(`/myresponses`);

    return parseStringify(ans);
  } catch (error) {
    console.log("Error While creating answer: ", error);
  }
};

export const getAllResponsesBYUserId = async (userId: string) => {
  try {
    const document = await databases.listDocuments(
      DATABASE_ID!,
      ANSWERS_COLLECTION_ID!,
      [Query.equal("userId", userId)]
    );
    return parseStringify(document);
  } catch (error) {
    console.log("error getting all responses by user ID", error);
  }
};

export const getAllResponses = async () => {
  try {
    const document = await databases.listDocuments(
      DATABASE_ID!,
      ANSWERS_COLLECTION_ID!
    );
    return parseStringify(document);
  } catch (error) {
    console.log("error getting all responses", error);
  }
};

export const getResponseByUserId = async (userId: string, challengeId: string) => {
  try {
    const document = await databases.listDocuments(
      DATABASE_ID!,
      ANSWERS_COLLECTION_ID!,
      [Query.equal("userId", userId), Query.equal("challenge", challengeId)]
    );
    return parseStringify(document.documents);
  } catch (error) {
    console.log("error getting all responses by user ID", error);
  }
};
