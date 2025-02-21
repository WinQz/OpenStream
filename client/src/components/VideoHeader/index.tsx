import React from 'react';
import { useHistory } from 'react-router-dom';
import './VideoHeader.css';

const VideoHeader: React.FC = () => {
    const history = useHistory();

    return (
        <div className="video-header">
            <button 
                className="back-button" 
                onClick={() => history.goBack()}
            >
                <svg viewBox="0 0 24 24" width="24" height="24">
                    <path 
                        fill="currentColor" 
                        d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"
                    />
                </svg>
                Back
            </button>
        </div>
    );
};

export default VideoHeader;
