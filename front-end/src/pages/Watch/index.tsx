import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import VideoPlayer from '../../components/VideoPlayer';
import Loading from '../../components/Loading';
import './Watch.css';

interface WatchParams {
    id: string;
}

const Watch: React.FC = () => {
    const { id } = useParams<WatchParams>();
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);

    const handleVideoLoad = () => {
        setIsLoading(false);
    };

    return (
        <div className="watch-page">
            {isLoading && <Loading message="Preparing your video..." />}
            <button className="return-button" onClick={() => history.push('/')}>
                ← Back
            </button>
            <div className="video-player-container">
                <VideoPlayer 
                    source={`https://example.com/videos/${id}.mp4`}
                    controls={true}
                    onLoad={handleVideoLoad}
                />
            </div>
        </div>
    );
};

export default Watch;