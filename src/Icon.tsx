import React from 'react';
import logo from './logo.svg';
import './App.css';

export default class Icon extends React.Component<{ icon?: string, pack?: string }, {}>
{
  render()
  {
    const icon = this.props.icon ?? "bug";
    const pack = this.props.pack ?? "fas";
    return (
      <i className={pack + " fa-" + icon}></i>
    );
  }
}
