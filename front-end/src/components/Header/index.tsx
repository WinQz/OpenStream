import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
            <div className="header-content">
                <div className="header-left">
                    <Link to="/" className="logo">OpenStream</Link>
                    <nav className="main-nav">
                        <Link to="/">Home</Link>
                        <Link to="/movies">Movies</Link>
                        <Link to="/series">Series</Link>
                        <Link to="/my-list">My List</Link>
                    </nav>
                </div>
                <div className="header-right">
                    <div className="search">
                        <input type="text" placeholder="Search..." />
                    </div>
                    <div className="user-menu">
                        <img src="/default-avatar.png" alt="User" />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;