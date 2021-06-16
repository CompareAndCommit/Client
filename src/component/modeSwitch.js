import React, { Component } from "react";
import Switch from "react-switch";

class SwitchExample extends Component {
  constructor() {
    super();
    this.state = { checked: false };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(checked) {
    this.setState({ checked });
    this.props.setIsDay(checked);
  }

  render() {
    return (
      <label>
        <span>Switch with default style</span>
        <Switch 
            onChange={this.handleChange} 
            checked={this.state.checked} 
            offColor="#000"
            onColor="skyblue"
            checkedIcon={
                <div
                    style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    fontSize: 20,
                    paddingRight: 2
                    }}
                >
                    ☀️
                </div>
            }
            uncheckedIcon={
                <div
                    style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    fontSize: 20,
                    paddingRight: 2
                    }}
                >
                    ⭐
                </div>
            }
            
        />
      </label>
    );
  }
}

export default SwitchExample