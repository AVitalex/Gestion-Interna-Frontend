import React, { useState } from 'react';
import './Sidebar.css';

const Sidebar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleLogoClick = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
            <div className="logo" onClick={handleLogoClick}>
                <i className="fas fa-bars" />
            </div>
            <div className={`sidebar-content ${isSidebarOpen ? 'open' : ''}`}>
                <a href="#">Home</a>
                <a href="#">Perfil</a>
                <a href="#">Reclamos</a>
                <a href="#">Logout</a>
                <a href="#">Marketplace</a>
                <a href="#">Finance</a>
                <div className="club-logo"></div>
            </div>
        </div>
    );
};

export default Sidebar;