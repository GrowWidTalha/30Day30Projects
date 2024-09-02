import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import ReactMarkdown from "react-markdown";
  import { ArrowLeft } from "lucide-react";
  import Link from "next/link";
  import { getChallengeById } from "@/actions/challenge.actions";
  import ResponseForm from "@/components/forms/ResponseForm";
  import { currentUser } from "@clerk/nextjs/server";
  import { getResponseByUserId } from "@/actions/answers.actions";
  import { redirect } from "next/navigation";
  import ResponseCard from "@/components/ResponseCard";

  export default async function ChallengeDetailsPage({
    params: { challengeId },
  }: SearchParamProps) {
    const id = decodeURIComponent(challengeId);
    const challenge = await getChallengeById(id);
    const user = await currentUser();

    if (!user) redirect("/");

    const response = await getResponseByUserId(user?.id, id);

    // Check if the response array exists and has elements
    const hasResponse = response && response.length > 0;

    return (
      <>
          <Link
            href="/app"
            className="inline-flex items-center text-primary hover:underline mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        <div className="min-h-screen bg-background p-8 flex flex-col items-center">

          <Card className="w-full max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-3xl">
                Day {challenge.DayNo}: {challenge.name}
              </CardTitle>
              <CardDescription>Challenge Details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="prose dark:prose-invert max-w-none">
                <ReactMarkdown>{challenge.completeDescription}</ReactMarkdown>
              </div>
            </CardContent>
          </Card>

          <div className="w-full max-w-4xl mt-8 flex justify-center">
            {!hasResponse ? (
              <ResponseForm challengeId={id} userId={user?.id!} />
            ) : (
              <Card className="rounded-lg w-full shadow-lg">
                <CardHeader className="p-4">
                  <CardTitle className="flex items-center">
                    <span className="text-lg font-semibold">Your Response</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 bg-white">
                  <ResponseCard answer={response[0]} />
                  <div className="flex justify-end gap-4 mt-4">
                    <Link
                      href="/app"
                      className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary-hover rounded-lg"
                    >
                      View More Challenges
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </>
    );
  }
