import React, { useEffect, useRef, useState } from 'react';
import './VideoPlayer.css';

const PlayIcon = () => (
    <svg viewBox="0 0 24 24">
        <path d="M8 5v14l11-7z"/>
    </svg>
);

const PauseIcon = () => (
    <svg viewBox="0 0 24 24">
        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
    </svg>
);

const VolumeIcon = ({ muted }: { muted: boolean }) => (
    <svg viewBox="0 0 24 24">
        {muted ? (
            <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
        ) : (
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
        )}
    </svg>
);

const FullscreenIcon = () => (
    <svg viewBox="0 0 24 24">
        <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
    </svg>
);

const SpeedIcon = () => (
    <svg viewBox="0 0 24 24">
        <path d="M20.38 8.57l-1.23 1.85a8 8 0 0 1-.22 7.58H5.07A8 8 0 0 1 15.58 6.85l1.85-1.23A10 10 0 0 0 3.35 19a2 2 0 0 0 1.72 1h13.85a2 2 0 0 0 1.74-1 10 10 0 0 0-.27-10.44zm-9.79 6.84a2 2 0 0 0 2.83 0l5.66-8.49-8.49 5.66a2 2 0 0 0 0 2.83z"/>
    </svg>
);

interface VideoPlayerProps {
    source: string;
    poster?: string;
    onLoad?: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ source, poster, onLoad }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isBuffering, setIsBuffering] = useState(false);
    const [volume, setVolume] = useState(1);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showControls, setShowControls] = useState(false);
    const controlsTimeoutRef = useRef<NodeJS.Timeout>();
    const [isDragging, setIsDragging] = useState(false);
    const [showSpeedMenu, setShowSpeedMenu] = useState(false);
    const [playbackSpeed, setPlaybackSpeed] = useState(1);
    const speedMenuRef = useRef<HTMLDivElement>(null);

    const speeds = [
        { label: '0.25x', value: 0.25 },
        { label: '0.5x', value: 0.5 },
        { label: '0.75x', value: 0.75 },
        { label: 'Normal', value: 1 },
        { label: '1.25x', value: 1.25 },
        { label: '1.5x', value: 1.5 },
        { label: '2x', value: 2 },
    ];

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    const handlePlayPause = () => {
        const video = videoRef.current;
        if (!video) return;

        if (video.paused) {
            video.play();
            setIsPlaying(true);
        } else {
            video.pause();
            setIsPlaying(false);
        }
    };

    const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const progressBar = progressRef.current;
        const video = videoRef.current;
        if (!progressBar || !video) return;

        const rect = progressBar.getBoundingClientRect();
        const pos = (e.clientX - rect.left) / rect.width;
        video.currentTime = pos * video.duration;
    };

    const handleProgressDrag = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isDragging) return;
        handleProgressClick(e);
    };

    const handleVolumeChange = (e: React.MouseEvent<HTMLDivElement>) => {
        const video = videoRef.current;
        if (!video) return;

        const volumeBar = e.currentTarget;
        const rect = volumeBar.getBoundingClientRect();
        const newVolume = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        
        video.volume = newVolume;
        setVolume(newVolume);
        setIsMuted(newVolume === 0);
    };

    const toggleMute = () => {
        const video = videoRef.current;
        if (!video) return;
        
        const newMuted = !isMuted;
        video.muted = newMuted;
        setIsMuted(newMuted);
        
        if (newMuted) {
            video.volume = 0;
            setVolume(0);
        } else if (volume === 0) {
            video.volume = 1;
            setVolume(1);
        }
    };

    const showControlsTemporarily = () => {
        setShowControls(true);
        if (controlsTimeoutRef.current) {
            clearTimeout(controlsTimeoutRef.current);
        }
        controlsTimeoutRef.current = setTimeout(() => {
            if (isFullscreen && !isBuffering) {
                setShowControls(false);
            }
        }, 3000);
    };

    const toggleFullscreen = () => {
        const video = videoRef.current?.parentElement;
        if (!video) return;

        if (document.fullscreenElement) {
            document.exitFullscreen();
            setIsFullscreen(false);
        } else {
            video.requestFullscreen();
            setIsFullscreen(true);
        }
        showControlsTemporarily();
    };

    const handleSpeedChange = (speed: number) => {
        const video = videoRef.current;
        if (!video) return;

        setPlaybackSpeed(speed);
        video.playbackRate = speed;
        setShowSpeedMenu(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (speedMenuRef.current && !speedMenuRef.current.contains(event.target as Node)) {
                setShowSpeedMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            const video = videoRef.current;
            if (!video) return;

            switch(e.key.toLowerCase()) {
                case 'm':
                    toggleMute();
                    break;
                case 'k':
                case ' ':
                    e.preventDefault();
                    handlePlayPause();
                    break;
                case 'l':
                    video.currentTime = Math.min(video.currentTime + 10, video.duration);
                    break;
                case 'j':
                    video.currentTime = Math.max(video.currentTime - 10, 0);
                    break;
                case 'f':
                    if (document.fullscreenElement) {
                        document.exitFullscreen();
                    } else {
                        video.requestFullscreen();
                    }
                    break;
                case '<':
                    const slowerSpeed = speeds[Math.max(0, speeds.findIndex(s => s.value === playbackSpeed) - 1)];
                    if (slowerSpeed) handleSpeedChange(slowerSpeed.value);
                    break;
                case '>':
                    const fasterSpeed = speeds[Math.min(speeds.length - 1, speeds.findIndex(s => s.value === playbackSpeed) + 1)];
                    if (fasterSpeed) handleSpeedChange(fasterSpeed.value);
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [isMuted, volume, playbackSpeed]);

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
            showControlsTemporarily();
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    useEffect(() => {
        const handleMouseMove = () => {
            if (isFullscreen) {
                showControlsTemporarily();
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [isFullscreen]);

    useEffect(() => {
        return () => {
            if (controlsTimeoutRef.current) {
                clearTimeout(controlsTimeoutRef.current);
            }
        };
    }, []);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const timeUpdate = () => {
            setProgress((video.currentTime / video.duration) * 100);
            setCurrentTime(video.currentTime);
        };

        const loadedMetadata = () => {
            setDuration(video.duration);
        };

        const waiting = () => {
            setIsBuffering(true);
        };

        const playing = () => {
            setIsBuffering(false);
        };

        video.addEventListener('timeupdate', timeUpdate);
        video.addEventListener('loadedmetadata', loadedMetadata);
        video.addEventListener('waiting', waiting);
        video.addEventListener('playing', playing);

        return () => {
            video.removeEventListener('timeupdate', timeUpdate);
            video.removeEventListener('loadedmetadata', loadedMetadata);
            video.removeEventListener('waiting', waiting);
            video.removeEventListener('playing', playing);
        };
    }, []);

    return (
        <div className="video-player-container">
            <div 
                className={`video-player ${isBuffering ? 'buffering' : ''}`}
                onMouseEnter={() => setShowControls(true)}
                onMouseLeave={() => !isFullscreen && setShowControls(false)}
            >
                <video
                    ref={videoRef}
                    src={source}
                    poster={poster}
                    playsInline
                    autoPlay={false}
                    onLoadedData={onLoad}
                    onClick={handlePlayPause}
                />
                
                <div className={`video-controls ${showControls ? 'active' : ''}`}>
                    <div 
                        className="progress-container"
                        onClick={handleProgressClick}
                        onMouseDown={() => setIsDragging(true)}
                        onMouseUp={() => setIsDragging(false)}
                        onMouseLeave={() => setIsDragging(false)}
                        onMouseMove={handleProgressDrag}
                    >
                        <div className="progress-bar" ref={progressRef}>
                            <div 
                                className="progress-filled" 
                                style={{ width: `${progress}%` }}
                            >
                                <div className="progress-handle" />
                            </div>
                        </div>
                    </div>
                    
                    <div className="controls-main">
                        <div className="controls-left">
                            <button className="controls-button" onClick={handlePlayPause}>
                                {isPlaying ? <PauseIcon /> : <PlayIcon />}
                            </button>
                            <div className="volume-container">
                                <button className="controls-button" onClick={toggleMute}>
                                    <VolumeIcon muted={isMuted || volume === 0} />
                                </button>
                                <div 
                                    className="volume-slider"
                                    onClick={handleVolumeChange}
                                    onMouseMove={(e) => e.buttons && handleVolumeChange(e)}
                                >
                                    <div 
                                        className="volume-level" 
                                        style={{ width: `${(isMuted ? 0 : volume) * 100}%` }} 
                                    />
                                </div>
                            </div>
                            <span className="time-display">
                                {formatTime(currentTime)} / {formatTime(duration)}
                            </span>
                        </div>
                        
                        <div className="controls-right">
                            <div className="speed-control" ref={speedMenuRef}>
                                <button 
                                    className="controls-button" 
                                    onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                                    title="Playback Speed"
                                >
                                    <SpeedIcon />
                                    <span className="speed-label">{playbackSpeed}x</span>
                                </button>
                                {showSpeedMenu && (
                                    <div className="speed-menu">
                                        {speeds.map((speed) => (
                                            <button
                                                key={speed.value}
                                                className={`speed-menu-item ${speed.value === playbackSpeed ? 'active' : ''}`}
                                                onClick={() => handleSpeedChange(speed.value)}
                                            >
                                                {speed.label}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <button className="controls-button" onClick={toggleFullscreen}>
                                <FullscreenIcon />
                            </button>
                        </div>
                    </div>
                </div>
                
                <div className="buffering-indicator">
                    <span>Loading...</span>
                </div>
            </div>
        </div>
    );
};

export default VideoPlayer;