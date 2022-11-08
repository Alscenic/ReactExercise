import React from 'react';
import Header from './Header';
import CreateButton from "./CreateButton";
import UserContainer from "./UserContainer";

export default class App extends React.Component
{
  userContainerRef: React.RefObject<UserContainer> = React.createRef<UserContainer>();

  render()
  {
    return (
      <div className="app-container" >
        <Header />
        <div className="app" id="app">
          <h1>User Accounts</h1>
          <UserContainer selfRef={this.userContainerRef} />
        </div>
      </div>
    );
  }
}
