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

interface SceneProps {
  fadeDuration: number;
  totalDuration: number;
}

const features = [
  "API prompts never stored",
  "Never train on your data",
  "No in-house quantization",
];

export const Scene2Privacy: React.FC<SceneProps> = ({
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
          gap: 28,
          padding: "0 160px",
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
          Privacy First
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 52,
            fontWeight: 700,
            color: "#1e1b4b",
            textAlign: "center",
            lineHeight: 1.15,
            transform: `translateY(${titleY}px)`,
            opacity: titleProgress,
          }}
        >
          Your data stays yours
        </div>

        {/* Feature list */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            marginTop: 4,
          }}
        >
          {features.map((text, i) => {
            const featureOpacity = interpolate(
              frame,
              [fadeDuration + 20 + i * 14, fadeDuration + 40 + i * 14],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );
            const featureX = interpolate(
              frame,
              [fadeDuration + 20 + i * 14, fadeDuration + 40 + i * 14],
              [-24, 0],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.out(Easing.quad),
              }
            );

            return (
              <div
                key={text}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  opacity: featureOpacity,
                  transform: `translateX(${featureX}px)`,
                }}
              >
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    backgroundColor: "#6366f1",
                    flexShrink: 0,
                  }}
                />
                <span style={{ fontSize: 20, color: "#374151", fontWeight: 500 }}>{text}</span>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
