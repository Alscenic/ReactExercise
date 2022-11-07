import React from 'react';
import Header from './Header';
import Create from "./Create";

export default class App extends React.Component
{
  render()
  {
    return (
      <div className="app-container">
        <Header />
        <div className="app">
          <h1>User Accounts</h1>
          <Create />
        </div>
      </div>
    );
  }
}
