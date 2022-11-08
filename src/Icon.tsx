import React from 'react';
import logo from './logo.svg';
import './App.css';

export interface Props
{
  icon?: string;
  pack?: string;
  classNames?: string[];
}
export interface State { }

export default class Icon extends React.Component<Props, State>
{
  render()
  {
    const icon = this.props.icon ?? "bug";
    const pack = this.props.pack ?? "fas";
    const className = (this.props.classNames?.length ?? 0) > 0 ? (" " + this.props.classNames?.join(" ")) : "";
    const finalClassName = pack + " fa-" + icon + className;
    console.log(finalClassName);

    return (
      <i className={finalClassName}></i>
    );
  }
}
