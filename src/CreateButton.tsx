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
export interface State { modalOpen: boolean }

export default class CreateButton extends React.Component<Props, State>
{
  modalRef = React.createRef<CreateUserModal.Component>();

  constructor(props: Props)
  {
    super(props);

    this.state = {
      modalOpen: false
    };
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
                this.props.createUser(new User({
                  name: this.modalRef.current?.nameRef.current?.value,
                  email: this.modalRef.current?.emailRef.current?.value
                }));
                break;
              case CreateUserModal.ModalResult.Cancel:
                break;
            }

            this.setState({ modalOpen: false });
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
