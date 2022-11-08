import React from "react";
import Icon from "./Icon";
import User from "./User";
import UserContainer from "./UserContainer";

export interface Props
{
  User: User;
  NameInputRef: React.RefObject<HTMLInputElement>;
  Container: UserContainer;
}

export default class UserComponent extends React.Component<Props>
{
  renderBase(inner: React.ReactElement)
  {
    let avatar: React.ReactElement = <div className="crud-user-avatar"><img src={this.props.User.avatar ?? ""} /></div>;
    if (!this.props.User.avatar)
    {
      avatar = <></>;
    }

    return (
      <div className="crud-user">
        <div className="crud-user-data">
          {avatar}
          {inner}
        </div>
      </div>
    );
  }

  renderView()
  {
    const deleteThisUser = async () =>
    {
      const response = await fetch("https://reqres.in/api/users/" + (this.props.User.id ?? -1), { method: "DELETE" });
      switch (response.status)
      {
        case 204:
          this.props.Container.deleteUser(this.props.User);
          break;
        default:
          alert("There was a problem deleting this user.");
          break;
      }
    };

    return this.renderBase(
      <>
        <div className="crud-user-fields">
          <div className="crud-user-name">
            {this.props.User.name ?? ""}
          </div>
          <div className="crud-user-email">
            {this.props.User.email ?? ""}
          </div>
        </div>
        <div className="crud-user-buttons">
          <button key={10} className="icon-button" tabIndex={0} onClick={
            () =>
            {
              this.props.Container.selectUser(this.props.User);
            }
          }>
            <Icon key={10} icon="pen" />
          </button>
          <button key={11} className="icon-button" tabIndex={0} onClick={() => { deleteThisUser() }}>
            <Icon key={11} icon="trash" />
          </button>
        </div>
      </>
    );
  }

  renderEdit()
  {
    return this.renderBase(
      <>
        <div className="crud-user-fields">
          <input className="crud-user-name" type="text" defaultValue={this.props.User.name} ref={this.props.NameInputRef} />
          <div className="crud-user-email">
            {this.props.User.email ?? ""}
          </div>
        </div>
        <div className="crud-user-buttons hold">
          <button key={20} className="icon-button" tabIndex={0} onClick={
            () =>
            {
              let user = this.props.User;
              user.name = this.props.NameInputRef.current?.value;
              this.props.Container.editUser(user);
              this.props.Container.selectUser(User.Null);
            }
          }>
            <Icon key={20} icon="check" />
          </button>
          <button key={21} className="icon-button" tabIndex={0} onClick={
            () =>
            {
              this.props.Container.selectUser(User.Null);
            }
          }>
            <Icon key={21} icon="times" />
          </button>
        </div>
      </>
    );
  }

  render()
  {
    return (this.props.Container.editId === this.props.User.id) ? this.renderEdit() : this.renderView();
  }
}
