import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import "./globals.css";

export default function Home() {
  return (
    <main className=" flex flex-col w-full  items-center gap-32">
      <div className="space-y-10 text-center">
        <h1 className="header-h1 header-h1-gradient ">Online Draw</h1>
        <h2 className="header-h2 text-center text-muted-foreground">
          Discover a whole new way to connect with your friends through art with
          our interactive online drawing platform! Dive into exciting drawing
          sessions where you guess what your friends are drawing in real time.
          Whether you&apos;are a seasoned artist or an enthusiastic beginner,
          our user-friendly platform offers you a fun and challenging
          experience. Expand your creativity, challenge your friends, and create
          unforgettable memories by exploring the world of art together,
          wherever you are!
        </h2>
      </div>
      <div className="bg-slate-500 shadow-lg shadow-slate-600 w-fit rounded-2xl space-y-8 p-6   ">
        <h3 className="header-h3 text-center text-white ">Create Room!</h3>
        <div className="flex gap-3 self-center">
          <Input
            className="text-white text-lg placeholder:text-slate-300"
            color="#"
            placeholder="Name of the room"
          />
          <Button className="bg-gradient-to-r from-purple-300 to-violet-900">
            Create room
          </Button>
        </div>
      </div>
    </main>
  );
}
