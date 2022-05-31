import React from "react";
import { connect } from "react-redux";
import { authenticate } from "../store";
import { Button, Form, Image } from "react-bootstrap";
/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const { name, displayName, handleSubmit, error } = props;

  return (
    <div>

      <Form className="login-signup-form" onSubmit={handleSubmit} name={name}>
        <Image src="/productImages/WatermelonHero.jpg" roundedCircle className="signupImg" alt="Responsive image"/>
        <div className="signup-area-div">
          <h1 className="moontime display-1">{name[0] === "l" ? "Login" : "Sign Up"}</h1>
        <Form.Group>
          <Form.Label htmlFor="username">Username</Form.Label>
          <Form.Control  placeholder="Username" name="username" type="username" type="text" />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        {name === "signup" ? (
          <Form.Group controlId="formBasicEmail">
            <Form.Label htmlFor="email">Email</Form.Label>
            <Form.Control placeholder="Email" name="email" type="email" />
          </Form.Group>
        ) : null}
        <div>
          <Button variant="outline-secondary" type="submit">
            {displayName}
          </Button>
        </div>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </Form>
    </div>
  );
};

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: "login",
    displayName: "Login",
    error: state.auth.error,
  };
};

const mapSignup = (state) => {
  return {
    name: "signup",
    displayName: "Sign Up",
    error: state.auth.error,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      let userInfo = {};
      userInfo.username = evt.target.username.value;
      userInfo.password = evt.target.password.value;
      if (formName === "signup") {
        userInfo.email = evt.target.email.value;
      }
      dispatch(authenticate(formName, userInfo));
    },
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);
