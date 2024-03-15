"use client";

import React, { MutableRefObject } from "react";
import { useOnDraw } from "@/hooks/useOnDraw";

export const Canvas = ({
  width,
  height,
}: {
  width: number;
  height: number;
}) => {
  const { SetCanvasRef, onMouseDown } = useOnDraw(onDraw);

  function onDraw(
    ctx: CanvasRenderingContext2D,
    point: { x: number; y: number },
    prevPoint: MutableRefObject<{ x: number; y: number } | undefined>
  ) {
    let prevPoints = prevPoint.current ?? point;
    drawLine(prevPoints, point, ctx, "#000000", 5);
  }

  function drawLine(
    start: { x: number; y: number },
    end: { x: number; y: number },
    ctx: CanvasRenderingContext2D,
    color: string,
    width: number
  ) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(start.x, start.y, 2, 0, 2 * Math.PI);
    ctx.fill();
  }

  return (
    <canvas
      ref={SetCanvasRef}
      onMouseDown={onMouseDown}
      width={width}
      height={height}
      className="border-2 border-black"
    />
  );
};
