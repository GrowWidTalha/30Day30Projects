// "use client"
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/navbar";
import { useClerk } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { auth, currentUser } from "@clerk/nextjs/server";
// import { useRouter } from "next/navigation";

export default function Component() {
    // const router = useRouter()
    const { userId, } = auth()
    if(userId) redirect("/app")
    return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center">
        <section className="w-full py-12 md:py-24 lg:py-32 flex flex-col items-center justify-center">
          <div className="container px-4 md:px-6 flex flex-col items-center justify-center">
            <div className="w-full">
              <div className="flex flex-col justify-center space-y-4 items-center text-center">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl">
                    30 Day 30 Projects Challenge
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Unlock your coding potential with a 30-day challenge to build 30 unique projects. Sharpen your
                    skills, boost your portfolio, and join a community of passionate developers.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild>
                    <Link href={"/auth/sign-up"}>Accept challenge</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t text-center bg-gray-900 text-white">
        <p className="text-xs">
          Made with 💖 by
          <Link href="https://linkedin.com/in/growwithtalha-webdeveloper" className="ml-1 font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 hover:underline">
            Talha Ali
          </Link>
        </p>
      </footer>
    </div>
  );
}

function CodeIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}
