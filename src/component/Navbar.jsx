import React, {Fragment} from "react";
import { Icon,Segment,Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
        activeItem: 'home',
    }
  };
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  
  render() {
    const { activeItem } = this.state
      return(
          <Fragment>
            <Segment inverted color="blue" >
                <Menu size='huge' color="blue"  inverted >
                    <Menu.Item
                    name='gamepad'
                    as={Link} to='/'
                    active={activeItem === 'gamepad'}
                    onClick={this.handleItemClick}
                    >
                    <Icon name='dashcube' />
                        Dashboard
                    </Menu.Item>
                </Menu>
            </Segment>
          </Fragment>
      )
  };
};

export default Navbar;