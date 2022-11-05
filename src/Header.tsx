import React from 'react';
import './App.css';

export default class Header extends React.Component
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
