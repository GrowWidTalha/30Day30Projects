interface ChallengeCardProps {
    name: string,
    description: string,
    id: string,
    responses: number,
}

interface createChallengeProps {
    name: string,
    briefDescription: string,
    completeDescription: string,
    startDate: Date,
    endDate: Date,
    dayNo: string,
}

declare type SearchParamProps = {
    params: { [key: string]: string };
    searchParams: { [key: string]: string | string[] | undefined };
  };

interface createAnswerProps {
    userId: string,
    challengeId: string,
    githubUrl: string,
    linkedinUrl?: string,
    deployedUrl: string,
}
