import React from 'react';
import logo from './logo.svg';
import './App.css';
import Icon from "./Icon";

class Header extends React.Component
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

export default Header;
