import React from "react";
import * as CreateUserModal from "./CreateUserModal";
import Icon from "./Icon";
import User from "./User";
import * as UserContainer from "./UserContainer";

export interface CreateUserCallback
{
  (user: User): void;
}

export interface Props { createUser: CreateUserCallback }
export interface State { user: User, modalOpen: boolean }

export default class CreateButton extends React.Component<Props, State>
{
  modalRef = React.createRef<CreateUserModal.Component>();

  constructor(props: Props)
  {
    super(props);

    this.state = {
      user: User.Null,
      modalOpen: false
    };
  }

  componentDidMount(): void
  {
    if (this.state.user != User.Null)
    {
      this.props.createUser(this.state.user);
    }
  }

  render()
  {
    const modalWindow = this.state.modalOpen
      ? (
        <CreateUserModal.Component onSubmit={
          (result) =>
          {
            switch (result)
            {
              case CreateUserModal.ModalResult.Submit:

                break;
              case CreateUserModal.ModalResult.Cancel:
                this.setState({ modalOpen: false });
                break;
            }
          }
        } ref={this.modalRef} />
      )
      : (
        <></>
      );

    return (
      <>
        <div className="create-user button" tabIndex={0} onClick={
          () =>
          {
            this.setState({ modalOpen: true });
          }
        }>
          <div className="icon-button"><Icon icon="plus" pack="far" /></div>
          <div className="create-text">
            Create New
          </div>
        </div>
        {modalWindow}
      </>
    );
  }
}
