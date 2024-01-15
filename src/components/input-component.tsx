import React from "react";
import { InputProps } from "../types/types";

class Input extends React.Component<InputProps> {
  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="Search location..."
          value={this.props.location}
          onChange={this.props.onChangeLocation}
        />
      </div>
    );
  }
}

export default Input;
