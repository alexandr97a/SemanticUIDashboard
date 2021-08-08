import React, { Fragment } from "react";
import axios from 'axios';
import { Icon,Segment,Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      logout:[],
      didLoad: false
    }
  };
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  componentDidMount() {
    this._getData();
  }

  _getData = async () => {
      const res = await axios.get('/login');
      if (res.data[0] === undefined) {
          let cover = [];
          cover.push(res.data);
          return this.setState({ list: cover, didLoad: true })
      }
      const res1 = await axios.get('/logout');
      this.setState({ list: res.data, logout:res1.data });
  }
  
  render() {
    const user = this.state.list[0];
    // console.log('user',user)
      return(
          <Fragment>
            <Segment inverted color="blue" >
                <Menu size='huge' color="blue"  inverted >
                    <Menu.Item
                    name='gamepad'
                    as={Link} to='/'
                    onClick={this.handleItemClick}
                    >
                    <Icon name='dashcube' />
                        Dashboard
                    </Menu.Item>
                    <Menu.Menu position='right'>
                    {user === undefined ?
                      <Menu.Item
                      name='로그인'
                      as={Link} to='/login'
                      onClick={this.handleItemClick}
                  /> : <>
                    {/* <Menu.Item
                        onClick={this.handleItemClick}
                      >{user.user_name}</Menu.Item> */}
                    <Menu.Item
                      method="post" action="/logout"
                      onClick={this.handleItemClick}
                      >로그아웃</Menu.Item>
                      </>}
                    </Menu.Menu>
                </Menu>
            </Segment>
          </Fragment>
      )
  };
};

export default Navbar;