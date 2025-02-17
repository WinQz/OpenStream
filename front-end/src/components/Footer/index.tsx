import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3>OpenStream</h3>
                    <p>Watch unlimited movies and TV shows anywhere, anytime.</p>
                </div>
                <div className="footer-section">
                    <h4>Navigation</h4>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/movies">Movies</Link></li>
                        <li><Link to="/series">Series</Link></li>
                        <li><Link to="/my-list">My List</Link></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h4>Legal</h4>
                    <ul>
                        <li><Link to="/privacy">Privacy Policy</Link></li>
                        <li><Link to="/terms">Terms of Service</Link></li>
                        <li><Link to="/contact">Contact Us</Link></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h4>Connect</h4>
                    <div className="social-links">
                        <Link to="#" className="social-link">Facebook</Link>
                        <Link to="#" className="social-link">Twitter</Link>
                        <Link to="#" className="social-link">Instagram</Link>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2023 OpenStream. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
