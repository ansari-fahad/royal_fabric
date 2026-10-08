"use client";

import React from "react";
import { ScrollFrameSequence } from "@/components/ScrollFrameSequence";
import { StorySections } from "@/components/StorySections";
import { animationFrames } from "@/data/frames";

export const Hero: React.FC = () => {
  return (
    <ScrollFrameSequence
      id="story"
      framePath={animationFrames.path}
      frameCount={animationFrames.count}
      extension={animationFrames.extension}
      padding={animationFrames.padding}
      prefix={animationFrames.prefix}
      containerHeight="500vh"
    >
      {({ progress, currentFrame }) => (
        <StorySections progress={progress} currentFrame={currentFrame} />
      )}
    </ScrollFrameSequence>
  );
};
