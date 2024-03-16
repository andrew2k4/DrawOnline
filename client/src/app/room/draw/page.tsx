"use client";
import { PlayerCard } from "@/components/PlayerCard";
import { Canvas } from "@/components/ui/canvas";
import { useWindowDimensions } from "@/hooks/useWindowResize";
import React, { useRef } from "react";

export default function DRAW() {
  const { width, height } = useWindowDimensions();
  const windowHeight = height; // Store window height in a variable
  const windiwSizeRef = useRef({ width, height });

  return (
    <main className="flex  justify-between  items-center gap-16   h-screen mx-6">
      <div className="w-1/3 grid grid-rows-4 gap-8  ">
        <PlayerCard row={true} />
        <PlayerCard row={true} />
        <PlayerCard row={true} />
        <PlayerCard row={true} />
      </div>
      <div className="  border-2 rounded-3xl  border-black w-2/3 overflow-hidden h-fit ">
        <Canvas
          width={(4 * windiwSizeRef.current.width) / 5}
          height={(11 * windiwSizeRef.current.height) / 12}
        />
      </div>
    </main>
  );
}
