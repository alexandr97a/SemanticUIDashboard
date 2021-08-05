import React, {Fragment} from "react";
import { Icon,Segment,Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
    }
  };
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  
  render() {
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
                      <Menu.Item
                        name='로그인'
                        onClick={this.handleItemClick}
                      />
                    </Menu.Menu>
                </Menu>
            </Segment>
          </Fragment>
      )
  };
};

export default Navbar;