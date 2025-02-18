import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { mockVideos } from '../../data/mockData';
import VideoPlayer from '../../components/VideoPlayer';
import VideoHeader from '../../components/VideoHeader';
import Loading from '../../components/Loading';
import './Watch.css';

interface WatchParams {
    id: string;
}

const Watch: React.FC = () => {
    const { id } = useParams<WatchParams>();
    const [video, setVideo] = useState(mockVideos[0]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Find the video in mock data
        const foundVideo = mockVideos.find(v => v.id === id);
        if (foundVideo) {
            setVideo(foundVideo);
        }
        // Simulate loading
        setTimeout(() => setIsLoading(false), 1000);
    }, [id]);

    if (isLoading) {
        return <Loading message="Preparing your video..." />;
    }

    return (
        <div className="watch-page">
            <VideoHeader />
            <VideoPlayer 
                source={video.url}
                poster={video.thumbnail}
            />
            <div className="video-info">
                <h1>{video.title}</h1>
                <p>{video.description}</p>
            </div>
        </div>
    );
};

export default Watch;