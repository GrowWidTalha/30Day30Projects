
import { Models } from "node-appwrite";

export interface Challenge extends Models.Document {
    DayNo: string,
    name: string,
    briefDescription: string,
    completeDescription: string,
    startDate: Date,
    endDate: Date,
    numberOfResponses: number
}
export interface Answers extends Models.Document {
    challenge: Challenge;
    githubUrl: string;
    linkedinUrl: string;
    deployedUrl: string;
    numberOfResponses: string
}
