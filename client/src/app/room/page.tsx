import { PlayerCard } from "@/components/PlayerCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function ROOM() {
  return (
    <main className="flex flex-1 flex-col pb-10 h-full justify-between gap-6">
      <div className="flex justify-between items-center">
        <h1 className="header-h2">Andrew-room</h1>
        <div>
          <p>Room-Id</p>
          <p>5372573575235452</p>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-6">
        <PlayerCard row={false} />
        <PlayerCard row={false} />
        <PlayerCard row={false} />
        <PlayerCard row={false} />
        <PlayerCard row={false} />
        <PlayerCard row={false} />
        <PlayerCard row={false} />
        <PlayerCard row={false} />
      </div>

      <div className="flex justify-between">
        <Button className="p-8">Leave</Button>
        <Link href="/room/draw">
          <Button className="p-8">Play</Button>
        </Link>
      </div>
    </main>
  );
}
