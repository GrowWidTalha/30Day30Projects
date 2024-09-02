
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FilePen, Trash2, Users } from "lucide-react"
import DeleteConfirmationModal from "./DeleteConfirmationModal"
import { redirect } from "next/navigation"
import Link from "next/link"

export default function Component({ name, description, responses, id }: ChallengeCardProps) {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Add any additional content here if needed */}
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="flex space-x-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href={`/admin/update/${id}`}>
            <FilePen className="h-4 w-4" />
            <span className="sr-only">Edit</span>
            </Link>
          </Button>
          <DeleteConfirmationModal challengeId={id}>
            <Button variant="ghost" size="icon">
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Delete</span>
            </Button>
          </DeleteConfirmationModal>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Users className="mr-1 h-4 w-4" />
          <span>{responses ? responses : 0 }</span>
        </div>
      </CardFooter>
    </Card>
  )
}
