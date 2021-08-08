import React, { Fragment } from "react";
import { Button, Form, Grid, Header, Message, } from 'semantic-ui-react'
import Navbar from "./Navbar";

class Login extends React.Component {
  state = {
      value: ""
  };
  password(e) {
    let value = e.target.value;
    value = value.replace(/^[^A-Za-z0-9]*$/gi, "");
    this.setState({
      value
    })
    console.log(this.state.value)
  }

  
  render() {
      return(
        <Fragment>
          <Navbar/>
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as='h2' color='blue' textAlign='center'>
                    Log-in to your account
                    </Header>
                    <Form size='large' method="post" action="/login">
                      <Form.Input type="email" fluid icon='user' iconPosition='left' name="username" placeholder='E-mail address' />
                      <Form.Input
                      fluid
                      icon='lock'
                      iconPosition='left'
                      name="password"
                      placeholder='Password'
                      type='password'
                      value={this.state.value}
                      onChange={(e) => this.password(e)}
                      />
                    <Button color='blue' fluid size='large' type="submit">
                      Login
                    </Button>
                    </Form>
                    <Message>
                    New to us? <a href='/signup'>Sign Up</a>
                    </Message>
                </Grid.Column>
            </Grid>
        </Fragment>
      )
  };
};

export default Login;