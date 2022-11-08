import React from "react";
import Icon from "./Icon";
import User from "./User";
import UserContainer from "./UserContainer";

export interface Props
{
  User: User;
  NameInputRef: React.RefObject<HTMLInputElement>;
  EmailInputRef: React.RefObject<HTMLInputElement>;
  Container: UserContainer;
}

export default class UserComponent extends React.Component<Props>
{
  constructor(props: Props)
  {
    super(props);

    this.renderBase = this.renderBase.bind(this);
    this.renderView = this.renderView.bind(this);
    this.renderEdit = this.renderEdit.bind(this);
  }

  renderBase(inner: React.ReactElement, outer: React.ReactElement)
  {
    let avatarIcon = <img src={this.props.User.avatar ?? ""} />;

    if (!this.props.User.avatar)
    {
      avatarIcon = (
        <Icon icon="user" />
      );
    }

    const avatar: React.ReactElement = <div className="crud-user-avatar">{avatarIcon}</div>;

    return (
      <div className="crud-user">
        <div className="crud-user-data">
          <React.Fragment>
            {avatar}
            {inner}
          </React.Fragment>
        </div>
        {outer}
      </div>
    );
  }

  renderView()
  {
    const deleteThisUser = async () =>
    {
      const response = await fetch("https://reqres.in/api/users/" + (this.props.User.id ?? -1), { method: "delete" });
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
            {(this.props.User.name ?? "") === "" ? <Icon icon="question" /> : this.props.User.name}
          </div>
          <div className="crud-user-email">
            {(this.props.User.email ?? "") === "" ? <Icon icon="question" /> : this.props.User.email}
          </div>
        </div>
        <div className="crud-user-buttons">
          <button key={10} className="icon-button" tabIndex={0} onClick={
            () =>
            {
              this.props.Container.selectUser(this.props.User);
            }
          }>
            <Icon icon="pen" />
          </button>
          <button key={11} className="icon-button" tabIndex={0} onClick={() => { deleteThisUser() }}>
            <Icon icon="trash" />
          </button>
        </div>
      </>,
      <></>
    );
  }

  renderEdit()
  {
    let user = new User(this.props.User);
    user.name = this.props.NameInputRef.current?.value ?? "";
    user.email = this.props.EmailInputRef.current?.value ?? "";
    const hasBeenChanged = (user.name !== this.props.User.name) || (user.email !== this.props.User.email);

    const isValid = user.name !== "" && user.email !== "" && hasBeenChanged;

    // const saveIcon = isValid ? "check" : "ban";
    const saveIcon = "check";

    const onInputUpdate = () =>
    {
      this.forceUpdate();
    };

    return this.renderBase(
      <React.Fragment>
        <div className="crud-user-fields">
          <input onChange={onInputUpdate} key={0} placeholder="Name" className="crud-user-name" type="text" defaultValue={this.props.User.name} ref={this.props.NameInputRef} />
          <input onChange={onInputUpdate} key={1} placeholder="Email" className="crud-user-email" type="text" defaultValue={this.props.User.email} ref={this.props.EmailInputRef} />
        </div>
        <div className="crud-user-buttons hold">
          <button key={20} className="icon-button" tabIndex={0} onClick={
            () =>
            {
              if (!isValid)
              {
                this.props.Container.selectUser(User.Null);
                return;
              }

              (async () =>
              {
                const response = await fetch("https://reqres.in/api/users/" + user.id, { method: "put", body: JSON.stringify({ name: user.name, email: user.email }) });
                const json = await response.json();
                // reqres.in is being weird, keeps returning only "updatedAt" and
                // not the data I throw at it, so let's fake a successful put

                // here's what I was trying to do:
                // user = new User(json);

                this.props.Container.editUser(user);
                this.props.Container.selectUser(User.Null);

                return;
              })();
            }
          }>
            <Icon icon={saveIcon} />
          </button>
          <button key={21} className="icon-button" tabIndex={0} onClick={
            () =>
            {
              this.props.Container.selectUser(User.Null);
            }
          }>
            <Icon icon="times" />
          </button>
        </div>
      </React.Fragment>,
      <></>
    );
  }

  render()
  {
    return (this.props.Container.editId === this.props.User.id) ? this.renderEdit() : this.renderView();
  }
}
