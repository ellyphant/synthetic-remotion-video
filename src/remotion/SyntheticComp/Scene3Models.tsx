import React from "react";
import { fontFamily } from "@remotion/google-fonts/Manrope";
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

const models = [
  { name: "GLM-4.7" },
  { name: "Kimi K2.5" },
  { name: "DeepSeek V3" },
  { name: "MiniMax M2.1" },
];

export const Scene3Models: React.FC<SceneProps> = ({
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

  const labelOpacity = interpolate(
    frame,
    [fadeDuration, fadeDuration + 20],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const titleProgress = spring({
    frame,
    fps,
    config: { damping: 200 },
    durationInFrames: 25,
    delay: fadeDuration,
  });
  const titleY = interpolate(titleProgress, [0, 1], [25, 0]);

  const subtitleOpacity = interpolate(
    frame,
    [fadeDuration + 58, fadeDuration + 78],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

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
          gap: 32,
        }}
      >
        {/* Section label */}
        <div
          style={{
            color: "#6366f1",
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            opacity: labelOpacity,
          }}
        >
          Open Source
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 52,
            fontWeight: 700,
            color: "#1e1b4b",
            textAlign: "center",
            transform: `translateY(${titleY}px)`,
            opacity: titleProgress,
          }}
        >
          Run almost any open-source model
        </div>

        {/* Model chips */}
        <div
          style={{
            display: "flex",
            gap: 14,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {models.map((model, i) => {
            const chipProgress = spring({
              frame,
              fps,
              config: { damping: 200 },
              durationInFrames: 22,
              delay: fadeDuration + 18 + i * 10,
            });
            const chipY = interpolate(chipProgress, [0, 1], [20, 0]);

            return (
              <div
                key={model.name}
                style={{
                  transform: `translateY(${chipY}px)`,
                  opacity: chipProgress,
                  backgroundColor: "#eef2ff",
                  border: "1.5px solid #c7d2fe",
                  borderRadius: 10,
                  padding: "10px 24px",
                  fontSize: 18,
                  fontWeight: 600,
                  color: "#4338ca",
                }}
              >
                {model.name}
              </div>
            );
          })}
        </div>

        {/* Subtitle */}
        <div
          style={{
            color: "#9ca3af",
            fontSize: 15,
            letterSpacing: "0.04em",
            opacity: subtitleOpacity,
          }}
        >
          with high rate limits
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
