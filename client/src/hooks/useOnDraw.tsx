"use client";

import React, { useRef, useEffect, MutableRefObject } from "react";

export const useOnDraw = (
  onDraw: (
    ctx: CanvasRenderingContext2D,
    point: { x: number; y: number },
    prevPoint: MutableRefObject<{ x: number; y: number } | undefined>
  ) => void
) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isInDrawingRef = useRef(false);
  const prevPointRef = useRef<{ x: number; y: number }>();

  const mouseMoveListenerRef = useRef<any>();
  const mouseUpListenerRef = useRef<any>();

  function SetCanvasRef(ref: any) {
    canvasRef.current = ref;
  }

  function onMouseDown() {
    isInDrawingRef.current = true;
  }

  useEffect(() => {
    function initMouseMoveListener() {
      const mouseMouseListener = (e: MouseEvent) => {
        if (isInDrawingRef.current) {
          const point = computePointInCanvas(e.clientX, e.clientY) as {
            x: number;
            y: number;
          };
          const ctx = canvasRef.current?.getContext(
            "2d"
          ) as CanvasRenderingContext2D;
          console.log(point);
          if (onDraw) {
            onDraw(ctx, point, prevPointRef);
          }
          prevPointRef.current = point;
        }
      };
      mouseMoveListenerRef.current = mouseMouseListener;
      window.addEventListener("mousemove", mouseMouseListener);
    }

    function initMouseUpListener() {
      const listener = () => {
        isInDrawingRef.current = false;
        prevPointRef.current = undefined;
      };
      mouseUpListenerRef.current = listener;
      window.addEventListener("mouseup", listener);
    }

    function removeListeners() {
      if (mouseMoveListenerRef.current) {
        window.removeEventListener("mousemove", mouseMoveListenerRef.current);
      }
      if (mouseUpListenerRef.current) {
        window.removeEventListener("mousemove", mouseUpListenerRef.current);
      }
    }

    function computePointInCanvas(clientX: number, clientY: number) {
      const boundingRect = canvasRef.current?.getBoundingClientRect();
      if (!boundingRect) return;
      return {
        x: clientX - boundingRect?.left,
        y: clientY - boundingRect.top,
      };
    }
    initMouseMoveListener();
    initMouseUpListener();

    return () => {
      removeListeners();
    };
  }, [onDraw]);

  /*
  useEffect(() => {
    return () => {
      if (mouseMoveListenerRef.current) {
        window.removeEventListener("mousemove", mouseMoveListenerRef.current);
      }
      if (mouseUpListenerRef.current) {
        window.removeEventListener("mousemove", mouseUpListenerRef.current);
      }
    };
  }, []);*/

  return { SetCanvasRef, onMouseDown };
};
