"use client";

import { Player } from "@remotion/player";
import type { NextPage } from "next";
import {
  SYNTHETIC_DURATION_IN_FRAMES,
  VIDEO_FPS,
  VIDEO_HEIGHT,
  VIDEO_WIDTH,
} from "../../types/constants";
import { SyntheticMain } from "../remotion/SyntheticComp/SyntheticMain";

const Home: NextPage = () => {
  return (
    <div>
      <div className="max-w-screen-md m-auto mb-5 px-4">
        <div className="overflow-hidden rounded-geist shadow-[0_0_200px_rgba(0,0,0,0.15)] mb-10 mt-16">
          <Player
            component={SyntheticMain}
            inputProps={{}}
            durationInFrames={SYNTHETIC_DURATION_IN_FRAMES}
            fps={VIDEO_FPS}
            compositionHeight={VIDEO_HEIGHT}
            compositionWidth={VIDEO_WIDTH}
            style={{
              width: "100%",
            }}
            controls
            autoPlay
            loop
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
