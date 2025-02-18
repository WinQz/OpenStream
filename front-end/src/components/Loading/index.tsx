import React, { useEffect, useState, useCallback } from 'react';
import './Loading.css';

const loadingTips = [
    "Did you know? You can press spacebar to play/pause.",
    "Use arrow keys to seek through the video.",
    "Double click to toggle fullscreen.",
    "Press M to toggle mute.",
    "Streaming in high quality...",
    "Loading your personalized experience...",
    "Preparing your content...",
    "Optimizing playback quality..."
];

interface LoadingProps {
    message?: string;
    delay?: number;
    isLoading?: boolean;
    onError?: () => void;
}

const Loading: React.FC<LoadingProps> = ({ 
    message = 'Loading...', 
    delay = 300,
    isLoading = true,
    onError
}) => {
    const [show, setShow] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentTip, setCurrentTip] = useState('');
    const [error, setError] = useState(false);

    const changeTip = useCallback(() => {
        const randomTip = loadingTips[Math.floor(Math.random() * loadingTips.length)];
        setCurrentTip(randomTip);
    }, []);

    useEffect(() => {
        if (isLoading) {
            // Initial tip
            changeTip();
            
            // Change tip every 4 seconds
            const tipInterval = setInterval(changeTip, 4000);
            
            // Progress animation
            const progressInterval = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 90) return prev;
                    return prev + Math.random() * 15;
                });
            }, 500);

            // Error timeout
            const errorTimeout = setTimeout(() => {
                setError(true);
                onError?.();
            }, 10000);

            return () => {
                clearInterval(tipInterval);
                clearInterval(progressInterval);
                clearTimeout(errorTimeout);
            };
        }
    }, [isLoading, changeTip, onError]);

    useEffect(() => {
        let timeout: NodeJS.Timeout;
        if (isLoading) {
            timeout = setTimeout(() => setShow(true), delay);
        }
        return () => clearTimeout(timeout);
    }, [isLoading, delay]);

    if (!isLoading && !show) return null;

    return (
        <div className={`loading-screen ${!isLoading ? 'fade-out' : ''}`}>
            <div className="loading-content">
                <div className="loading-logo">
                    <svg width="120" height="120" viewBox="0 0 80 80">
                        <path 
                            fill="var(--primary)"
                            d="M40 0C17.9 0 0 17.9 0 40s17.9 40 40 40 40-17.9 40-40S62.1 0 40 0zm0 72c-17.7 0-32-14.3-32-32S22.3 8 40 8s32 14.3 32 32-14.3 32-32 32z"
                        />
                        <path 
                            fill="var(--primary)"
                            d="M32 24v32l24-16z"
                        />
                    </svg>
                </div>
                
                <div className="loading-progress-container">
                    <div 
                        className="loading-progress-bar" 
                        style={{ width: `${progress}%` }}
                    />
                    <div className="loading-percentage">{Math.round(progress)}%</div>
                </div>

                <div className="loading-message">
                    {error ? (
                        <div className="loading-error">
                            <h3>Oops! Something went wrong.</h3>
                            <p>Please check your connection and try again.</p>
                            <button onClick={() => window.location.reload()}>
                                Retry
                            </button>
                        </div>
                    ) : (
                        <>
                            <h3>{message}</h3>
                            <p className="loading-tip">{currentTip}</p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Loading;
