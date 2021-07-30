import React, {Fragment} from "react";
import { Icon, Menu, Segment,Grid } from 'semantic-ui-react'

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
        activeItem: 'home'
    }
  };
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  
  render() {
    const { activeItem } = this.state
      return(
        <Fragment>
            <Segment inverted>
            <Menu size='huge'  inverted pointing>
                <Menu.Item
                name='gamepad'
                active={activeItem === 'gamepad'}
                onClick={this.handleItemClick}
                >
                <Icon name='dashcube' />
                    Dashboard
                </Menu.Item>
            </Menu>
            </Segment>
            <Grid>
                <Grid.Row columns={12}>

                </Grid.Row>
            </Grid>
        </Fragment>
      )
  };
};

export default Main;