import React, { Component } from 'react';
import { Menu, Header } from 'semantic-ui-react';

export default class Navigation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeItem: undefined
    };
  }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
    this.props.history.push("/");
  }

  handleSuggestionsClick = (e, { name }) => {
    this.setState({ activeItem: name });
  
  }


  render() {
    const { activeItem } = this.state;
    // console.log(this.state, 'state', this.props, 'props');
    return (
      <Menu color="blue" inverted>
        <Menu.Item onClick={this.handleItemClick}>
          <Header as='h3' inverted>Shepherd</Header>
        </Menu.Item>
        <Menu.Menu position='right'>
          <Menu.Item name='churches' active={activeItem === 'churches'} onClick={this.handleItemClick}>
            Churches
          </Menu.Item>
          <Menu.Item href="https://goo.gl/forms/zDQAsjGHNfUUkTtq2" target="_blank">
            Suggestions
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}