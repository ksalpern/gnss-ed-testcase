import React, { useState, useRef, useEffect } from "react";
import Hls from "hls.js";

const VideoPlayer = ({ src, poster }) => {
  const [playbackRate, setPlaybackRate] = useState(1);
  const videoRef = useRef(null);
  const [inPictureInPicture, setInPictureInPicture] = useState(false);
  // const [currentTime, setCurrentTime] = useState(0);

  const handlePlaybackRateChange = (newRate) => {
    setPlaybackRate(newRate);
    videoRef.current.playbackRate = newRate;
  };

  const handlePictureInPicture = () => {
    const video = videoRef.current;
    if (inPictureInPicture) {
      document.exitPictureInPicture();
    } else {
      video.requestPictureInPicture();
    }
  };

  const handleKeyDown = (event) => {
    switch (event.key) {
      case "ArrowUp":
        handlePlaybackRateChange(Math.min(playbackRate + 0.25, 5));
        break;
      case "ArrowDown":
        handlePlaybackRateChange(Math.max(playbackRate - 0.25, 0.5));
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    const hls = new Hls();
    hls.loadSource(src);
    hls.attachMedia(video);
    return () => {
      hls.destroy();
    };
  }, []);

  //updates video time
  // const handleTimeUpdate = () => {
  //   const video = videoRef.current;
  //   setCurrentTime(video.currentTime);
  //   localStorage.setItem("video-progress", JSON.stringify({ src, currentTime }));
  // };


  //sets current time of watched video
  // useEffect(() => {
  //   const storedProgress = localStorage.getItem("video-progress");
  //   if (storedProgress) {
  //     const { src: storedSrc, currentTime: storedCurrentTime } = JSON.parse(storedProgress);
  //     if (src === storedSrc) {
  //       videoRef.current.currentTime = storedCurrentTime;
  //       setCurrentTime(storedCurrentTime);
  //     }
  //   }
  // }, [src]);


  return (
    <div>
      <video
        src={src}
        ref={videoRef}
        poster={poster}
        controls
        onContextMenu={(event) => event.preventDefault()}
        onKeyDown={handleKeyDown}
        // onTimeUpdate={handleTimeUpdate}
      />

      <div className="flex justify-center mt-3">
        <button
          className="btn"
          onClick={handlePictureInPicture}
        >
          {inPictureInPicture
            ? "Exit Picture-in-Picture"
            : "Picture-in-Picture"}
        </button>
      </div>
      <div className="flex flex-wrap gap-2 justify-center my-1 md:my-3 ">

        <button className="btn" onClick={() => handlePlaybackRateChange(0.5)}>
          0.5x
        </button>
        <button className="btn" onClick={() => handlePlaybackRateChange(0.75)}>
          0.75x
        </button>
        <button className="btn" onClick={() => handlePlaybackRateChange(1)}>
          1x
        </button>
        <button className="btn" onClick={() => handlePlaybackRateChange(1.5)}>
          1.5x
        </button>
        <button className="btn" onClick={() => handlePlaybackRateChange(2)}>
          2x
        </button>
      </div>
      <div className="text-center">Playback rate: {playbackRate}x</div>
      <p>
        Use the down ↓ and up ↑ arrow keys to adjust the video playback speed
      </p>
      {/* <div>Current time: {currentTime.toFixed(2)}</div> */}
    </div>
  );
};

export default VideoPlayer;
