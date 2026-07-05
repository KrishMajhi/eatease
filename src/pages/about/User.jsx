import React, { Component } from "react";

class User extends Component {
  constructor(props) {
    super(props);
    // console.log(this.props.name+"child constructor is called!");
  }

  // componentDidMount() {
  //   // console.log(this.props.name+" child component did mount");
  // }

  render() {
    // console.log(this.props.name+" render method of child is called ");

    return (
      <div>
        <div> this is child component</div>
      </div>
    );
  }
}
export default User;
