import React from 'react';
import logo from './logo.svg';
import './App.css';

export default class Icon extends React.Component<{ icon?: string }, {}>
{
  render()
  {
    const icon = this.props.icon ?? "bug";
    return (
      <i className={"fas fa-" + icon}></i>
    );
  }
}
