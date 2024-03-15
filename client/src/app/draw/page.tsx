"use client";
import { Canvas } from "@/components/ui/canvas";
import { useWindowDimensions } from "@/hooks/useWindowResize";
import React, { useRef } from "react";

export default function DRAW() {
  const { width, height } = useWindowDimensions();
  const windiwSizeRef = useRef({ width, height });
  return (
    <main>
      <Canvas
        width={(2 * windiwSizeRef.current.width) / 3}
        height={(2 * windiwSizeRef.current.height) / 3}
      />
    </main>
  );
}
