import React, { Component } from "react";
import Switch from "react-switch";

class DayNightSwitcher extends Component {
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
      <div
        style={{
          position: "fixed",
          zIndex: "1000",
          right: "1.5rem",
          top: "1.5rem",
        }}
      >
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
                paddingRight: 2,
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
                paddingRight: 2,
              }}
            >
              ⭐
            </div>
          }
        />
      </div>
    );
  }
}

export default DayNightSwitcher;
