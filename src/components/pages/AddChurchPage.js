import React from 'react';
import {
  Grid, Message, Button,
  Segment, Container, Header,
  Form
} from 'semantic-ui-react';
import AppGrid from './AppGrid';
import ChurchForm from '../common/ChurchForm';
import database from '../../firebase/firebase';

export default class AddChurchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      church: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(church) {
    this.setState({ church });
  }

  handleSubmit(e) {
    e.preventDefault();
    const churchesRef = database.ref('churches');
    const church = {
      name: this.state.church.trim()
    };
    churchesRef.push(church);
    this.setState({ church: '' });
    this.props.history.push('/');
  }

  render() {
    // console.log('state:', this.state, 'props:', this.props, 'AddChurchPage');
    const message = <p>Add a church below...</p>;
    const body = (
      <ChurchForm
        church={this.state.church}
        onChurchNameChange={this.handleChange}
        onChurchNameSubmit={this.handleSubmit}
      />
    );
    return (
      <AppGrid message={message} body={body} />
    );
  };
};