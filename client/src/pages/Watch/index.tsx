import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { fetchVideoById } from '../../services/api';
import { MovieDetails } from '../../types';
import VideoPlayer from '../../components/VideoPlayer';
import VideoHeader from '../../components/VideoHeader';
import Loading from '../../components/Loading';
import './Watch.css';

interface WatchParams {
    id: string;
}

const Watch: React.FC = () => {
    const { id } = useParams<WatchParams>();
    const history = useHistory();
    const [video, setVideo] = useState<MovieDetails | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadVideo = async () => {
            try {
                setIsLoading(true);
                const data = await fetchVideoById(id);
                setVideo(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load video');
                console.error('Error loading video:', err);
            } finally {
                setIsLoading(false);
            }
        };

        loadVideo();
    }, [id]);

    if (isLoading) {
        return <Loading message="Preparing your video..." />;
    }

    if (error || !video) {
        return (
            <div className="error-container">
                <h2>Error loading video</h2>
                <p>{error}</p>
                <button onClick={() => history.push('/')}>Return Home</button>
            </div>
        );
    }

    return (
        <div className="watch-page">
            <VideoHeader />
            <div className="video-player-container">
                <VideoPlayer 
                    source={video.url}
                    poster={video.thumbnail}
                />
            </div>
        </div>
    );
};

export default Watch;