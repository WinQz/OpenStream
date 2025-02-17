import React from 'react';
import './Loading.css';

interface LoadingProps {
    message?: string;
}

const Loading: React.FC<LoadingProps> = ({ message = 'Loading...' }) => {
    return (
        <div className="loading-screen">
            <div className="loading-content">
                <div className="loading-logo">
                    <svg width="80" height="80" viewBox="0 0 80 80">
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
                <div className="loading-spinner"></div>
                <p>{message}</p>
            </div>
        </div>
    );
};

export default Loading;
