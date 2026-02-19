import React from "react";
import { fontFamily } from "@remotion/google-fonts/Manrope";
import { SyntheticLogo } from "./SyntheticLogo";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

interface SceneProps {
  fadeDuration: number;
  totalDuration: number;
}

export const Scene4CTA: React.FC<SceneProps> = ({
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

  // Price springs in
  const priceProgress = spring({
    frame,
    fps,
    config: { damping: 200 },
    durationInFrames: 28,
    delay: fadeDuration,
  });
  const priceY = interpolate(priceProgress, [0, 1], [30, 0]);

  // Label fades in after price
  const labelOpacity = interpolate(
    frame,
    [fadeDuration + 15, fadeDuration + 35],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Secondary label fades in after
  const sublabelOpacity = interpolate(
    frame,
    [fadeDuration + 28, fadeDuration + 48],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Domain springs in last
  const domainProgress = spring({
    frame,
    fps,
    config: { damping: 200 },
    durationInFrames: 25,
    delay: fadeDuration + 35,
  });
  const domainY = interpolate(domainProgress, [0, 1], [25, 0]);

  return (
    <AbsoluteFill
      style={{ backgroundColor: "#F7F6F3", opacity: sceneOpacity, fontFamily }}
    >
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 12,
        }}
      >
        {/* Label above price */}
        <div
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: "#6366f1",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            opacity: labelOpacity,
          }}
        >
          Subscriptions start at
        </div>

        {/* Big price */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 4,
            transform: `translateY(${priceY}px)`,
            opacity: priceProgress,
          }}
        >
          <span
            style={{
              fontSize: 128,
              fontWeight: 800,
              color: "#1e1b4b",
              lineHeight: 1,
              letterSpacing: "-0.05em",
            }}
          >
            $20
          </span>
          <span
            style={{
              fontSize: 40,
              fontWeight: 600,
              color: "#6b7280",
              lineHeight: 1,
              marginBottom: 8,
            }}
          >
            /mo
          </span>
        </div>

        {/* Secondary note */}
        <div
          style={{
            fontSize: 18,
            fontWeight: 500,
            color: "#9ca3af",
            opacity: sublabelOpacity,
          }}
        >
          or pay as you go
        </div>

        {/* Divider */}
        <div
          style={{
            width: 48,
            height: 2,
            backgroundColor: "#e0e7ff",
            marginTop: 20,
            marginBottom: 8,
          }}
        />

        {/* Logo + domain */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
            transform: `translateY(${domainY}px)`,
            opacity: domainProgress,
          }}
        >
          <SyntheticLogo size={48} clipId="cta-logo-clip" />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            transform: `translateY(${domainY}px)`,
            opacity: domainProgress,
          }}
        >
          <span
            style={{
              fontSize: 52,
              fontWeight: 700,
              color: "#1e1b4b",
              letterSpacing: "-0.02em",
            }}
          >
            synthetic
          </span>
          <span
            style={{
              fontSize: 52,
              fontWeight: 700,
              color: "#6366f1",
              letterSpacing: "-0.02em",
            }}
          >
            .new
          </span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
