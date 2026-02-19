import { z } from "zod";
export const COMP_NAME = "MyComp";

export const CompositionProps = z.object({
  title: z.string(),
});

export const defaultMyCompProps: z.infer<typeof CompositionProps> = {
  title: "Next.js and Remotion",
};

export const DURATION_IN_FRAMES = 200;
export const VIDEO_WIDTH = 1280;
export const VIDEO_HEIGHT = 720;
export const VIDEO_FPS = 30;

// synthetic.new showcase composition
export const SYNTHETIC_COMP_NAME = "SyntheticShowcase";
// 3.5s + 4.5s + 4.5s + 4s - 3 × 0.5s overlaps = 15s at 30fps = 450 frames
export const SYNTHETIC_DURATION_IN_FRAMES = 450;
