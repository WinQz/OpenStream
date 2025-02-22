import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { fetchVideos } from '../../services/api';
import { MovieDetails } from '../../types';
import Loading from '../../components/Loading';
import './Home.css';

const Home: React.FC = () => {
    const [videos, setVideos] = useState<MovieDetails[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showInfo, setShowInfo] = useState(false);
    const [featuredVideo, setFeaturedVideo] = useState<MovieDetails | null>(null);
    const history = useHistory();
    const [currentPage, setCurrentPage] = useState({ trending: 0, continue: 0 });

    const handleLoadError = () => {
        console.error('Failed to load content');
    };

    useEffect(() => {
        const loadVideos = async () => {
            try {
                setIsLoading(true);
                const data = await fetchVideos();
                setVideos(data);
                setFeaturedVideo(data[0]);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load videos');
            } finally {
                setIsLoading(false);
            }
        };

        loadVideos();
    }, []);

    const handlePlayClick = (e: React.MouseEvent, videoId: string) => {
        e.preventDefault();
        history.push(`/watch/${videoId}`);
    };

    const toggleInfo = () => {
        setShowInfo(prev => !prev);
    };

    const handleMoreInfoClick = (video: MovieDetails) => {
        setFeaturedVideo(video);
        setShowInfo(true);
        // Smooth scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const formatDuration = (seconds: number): string => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        return `${hours}h ${minutes}m`;
    };

    const handleRowNav = (direction: 'prev' | 'next', rowId: string) => {
        const row = document.getElementById(rowId);
        if (!row) return;

        const itemWidth = row.offsetWidth;
        const scrollAmount = direction === 'next' ? itemWidth : -itemWidth;
        
        row.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });

        setCurrentPage(prev => ({
            ...prev,
            [rowId]: prev[rowId as keyof typeof prev] + (direction === 'next' ? 1 : -1)
        }));
    };

    const renderVideoRow = (videos: MovieDetails[], rowId: string, title: string) => (
        <section className="video-section">
            <h2>{title}</h2>
            <button 
                className="row-nav prev" 
                onClick={() => handleRowNav('prev', rowId)}
                disabled={currentPage[rowId as keyof typeof currentPage] === 0}
            >
                ‹
            </button>
            <div className="video-row" id={rowId}>
                {videos.map(video => (
                    <div key={video.id} className="video-card">
                        <img src={video.thumbnail} alt={video.title} />
                        <div className="video-info">
                            <div className="video-info-text">
                                <h3>{video.title}</h3>
                                <p>{video.description}</p>
                            </div>
                            <div className="video-buttons">
                                <button 
                                    className="play-button-overlay"
                                    onClick={(e) => handlePlayClick(e, video.id)}
                                >
                                    ▶ Play
                                </button>
                                <button 
                                    className="info-button-overlay"
                                    onClick={() => handleMoreInfoClick(video)}
                                >
                                    ⓘ More Info
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <button 
                className="row-nav next" 
                onClick={() => handleRowNav('next', rowId)}
                disabled={currentPage[rowId as keyof typeof currentPage] >= Math.ceil(videos.length / 3) - 1}
            >
                ›
            </button>
        </section>
    );

    return (
        <>
            <Loading 
                isLoading={isLoading} 
                message="Loading your entertainment..." 
                onError={handleLoadError}
            />
            <div className="home">
                <div 
                    className={`featured ${showInfo ? 'show-info' : ''}`}
                    style={{ 
                        backgroundImage: `url(${featuredVideo?.thumbnail})`,
                        backgroundPosition: 'center 20%'
                    }}
                >
                    <div className="featured-content">
                        {!showInfo ? (
                            <>
                                <h1>{featuredVideo?.title}</h1>
                                <p>{featuredVideo?.description}</p>
                                <div className="featured-buttons">
                                    <button 
                                        className="play-btn"
                                        onClick={(e) => handlePlayClick(e, featuredVideo?.id || '')}
                                    >
                                        ▶ Play Now
                                    </button>
                                    <button 
                                        className="more-info-btn"
                                        onClick={toggleInfo}
                                    >
                                        ⓘ More Info
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="featured-info">
                                <div className="featured-info-header">
                                    <h1>{featuredVideo?.title}</h1>
                                    <button 
                                        className="close-info-btn"
                                        onClick={toggleInfo}
                                    >
                                        ✕
                                    </button>
                                </div>
                                <div className="featured-info-content">
                                    <div className="info-metadata">
                                        <span className="year">{featuredVideo?.releaseYear}</span>
                                        <span className="duration">{formatDuration(featuredVideo?.duration || 0)}</span>
                                        <span className="rating">{featuredVideo?.rating}</span>
                                    </div>
                                    <p className="extended-description">
                                        {featuredVideo?.extendedDescription || featuredVideo?.description}
                                    </p>
                                    <div className="info-details">
                                        <p><strong>Starring:</strong> {featuredVideo?.cast.join(', ')}</p>
                                        <p><strong>Directors:</strong> {featuredVideo?.directors.join(', ')}</p>
                                        <p><strong>Genre:</strong> {featuredVideo?.genres.join(', ')}</p>
                                    </div>
                                </div>
                                <div className="featured-buttons">
                                    <button 
                                        className="play-btn"
                                        onClick={(e) => handlePlayClick(e, featuredVideo?.id || '')}
                                    >
                                        ▶ Play Now
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="content">
                    {renderVideoRow(videos, 'trending', 'Trending Now')}
                    {renderVideoRow(videos.slice(0, 8), 'continue', 'Continue Watching')}
                </div>
            </div>
        </>
    );
};

export default Home;