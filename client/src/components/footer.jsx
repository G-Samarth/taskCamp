import React from 'react';

const Footer = () => {
    return (
        <footer className="footer bg-dark">
            <div className="footer-1 my-1">
                <h1 className="logo">
                    <a href="landing.html">TaskCamp</a>
                </h1>
                <p>
                    <i className="fas fa-map-marker-alt p-1"></i>Mayur Vihar
                    Phase II, Delhi, India
                </p>
                <p>
                    <i className="fas fa-phone-alt p-1"></i>+91-543-123-4567
                </p>
                <p>
                    <i className="fas fa-envelope p-1"></i>example@taskcamp.com
                </p>
            </div>
            <div className="footer-2 my-1">
                <p>About Us</p>
                <p>What We Do</p>
                <p>FAQ</p>
            </div>
            <div className="footer-3 my-1">
                <p>Career</p>
                <p>Blog</p>
                <p>Contact Us</p>
            </div>
            <div className="footer-4 my-1">
                <div className="footer-4-icons">
                    <i className="fab fa-facebook-f"></i>
                    <i className="fab fa-twitter mr-3 ml-3"></i>
                    <i className="fab fa-instagram"></i>
                </div>
                <p>&copy; Copyright 2020 TaskCamp by Samarth Ghulyani</p>
            </div>
        </footer>
    );
};

export default Footer;
