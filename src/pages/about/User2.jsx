import { Component } from "react";

class User2 extends Component {
  constructor(props) {
    super(props);
    // console.log(this.props.name + "child constructor is called!");
  }

  componentDidMount() {
    // console.log(this.props.name + "child component did mount");
  }

  render() {
    // console.log(this.props.name + "render method of child is called ");

    return (
      <div>
        <h1></h1>
      </div>
    );
  }
}

export default User2;
