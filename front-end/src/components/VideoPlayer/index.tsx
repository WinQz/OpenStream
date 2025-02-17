import React from 'react';
import './VideoPlayer.css';

interface VideoPlayerProps {
    source: string;
    controls?: boolean;
    poster?: string;
    onLoad?: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ 
    source, 
    controls = true, 
    poster,
    onLoad 
}) => {
    return (
        <div className="video-player-container">
            <div className="video-player">
                <video
                    src={source}
                    controls={controls}
                    poster={poster}
                    playsInline
                    autoPlay={false}
                    onLoadedData={onLoad}
                />
            </div>
        </div>
    );
};

export default VideoPlayer;