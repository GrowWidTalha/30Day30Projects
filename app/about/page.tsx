// "use client"
import Link from "next/link";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";

export default function ChallengePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center py-12 px-4 md:px-6 lg:px-8">
        <section className="w-full max-w-4xl text-center space-y-8">
          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            About the 30 Days 30 Projects Challenge
          </h1>
          <p className="text-lg text-muted-foreground md:text-xl">
            The <strong>30 Days 30 Projects Challenge</strong> is a fast-paced, project-based coding journey designed to boost your skills through hands-on practice! Over the course of 30 days, you&apos;ll commit to building a unique project each day, helping you rapidly improve your coding abilities and expand your portfolio, whether you&apos;re a beginner or already have some coding experience.
          </p>
          <p className="text-lg text-muted-foreground md:text-xl">
            One of the biggest challenges in learning to code is maintaining consistency and motivation. The <strong>30 Days 30 Projects Challenge</strong> tackles this by setting a clear goal: build one project every day. By sharing your progress on social media with the hashtag <code>#30Days30Projects</code>, you can connect with others taking the challenge, celebrate each other&apos;s successes, and stay motivated together.
          </p>
          <p className="text-lg text-muted-foreground md:text-xl">
            The key to success in the <strong>30 Days 30 Projects Challenge</strong> is consistency. Even if you can only dedicate a short amount of time to your project on busy days, working steadily towards your goal will lead to significant progress. By focusing on completing a small project daily, you&apos;ll be amazed at how quickly your coding skills and confidence will grow.
          </p>
          <p className="text-lg text-muted-foreground md:text-xl">
            All projects in this challenge are built using <strong>Next.js</strong>, a powerful framework that combines the best features of React and server-side rendering. This will give you hands-on experience with one of the most in-demand technologies in web development today, preparing you for real-world coding challenges.
          </p>
          <p className="text-lg text-muted-foreground md:text-xl">
            This challenge is led by <strong>Asharib Ali</strong> (Student Ambassador & Teaching Faculty Member) and aims to inspire thousands of students at GIAIC to dive into coding with cutting-edge technologies and the latest tech stacks. Primarily organized for our official community on Discord, the challenge has a dedicated channel where participants can share their projects, seek feedback, and support one another.
          </p>
          <p className="text-lg text-muted-foreground md:text-xl">
            <strong>Special thanks</strong> to <strong>Sir Daniyal Nagori (CEO)</strong>, <strong>Sir Ameen Alam (Dean of Faculty)</strong>, and the entire teaching faculty (100+ members) for their unwavering support. We are proud to be part of a community of over <strong>50,000 tech students</strong> who are learning from GIAIC, both on-site at the Governor House Sindh and online.
          </p>
          <Button asChild className="mt-8">
            <Link href="/auth/sign-up">Join the Challenge</Link>
          </Button>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full items-center px-4 md:px-6 border-t text-center bg-gray-900 text-white">
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
