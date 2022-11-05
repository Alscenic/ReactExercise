import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class AppHeader extends Component
{
    render()
    {
        return (
            <header className="app-header">
                <div className="app-logo"></div>
                <a className="app-title" href="/">
                    Super Hero Co.
                </a>
            </header>
        );
    }
}

export default AppHeader;
