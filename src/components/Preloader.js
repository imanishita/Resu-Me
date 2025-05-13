import React from 'react';
import './Preloader.css';

const Preloader = () => {
    return (
        <div className="preloader">
            <h1 className="brand-name1"><i className=""></i>  ResuMe</h1>
            <div className="spinner"></div>
            <div className="welcome-text">
                <h1>Welcome to ResuMe!</h1>
                <h3 className='preloaderh3'></h3>
            </div>
        </div>
    );
};

export default Preloader;
