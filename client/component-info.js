import React, { Component } from "react";

class Info extends Component {
  state = {
    info: ""
  }

  componentDidMount = () => {
    var url = "/shopify/api/shop.json";

    fetch(url, { credentials: "include" })
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          info: res
        });
      })
  }

  render() {
    return (
      <pre style={{"overflow": "scroll", "whiteSpace": "normal"}}>
        <code>
          {JSON.stringify(this.state.info)}
        </code>
      </pre>
    );
  }
}

export default Info;
