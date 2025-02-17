import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { mockVideos } from '../../data/mockData';
import './Home.css';

const Home: React.FC = () => {
    const [videos] = useState(mockVideos);
    const featured = mockVideos[0];
    const history = useHistory();

    const handlePlayClick = (e: React.MouseEvent, videoId: string) => {
        e.preventDefault();
        history.push(`/watch/${videoId}`);
    };

    return (
        <div className="home">
            <div 
                className="featured" 
                style={{ 
                    backgroundImage: `url(${featured.thumbnail})`,
                    backgroundPosition: 'center 20%'
                }}
            >
                <div className="featured-content">
                    <h1>{featured.title}</h1>
                    <p>{featured.description}</p>
                    <div className="featured-buttons">
                        <button 
                            className="play-btn"
                            onClick={(e) => handlePlayClick(e, featured.id)}
                        >
                            ▶ Play Now
                        </button>
                        <button className="more-info-btn">
                            ⓘ More Info
                        </button>
                    </div>
                </div>
            </div>

            <div className="content">
                <section className="video-section">
                    <h2>Trending Now</h2>
                    <div className="video-row">
                        {videos.map(video => (
                            <div key={video.id} className="video-card">
                                <img src={video.thumbnail} alt={video.title} />
                                <div 
                                    className="play-button-overlay"
                                    onClick={(e) => handlePlayClick(e, video.id)}
                                >▶</div>
                                <div className="video-info">
                                    <h3>{video.title}</h3>
                                    <p>{video.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="video-section">
                    <h2>Continue Watching</h2>
                    <div className="video-row">
                        {videos.slice(0, 4).map(video => (
                            <div key={video.id} className="video-card">
                                <img src={video.thumbnail} alt={video.title} />
                                <div 
                                    className="play-button-overlay"
                                    onClick={(e) => handlePlayClick(e, video.id)}
                                >▶</div>
                                <div className="video-info">
                                    <h3>{video.title}</h3>
                                    <p>{video.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Home;