import useVideoPlayer from "./hooks/UseVideoPlayer";
import React, {useRef} from "react";
import "./VideoPlayer.scss";

import TagsFilter from '../TagsFilter/TagsFilter'

const VideoPlayer = (props) => {
  const videoPlayer = useRef("null");

  const {
    playerState,
    togglePlay,
    handleOnTimeUpdate,
    handleVideoProgress,
    handleVideoSpeed,
    toggleMute,
  } = useVideoPlayer(videoPlayer);

  const {
    isPlaying,
    progress,
    speed,
    isMuted,
    } = playerState;

  const {
    response,
    src,
    poster,
    width,
    height,
    autoplay,
    title,
    controls,
    preload,
    muted,
    playsInline,
    loop,
    onLoadedMetadata,
    onLoadedData,
    onTimeUpdate,
    onProgress,
    onCanPlay,
    onCanPlayThrough,
    onSeeked,
    onSeeking,
    onEnded,
    onError,
    onWaiting,
    onLoadStart
    } = props;


  return (
    <div className="video-container">
      <div className="video-wrapper">
        <video
          ref={videoPlayer}
          poster={poster}
          width={width}
          height={height}
          onTimeUpdate={handleOnTimeUpdate}
          autoPlay={autoplay}
          title={title}>
          <source src={src} type="video/mp4" />
        </video>
        <div className="controls">
          <div className="actions">
            <button className="play-btn" onClick={togglePlay}>
              {!playerState.isPlaying ? (
                <i className="bx bx-play">Play</i>
              ) : (
                <i className="bx bx-pause">Pause</i>
              )}
            </button>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={playerState.progress}
            onChange={(e) => handleVideoProgress(e)}
          />
          <select
            className="velocity"
            value={playerState.speed}
            onChange={(e) => handleVideoSpeed(e)}
          >
            <option value="0.50">0.50x</option>
            <option value="1">1x</option>
            <option value="1.25">1.25x</option>
            <option value="2">2x</option>
          </select>
          <button className="mute-btn" onClick={toggleMute}>
            {!playerState.isMuted ? (
              <i className="bx bxs-volume-full"> Mute </i>
            ) : (
              <i className="bx bxs-volume-mute"> Unmute</i>
            )}
          </button>
        </div>
      </div>

      <TagsFilter response={response} default_key="other_tags"/>
    </div>
  );
};


export default VideoPlayer;