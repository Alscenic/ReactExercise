import React from "react";
import Icon from "./Icon";

export enum ModalResult
{
  Submit,
  Cancel,
}

export interface SubmitCallback
{
  (result: ModalResult): void;
}

export interface Props { onSubmit: SubmitCallback }
export interface State { nameRef: React.RefObject<HTMLInputElement>, emailRef: React.RefObject<HTMLInputElement> }

export class Component extends React.Component<Props, State>
{
  constructor(props: Props)
  {
    super(props);
    this.state = {
      nameRef: React.createRef(),
      emailRef: React.createRef()
    }
  }

  render()
  {
    return (
      <div className="modal-background">
        <div className="modal new-user">
          <h1>Create New User</h1>
          {/* name input */}
          <div className="input-area">
            <input ref={this.state.nameRef} type="text" placeholder=" " className="text-input expand-width block" />
            <label>Name</label>
          </div>
          {/* email input */}
          <div className="input-area">
            <input ref={this.state.emailRef} type="text" placeholder=" " className="text-input expand-width block" />
            <label>Email</label>
          </div>
          <div className="flex">
            <div className="flex-expand"></div>
            <button className="button button-submit" onClick={() =>
            {
              this.props.onSubmit(ModalResult.Submit);
            }}>
              <Icon pack="far" icon="check" /> Apply</button>
            <button className="button button-submit" onClick={() =>
            {
              this.props.onSubmit(ModalResult.Cancel);
            }}>
              <Icon pack="far" icon="times" /> Cancel</button>
            <div className="flex-expand"></div>
          </div>
          <div className="modal-outline"></div>
        </div>
      </div>
    );
  }
}
