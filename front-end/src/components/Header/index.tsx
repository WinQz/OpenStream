import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [searchFocused, setSearchFocused] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Don't show header on watch page
    if (location.pathname.startsWith('/watch/')) {
        return null;
    }

    return (
        <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
            <div className="header-content">
                <div className="header-left">
                    <Link to="/" className="logo">
                        OpenStream
                    </Link>
                    <nav className="main-nav">
                        <Link to="/">Home</Link>
                        <Link to="/movies">Movies</Link>
                        <Link to="/series">Series</Link>
                        <Link to="/my-list">My List</Link>
                    </nav>
                </div>
                <div className="header-right">
                    <div className="search">
                        <input 
                            type="text" 
                            placeholder="Search titles..."
                            onFocus={() => setSearchFocused(true)}
                            onBlur={() => setSearchFocused(false)}
                        />
                    </div>
                    <div className="user-menu">
                        <img 
                            src="https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg?t=st=1739869437~exp=1739873037~hmac=235c616fe748130dc6cc2d11e7db682cf67f6bbe23bc4f8026375cb87ff3b1aa&w=826" 
                            alt="User avatar"
                        />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;