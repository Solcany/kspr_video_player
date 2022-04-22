import useVideoPlayer from "./hooks/UseVideoPlayer";
import React, {useRef} from "react";

import "./VideoPlayer.scss";

import { default as IconPlay } from 'static/svg/play.svg';
import { default as IconPause } from 'static/svg/pause.svg';
import { default as IconMute } from 'static/svg/mute.svg';
import { default as IconUnmute } from 'static/svg/unmute.svg';

import VideoTagsTimeline from '../VideoTagsTimeline/VideoTagsTimeline'

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
          onTimeUpdate={handleOnTimeUpdate}
          autoPlay={autoplay}
          title={title}>
          <source src={src} type="video/mp4" />
        </video>
        <div className="controls">
          <div className="actions">
            <button className="btn play-btn" onClick={togglePlay}>
              {!playerState.isPlaying ? (
                <img src={IconPlay}/>
              ) : (
                <img src={IconPause}/>
              )}
            </button>
            <button className="btn mute-btn" onClick={toggleMute}>
              {!playerState.isMuted ? (
                  <img src={IconMute}/>
              ) : (
                  <img src={IconUnmute}/>
              )}
            </button>            
            <select 
              onChange = {(e) => handleVideoSpeed(e)}
              className="velocity"
              value={playerState.speed}>
              <option value="0.50">0.50x</option>
              <option value="1">1x</option>
              <option value="1.25">1.25x</option>
              <option value="2">2x</option>
            </select>
          </div>
          <input 
              className="timeline"
              type="range"
              min="0"
              max="1000"
              value={playerState.progress}
              onChange={(e) => handleVideoProgress(e)}
          />
        </div>
      </div>
      <VideoTagsTimeline response={response} defaultTagsKey="other_tags"/>
    </div>
  );
};


export default VideoPlayer;