
import * as sdk from "node-appwrite";

export const {
  NEXT_PUBLIC_ENDPOINT: ENDPOINT,
  NEXT_PUBLIC_PROJECT_ID: PROJECT_ID,
  API_KEY,
  DATABASE_ID,
  CHALLENGES_COLLECTION_ID,
  ANSWERS_COLLECTION_ID,
} = process.env;

const client = new sdk.Client();

client.setEndpoint("https://cloud.appwrite.io/v1").setProject(PROJECT_ID!).setKey(API_KEY!);

export const databases = new sdk.Databases(client);
