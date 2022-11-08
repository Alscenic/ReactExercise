import React from "react";
import UserComponent from "./UserComponent";
import UserContainer from "./UserContainer";

export default class User
{
  static Null: User = new User();

  constructor(user?: User)
  {
    if (user == undefined) { return; }

    this.id ??= user.id;
    this.first_name ??= user.first_name;
    this.last_name ??= user.last_name;
    this.email ??= user.email;
    this.avatar ??= user.avatar;
    this.name ??= user.name;

    this.name = this.name ?? ([this.first_name, this.last_name].join(" "));
    this.name = this.name.trim();
  }

  id?: number;
  first_name?: string;
  last_name?: string;
  email?: string;
  avatar?: string;
  name?: string;
}
