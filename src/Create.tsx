import React from "react";
import Icon from "./Icon";

export default class Create extends React.Component
{
  render()
  {
    return (
      <div className="crud-user">
        <div className="create-icon"><Icon icon="plus" pack="far" /></div>
        <div className="create-text">
          Create New
        </div>
      </div>
    );
  }
}
