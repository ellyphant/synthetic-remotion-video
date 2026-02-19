import React from "react";
import { loadFont } from "@remotion/google-fonts/Manrope";
import { AbsoluteFill, Sequence, useVideoConfig } from "remotion";
import { Scene1Hero } from "./Scene1Hero";
import { Scene2Privacy } from "./Scene2Privacy";
import { Scene3Models } from "./Scene3Models";
import { Scene4CTA } from "./Scene4CTA";

loadFont("normal", {
  subsets: ["latin"],
  weights: ["500", "600", "700", "800"],
});

// Overlap between scenes to create smooth crossfade
const FADE = 15;

export const SyntheticMain: React.FC = () => {
  const { fps } = useVideoConfig();

  const S1_DUR = Math.round(3.5 * fps); // 105 frames – hero
  const S2_DUR = Math.round(4.5 * fps); // 135 frames – privacy
  const S3_DUR = Math.round(4.5 * fps); // 135 frames – models
  const S4_DUR = Math.round(4 * fps);   // 120 frames – CTA

  // Each scene starts FADE frames before the previous one ends
  const s1Start = 0;
  const s2Start = S1_DUR - FADE;
  const s3Start = s2Start + S2_DUR - FADE;
  const s4Start = s3Start + S3_DUR - FADE;

  return (
    <AbsoluteFill style={{ backgroundColor: "#080808" }}>
      <Sequence from={s1Start} durationInFrames={S1_DUR} premountFor={FADE}>
        <Scene1Hero fadeDuration={FADE} totalDuration={S1_DUR} />
      </Sequence>
      <Sequence from={s2Start} durationInFrames={S2_DUR} premountFor={FADE}>
        <Scene2Privacy fadeDuration={FADE} totalDuration={S2_DUR} />
      </Sequence>
      <Sequence from={s3Start} durationInFrames={S3_DUR} premountFor={FADE}>
        <Scene3Models fadeDuration={FADE} totalDuration={S3_DUR} />
      </Sequence>
      <Sequence from={s4Start} durationInFrames={S4_DUR} premountFor={FADE}>
        <Scene4CTA fadeDuration={FADE} totalDuration={S4_DUR} />
      </Sequence>
    </AbsoluteFill>
  );
};
