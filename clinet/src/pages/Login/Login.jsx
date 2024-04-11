import React, { Component } from "react";

export class Login extends Component {
  render() {
    return (
      <div>
        <form type='submit' method='post'>
          <label htmlFor='username'>Username</label>
          <input id='username' type='text' />

          <label htmlFor='password'>Password</label>
          <input id='password' type='password' />

          <button>Login</button>
        </form>
      </div>
    );
  }
}

export default Login;
