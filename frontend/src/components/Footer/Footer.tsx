import React from 'react';
import './index.css'; // Assuming you have a corresponding CSS file for styles
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import FacebookIcon from '@mui/icons-material/Facebook';

const Footer: React.FC = () => {
    return (
        <div className="pg-footer">
            <footer className="footer">
                <svg
                    className="footer-wave-svg"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1200 100"
                    preserveAspectRatio="none"
                >
                    <path
                        className="footer-wave-path"
                        d="M851.8,100c125,0,288.3-45,348.2-64V0H0v44c3.7-1,7.3-1.9,11-2.9C80.7,22,151.7,10.8,223.5,6.3
            C276.7,2.9,330,4,383,9.8c52.2,5.7,103.3,16.2,153.4,32.8C623.9,71.3,726.8,100,851.8,100z"
                    ></path>
                </svg>
                <div className="footer-content">
                    <div className="footer-content-column">
                        <div className="footer-menu">
                            <h2 className="footer-menu-name"> Get Started</h2>
                            <ul id="menu-get-started" className="footer-menu-list">
                                <li className="menu-item">
                                    <a href="#">Start</a>
                                </li>
                                <li className="menu-item">
                                    <a href="#">About Us</a>
                                </li>
                                <li className="menu-item">
                                    <a href="#">Our team</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="footer-content-column">
                        <div className="footer-menu">
                            <h2 className="footer-menu-name"> Company</h2>
                            <ul id="menu-company" className="footer-menu-list">
                                <li className="menu-item">
                                    <a href="#">Contact</a>
                                </li>
                                <li className="menu-item">
                                    <a href="#">News</a>
                                </li>
                                <li className="menu-item">
                                    <a href="#">Careers</a>
                                </li>
                            </ul>
                        </div>
                        <div className="footer-menu">
                            <h2 className="footer-menu-name"> Legal</h2>
                            <ul id="menu-legal" className="footer-menu-list">
                                <li className="menu-item">
                                    <a href="#">Privacy Notice</a>
                                </li>
                                <li className="menu-item">
                                    <a href="#">Terms of Use</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="footer-content-column">
                        <div className="footer-menu">
                            <h2 className="footer-menu-name"> Quick Links</h2>
                            <ul id="menu-quick-links" className="footer-menu-list">
                                <li className="menu-item">
                                    <a target="_blank" rel="noopener noreferrer" href="#">
                                        Support Center
                                    </a>
                                </li>
                                <li className="menu-item">
                                    <a target="_blank" rel="noopener noreferrer" href="#">
                                        Service Status
                                    </a>
                                </li>
                                <li className="menu-item">
                                    <a href="#">Security</a>
                                </li>
                                <li className="menu-item">
                                    <a href="#">Blog</a>
                                </li>
                                <li className="menu-item">
                                    <a href="#">Customers</a>
                                </li>
                                <li className="menu-item">
                                    <a href="#">Reviews</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="footer-content-column">
                        <div className="footer-call-to-action">
                            <h2 className="footer-call-to-action-title"> Let's Chat</h2>
                            <p className="footer-call-to-action-description"> Have a support question?</p>
                            <a className="footer-call-to-action-button button" href="#" target="_self">
                                Get in Touch
                            </a>
                        </div>
                        <div className="footer-call-to-action">
                            <h2 className="footer-call-to-action-title"> Call Us</h2>
                            <p className="footer-call-to-action-link-wrapper">
                                <a className="footer-call-to-action-link" href="tel:0124-64XXXX" target="_self">
                                    +91 9136885664
                                </a>
                            </p>
                        </div>
                    </div>
                    <div className="footer-social-links">
                        <svg className="footer-social-amoeba-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 236 54">
                            <path
                                className="footer-social-amoeba-path"
                                d="M223.06,43.32c-.77-7.2,1.87-28.47-20-32.53C187.78,8,180.41,18,178.32,20.7s-5.63,10.1-4.07,16.7-.13,15.23-4.06,15.91-8.75-2.9-6.89-7S167.41,36,167.15,33a18.93,18.93,0,0,0-2.64-8.53c-3.44-5.5-8-11.19-19.12-11.19a21.64,21.64,0,0,0-18.31,9.18c-2.08,2.7-5.66,9.6-4.07,16.69s.64,14.32-6.11,13.9S108.35,46.5,112,36.54s-1.89-21.24-4-23.94S96.34,0,85.23,0,57.46,8.84,56.49,24.56s6.92,20.79,7,24.59c.07,2.75-6.43,4.16-12.92,2.38s-4-10.75-3.46-12.38c1.85-6.6-2-14-4.08-16.69a21.62,21.62,0,0,0-18.3-9.18C13.62,13.28,9.06,19,5.62,24.47A18.81,18.81,0,0,0,3,33a21.85,21.85,0,0,0,1.58,9.08,16.58,16.58,0,0,1,1.06,5A6.75,6.75,0,0,1,0,54H236C235.47,54,223.83,50.52,223.06,43.32Z"
                            ></path>
                        </svg>
                        <a className="footer-social-link linkedin" href="#" target="_blank">
                            <span className="hidden-link-text">Linkedin</span>
                            <LinkedInIcon className="footer-social-icon" />
                        </a>
                        <a className="footer-social-link twitter" href="#" target="_blank">
                            <span className="hidden-link-text">Twitter</span>
                            <XIcon className="footer-social-icon" />
                        </a>
                        <a className="footer-social-link facebook" href="#" target="_blank">
                            <span className="hidden-link-text">Facebook</span>
                            <FacebookIcon className="footer-social-icon" />
                        </a>
                        <a className="footer-social-link instagram" href="#" target="_blank">
                            <span className="hidden-link-text">Instagram</span>
                            <InstagramIcon className="footer-social-icon" />
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;
