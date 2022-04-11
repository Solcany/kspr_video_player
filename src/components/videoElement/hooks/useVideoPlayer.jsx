// @src/hooks/useVideoPlayer.js

import { useState, useEffect, useRef } from "react";

const useVideoPlayer = (videoElement) => {
  const didMount = useRef(false);

  const [playerState, setPlayerState] = useState({
    isPlaying: false,
    progress: 0,
    speed: 1,
    isMuted: false,
  });

  const togglePlay = () => {
    setPlayerState({
      ...playerState,
      isPlaying: !playerState.isPlaying,
    });
  };

  useEffect(() => {
    if(didMount.current) { // avoid using this effect on page load
      if(playerState.isPlaying) {
        videoElement.current.play();
      } else {
        videoElement.current.pause();
      }
    }
  }, [playerState.isPlaying, videoElement]);

  const handleOnTimeUpdate = () => {
    const progress = (videoElement.current.currentTime / videoElement.current.duration) * 100;
    setPlayerState({
      ...playerState,
      progress,
    });
  };
  
  const handleVideoProgress = (event) => {
    const manualChange = Number(event.target.value);
    videoElement.current.currentTime = (videoElement.current.duration / 100) * manualChange;
    setPlayerState({
      ...playerState,
      progress: manualChange,
    });
  };
  const handleVideoSpeed = (event) => {
    const speed = Number(event.target.value);
    videoElement.current.playbackRate = speed;
    setPlayerState({
      ...playerState,
      speed,
    });
  };
  const toggleMute = () => {
    setPlayerState({
      ...playerState,
      isMuted: !playerState.isMuted,
    });
  };
  useEffect(() => {
    playerState.isMuted
      ? (videoElement.current.muted = true)
      : (videoElement.current.muted = false);
  }, [playerState.isMuted, videoElement]);

  // set didMount to true on page load
  // don't use this effect ever again
  useEffect(() => {
    if(!didMount.current) {
      didMount.current = true
    }
  },[])

  return {
    playerState,
    togglePlay,
    handleOnTimeUpdate,
    handleVideoProgress,
    handleVideoSpeed,
    toggleMute,
  };
};

export default useVideoPlayer;