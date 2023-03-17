import React, { useEffect, useRef } from "react";
import Hls from "hls.js";

const HoverComponent = ({ src, classProp }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    const hls = new Hls();
    hls.loadSource(src);
    hls.attachMedia(video);
    return () => {
      hls.destroy();
    };
  }, []);

  return (
      <video
        className={classProp}
        loop
        autoPlay
        muted
        // src='/assets/test.mp4'
        ref={videoRef}
        src={src}
      ></video>
  );
};

export default HoverComponent;
