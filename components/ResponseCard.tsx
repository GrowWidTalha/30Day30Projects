
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Answers } from "@/lib/types.appwrite"
import { formatDateTime } from "@/lib/utils"
import { CalendarIcon, GithubIcon, GlobeIcon, LinkedinIcon, TrophyIcon } from "lucide-react"
import Link from "next/link"

export default function ResponseCard({ answer}: { answer: Answers}) {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Submission Details</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-[auto_1fr] items-center gap-2">
          <TrophyIcon className="w-5 h-5 text-primary" />
          <div>
            <p className="font-medium">{answer.challenge.name}</p>

          </div>
        </div>
        <div className="grid grid-cols-[auto_1fr] items-center gap-2">
          <GithubIcon className="w-5 h-5 text-primary" />
          <Link href="#" className="text-primary hover:underline" prefetch={false}>
            {answer.githubUrl}
          </Link>
        </div>
        <div className="grid grid-cols-[auto_1fr] items-center gap-2">
          <LinkedinIcon className="w-5 h-5 text-primary" />
          <Link href="#" className="text-primary hover:underline" prefetch={false}>
            {answer.linkedinUrl ? answer.linkedinUrl : "N/A"}
          </Link>
        </div>
        <div className="grid grid-cols-[auto_1fr] items-center gap-2">
          <GlobeIcon className="w-5 h-5 text-primary" />
          <Link href="#" className="text-primary hover:underline" prefetch={false}>
            {answer.deployedUrl}
          </Link>
        </div>
        <div className="grid grid-cols-[auto_1fr] items-center gap-2">
          <CalendarIcon className="w-5 h-5 text-primary" />
          <p>Submitted on {formatDateTime(answer.$createdAt).dateOnly}</p>
        </div>
      </CardContent>
    </Card>
  )
}
