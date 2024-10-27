"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface SpritesheetAnimationProps {
  imageUrl: string;
  frameWidth: number;
  frameHeight: number;
  frameCount: number;
  fps?: number;
  maxSize?: number;
}

export default function useSpritesheetAnimation({
  imageUrl,
  frameWidth,
  frameHeight,
  frameCount,
  fps = 24,
  maxSize = 300,
}: SpritesheetAnimationProps) {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>();

  const animate = useCallback(
    (time: number) => {
      if (previousTimeRef.current != undefined) {
        const deltaTime = time - previousTimeRef.current;
        if (deltaTime >= 1000 / fps) {
          setCurrentFrame((prevFrame) => (prevFrame + 1) % frameCount);
          previousTimeRef.current = time;
        }
      } else {
        previousTimeRef.current = time;
      }
      requestRef.current = requestAnimationFrame(animate);
    },
    [fps, frameCount],
  );

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [animate]);

  useEffect(() => {
    const updateScale = () => {
      const containerWidth = 100;
      console.log("containerWidth", containerWidth);
      const newScale = Math.min(
        1,
        containerWidth / Math.min(frameWidth, maxSize),
      );
      setScale(newScale);
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, [frameWidth, maxSize]);

  const style = {
    width: `${frameWidth * scale}px`,
    height: `${frameHeight * scale}px`,
    backgroundImage: `url(${imageUrl})`,
    backgroundPosition: `-${currentFrame * frameWidth * scale}px 0px`,
    backgroundSize: `${frameWidth * frameCount * scale}px ${frameHeight * scale}px`,
  };

  return { style, containerRef };
}

// export default function ResponsiveSpritesheetAnimationExample() {
//   const { style, containerRef } = useSpritesheetAnimation({
//     imageUrl: "/placeholder.svg?height=100&width=500",
//     frameWidth: 100,
//     frameHeight: 100,
//     frameCount: 5,
//     fps: 10,
//     maxSize: 300,
//   });

//   return (
//     <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
//       <div className="w-full max-w-md rounded-lg bg-white p-4 shadow-md sm:p-6 md:p-8">
//         <h1 className="mb-4 text-center text-xl font-bold sm:text-2xl">
//           Responsive Spritesheet Animation
//         </h1>
//         <div ref={containerRef} className="mx-auto w-full max-w-[300px]">
//           <div style={style} className="mx-auto border border-gray-300"></div>
//         </div>
//         <p className="mt-4 text-center text-sm text-gray-600">
//           This animation resizes to fit smaller screens while maintaining its
//           aspect ratio.
//         </p>
//       </div>
//     </div>
//   );
// }
