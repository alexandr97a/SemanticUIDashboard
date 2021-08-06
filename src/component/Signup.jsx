import React, { Fragment } from "react";
import axios from 'axios';
import { Button, Form, Grid, Header, Message, } from 'semantic-ui-react'


class Signup extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        user_name:"",
        user_email: "",
        user_password:"",
        user_phone: "",
        user_birthday:"",
    }
    };
    
  _nameAdd(e) {
    this.setState({ user_name : e.target.value })
  }
  _emailAdd(e) {
    this.setState({ user_email : e.target.value })
  }
  _passwordAdd(e) {
    this.setState({ user_password : e.target.value })
  }
  _phoneAdd(e) {
    this.setState({ user_phone : e.target.value })
  }
  _birthdayAdd(e) {
    this.setState({ user_birthday : e.target.value })
  }

  _addUser = async(e) => {
    const { user_name, user_email, user_password, user_phone, user_birthday } = this.state;
    e.preventDefault();

    const res = await axios('/add/user', {
      method : 'POST',
      data : { 
        'user_name' : user_name,
        'user_email' : user_email,
        'user_password': user_password,
        'user_phone' : user_phone,
        'user_birthday' : user_birthday
     },
      headers: new Headers()
    });
    console.log('user_password',user_password)

    if(res.data) {
      alert('회원가입 되었습니다.');
      return window.location.href="/login";
    }
  }
  
  render() {
      return(
          <Fragment>
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as='h2' color='blue' textAlign='center'>
                    Create your account
                    </Header>
                      <Form size='large'  onSubmit={this._addUser}>
                        <Form.Input fluid icon='user' iconPosition='left' placeholder='이름' onChange={(e) => this._nameAdd(e)}/>
                        <Form.Input fluid icon='mail' iconPosition='left' placeholder='이메일'  onChange={(e) => this._emailAdd(e)}/>
                        <Form.Input
                        fluid
                        icon='lock'
                        iconPosition='left'
                        placeholder='비밀번호'
                        type='password'
                        onChange={(e) => this._passwordAdd(e)}
                          />
                        <Form.Input
                        fluid
                        icon='phone square'
                        iconPosition='left'
                        placeholder='전화번호'
                        type='text'
                        onChange={(e) => this._phoneAdd(e)}
                          />
                        <Form.Input
                        fluid
                        icon='lock'
                        iconPosition='left'
                        placeholder='생일'
                        type='text'
                        onChange={(e) => this._birthdayAdd(e)}
                          />
                        <Button type="submit" color='blue' fluid size='large'>
                        Sign in
                        </Button>
                    </Form>
                    <Message>
                      Have account? <a href='/login'>Login</a>
                    </Message>
                </Grid.Column>
            </Grid>
        </Fragment>
      )
  };
};

export default Signup;