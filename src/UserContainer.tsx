import React from "react";
import CreateButton from "./CreateButton";
import User from "./User";
import UserComponent from "./UserComponent";
import UserResponse from "./UserResponse";

export interface Props
{
  selfRef: React.RefObject<UserContainer>
}
export interface State { }

export default class UserContainer extends React.Component<Props, State>
{
  userList: User[] = [];
  editId: number = -1;
  lastPop: number = 0;

  componentDidMount(): void
  {
    this.populateList();
  }

  componentWillUnmount(): void
  {
    this.clearUsers();
  }

  populateList()
  {
    (async () =>
    {
      const thisPop = ++this.lastPop;
      const addPage = (async (page: number) =>
      {
        const response = await fetch("https://reqres.in/api/users?page=" + page);
        const json = await response.json();
        const usersResponse: UserResponse = Object.assign(new UserResponse(), json);

        usersResponse.data?.forEach((user, i, arr) =>
        {
          if (thisPop === this.lastPop)
          {
            this.createUser(user);
          }
        });

        return;
      });

      this.clearUsers();

      const response = await fetch("https://reqres.in/api/users");
      const json = await response.json();
      const usersResponse: UserResponse = Object.assign(new UserResponse(), json);

      for (let i = 0; i < (usersResponse.total_pages ?? 0); i++)
      {
        if (thisPop === this.lastPop)
        {
          await addPage(i + 1);
          console.log(Date.now().toFixed(0));
        }
      }

      return;
    })();
  }

  createUser(user: User)
  {
    this.userList = this.userList.concat(new User(user));

    this.forceUpdate();
  }

  deleteUser(user: User)
  {
    const newUsers = this.userList;
    const index = newUsers?.findIndex(p => p.id === user.id) ?? -1;
    if (index >= 0)
    {
      newUsers?.splice(index, 1);
      this.setState({ userList: newUsers });
    }

    this.forceUpdate();
  }

  selectUser(user: User)
  {
    this.editId = (user.id ?? -1);

    this.forceUpdate();
  }

  editUser = (user: User) =>
  {
    const index = this.userList.findIndex((p, i, arr) => p.id == user.id);
    if (index >= 0)
    {
      this.userList[index] = new User(user);
    }

    this.forceUpdate();
  }

  clearUsers()
  {
    this.userList = [];

    this.forceUpdate();
  }

  render()
  {
    let userComponents: React.ReactElement[] = [];

    if (this.userList)
    {
      for (let i = 0; i < this.userList.length; i++)
      {
        const user = this.userList[i];
        userComponents.push(
          <UserComponent
            key={i}
            User={user}
            NameInputRef={React.createRef<HTMLInputElement>()}
            Container={this}
          />
        );
      }
    }

    return (
      <>
        <CreateButton createUser={this.createUser} />
        <div style={{ height: "3rem" }}></div>
        <div className="users-container">
          {userComponents}
        </div>
      </>
    );
  }
}
