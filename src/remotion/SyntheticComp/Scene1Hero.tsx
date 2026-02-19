import React from "react";
import { fontFamily } from "@remotion/google-fonts/Manrope";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { SyntheticLogo } from "./SyntheticLogo";

interface SceneProps {
  fadeDuration: number;
  totalDuration: number;
}

export const Scene1Hero: React.FC<SceneProps> = ({
  fadeDuration,
  totalDuration,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, fadeDuration], [0, 1], {
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(
    frame,
    [totalDuration - fadeDuration, totalDuration],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const sceneOpacity = Math.min(fadeIn, fadeOut);

  // Logo springs in first
  const logoProgress = spring({
    frame,
    fps,
    config: { damping: 200 },
    durationInFrames: 25,
    delay: fadeDuration,
  });
  const logoY = interpolate(logoProgress, [0, 1], [20, 0]);

  // "synthetic" text springs in after logo
  const synthProgress = spring({
    frame,
    fps,
    config: { damping: 200 },
    durationInFrames: 28,
    delay: fadeDuration + 10,
  });
  const synthY = interpolate(synthProgress, [0, 1], [30, 0]);

  // ".new" text springs in with slight stagger
  const dotProgress = spring({
    frame,
    fps,
    config: { damping: 200 },
    durationInFrames: 28,
    delay: fadeDuration + 8,
  });
  const dotY = interpolate(dotProgress, [0, 1], [30, 0]);

  // Divider line draws from left to right
  const lineWidth = interpolate(
    frame,
    [fadeDuration + 20, fadeDuration + 52],
    [0, 100],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.inOut(Easing.quad),
    }
  );

  // Tagline fades in
  const taglineOpacity = interpolate(
    frame,
    [fadeDuration + 44, fadeDuration + 68],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Subtle dot grid fades in
  const gridOpacity = interpolate(frame, [0, 30], [0, 0.35], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{ backgroundColor: "#F7F6F3", opacity: sceneOpacity, fontFamily }}
    >
      {/* Background dot grid */}
      <AbsoluteFill style={{ opacity: gridOpacity }}>
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="scene1-dots"
              x="0"
              y="0"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="1" cy="1" r="1.5" fill="#6366f1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#scene1-dots)" />
        </svg>
      </AbsoluteFill>

      {/* Centered content */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 24,
        }}
      >
        {/* Brand logo mark */}
        <div
          style={{
            transform: `translateY(${logoY}px)`,
            opacity: logoProgress,
          }}
        >
          <SyntheticLogo size={80} clipId="hero-logo-clip" />
        </div>

        {/* Wordmark: "synthetic.new" */}
        <div style={{ display: "flex", alignItems: "baseline" }}>
          <div
            style={{
              fontSize: 96,
              fontWeight: 800,
              color: "#1e1b4b",
              letterSpacing: "-0.03em",
              lineHeight: 1,
              transform: `translateY(${synthY}px)`,
              opacity: synthProgress,
            }}
          >
            synthetic
          </div>
          <div
            style={{
              fontSize: 96,
              fontWeight: 800,
              color: "#6366f1",
              letterSpacing: "-0.03em",
              lineHeight: 1,
              transform: `translateY(${dotY}px)`,
              opacity: dotProgress,
            }}
          >
            .new
          </div>
        </div>

        {/* Animated divider */}
        <div
          style={{
            width: 520,
            height: 2,
            backgroundColor: "#e0e7ff",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              height: "100%",
              width: `${lineWidth}%`,
              backgroundColor: "#6366f1",
            }}
          />
        </div>

        {/* Tagline */}
        <div
          style={{
            marginTop: 22,
            opacity: taglineOpacity,
            fontSize: 18,
            color: "#6b7280",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            fontWeight: 500,
          }}
        >
          Privacy-first.&nbsp;&nbsp;&nbsp;Open Source Models.
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
