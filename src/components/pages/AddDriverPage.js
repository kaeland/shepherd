import React from 'react';
import {
  Grid, Message, Button,
  Segment, Container, Header,
  Form
} from 'semantic-ui-react';
import AppGrid from './AppGrid';
import database from '../../firebase/firebase';

export default class AddDriverPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      seatsAvailable: '',
      make: '',
      model: '',
      color: ''
    };

    this.onFirstNameChange = this.onFirstNameChange.bind(this);
    this.onLastNameChange = this.onLastNameChange.bind(this);
    this.onSeatsAvailable = this.onSeatsAvailable.bind(this);
    this.onMakeChange = this.onMakeChange.bind(this);
    this.onModelChange = this.onModelChange.bind(this);
    this.onColorChange = this.onColorChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onFirstNameChange(e) {
    const firstName = e.target.value;
    this.setState(() => ({ firstName }));
  }

  onLastNameChange(e) {
    const lastName = e.target.value;
    this.setState(() => ({ lastName }));
  }

  onSeatsAvailable(e) {
    const seatsAvailable = e.target.value;
    this.setState(() => ({ seatsAvailable }));
  }

  onMakeChange(e) {
    const make = e.target.value;
    this.setState(() => ({ make }));
  }

  onModelChange(e) {
    const model = e.target.value;
    this.setState(() => ({ model }));
  }

  onColorChange(e) {
    const color = e.target.value;
    this.setState(() => ({ color }))
  }

  handleSubmit(e) {
    e.preventDefault();
    const church_id = this.props.match.params.church_id;
    const { firstName, lastName, seatsAvailable, make, model, color } = this.state;
    const driversRefString = `churches/${church_id}/drivers`;
    const driversRef = database.ref(driversRefString);
    const driver = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      seatsAvailable: seatsAvailable.trim(),
      make: make.trim(),
      model: model.trim(),
      color: color.trim()
    };
    driversRef.push(driver);
    this.setState(() => ({
      firstName: '',
      lastName: '',
      seatsAvailable: '',
      make: '',
      model: '',
      color: ''
    }));
    this.props.history.push(`/drivers/${church_id}`);
  }

  renderForm() {
    const { firstName, lastName, seatsAvailable, make, model, color } = this.state;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Field>
          <label>First Name</label>
          <input placeholder="First Name" type="text" value={firstName} onChange={this.onFirstNameChange} />
        </Form.Field>

        <Form.Field>
          <label>Last Name</label>
          <input placeholder="Last Name" type="text" value={lastName} onChange={this.onLastNameChange} />
        </Form.Field>

        <Form.Field>
          <label>Seats Available</label>
          <input placeholder="Seats Available" type="text" value={seatsAvailable} onChange={this.onSeatsAvailable} />
        </Form.Field>

        <Form.Group widths='equal'>
          <Form.Input fluid label='Car Color' placeholder='Blue' value={color} onChange={this.onColorChange} />
          <Form.Input fluid label='Car Make' placeholder='Ford' value={make} onChange={this.onMakeChange} />
          <Form.Input fluid label='Car Model' placeholder='Escort' value={model} onChange={this.onModelChange} />
        </Form.Group>

        <Button type="submit" primary>Add</Button>
      </Form>
    );
  }

  render() {
    // console.log('state:', this.state, 'props:', this.props, 'AddDriverPage');
    const message = <p>Add a driver below...</p>;
    const body = this.renderForm();
    return (
      <AppGrid
        message={message}
        body={body}
      />
    );
  }
}