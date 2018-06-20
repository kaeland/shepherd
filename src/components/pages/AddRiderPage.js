import React from 'react';
import {
  Grid, Message, Button,
  Segment, Container, Header,
  Form
} from 'semantic-ui-react';
import AppGrid from './AppGrid';
import database from '../../firebase/firebase';

class AddRiderPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      location: ''
    };

    this.onFirstNameChange = this.onFirstNameChange.bind(this);
    this.onLastNameChange = this.onLastNameChange.bind(this);
    this.onLocationChange = this.onLocationChange.bind(this);
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

  onLocationChange(e) {
    const location = e.target.value;
    this.setState(() => ({ location }));
  }

  handleSubmit(e) {
    e.preventDefault();
    const { church_id, driver_id } = this.props.match.params;
    const driversSeatsString = `churches/${church_id}/drivers/${driver_id}/seatsAvailable`;
    const driversSeatsRef = database.ref(driversSeatsString);
    const ridersRefString = `churches/${church_id}/drivers/${driver_id}/riders`;
    const ridersRef = database.ref(ridersRefString);
    const rider = {
      firstName: this.state.firstName.trim(),
      lastName: this.state.lastName.trim(),
      location: this.state.location.trim()
    };
    driversSeatsRef.transaction((currentSeatsAvailable) => {
      if (currentSeatsAvailable > 0) {
        ridersRef.push(rider);
        return currentSeatsAvailable - 1;
      }
    });
    this.setState(() => ({
      firstName: '',
      lastName: '',
      location: ''
    }));
    this.props.history.push(`/drivers/${church_id}`);
  }

  renderForm() {
    const { firstName, lastName, location } = this.state;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Field>
          <label>First Name</label>
          <input
            placeholder="First Name"
            type="text"
            value={firstName}
            onChange={this.onFirstNameChange}
          />
        </Form.Field>

        <Form.Field>
          <label>Last Name</label>
          <input
            placeholder="Last Name"
            type="text"
            value={lastName}
            onChange={this.onLastNameChange}
          />
        </Form.Field>

        <Form.Field>
          <label>Pickup Location</label>
          <input
            placeholder="Student Center, Starbucks, etc..."
            type="text"
            value={location}
            onChange={this.onLocationChange}
          />
        </Form.Field>

        <Button type="submit" primary>Add</Button>
      </Form>
    );
  }

  render() {
    const message = <p>Add a rider below...</p>;
    const body = this.renderForm();
    return (
      <AppGrid message={message} body={body} />
    );
  }
}

export default AddRiderPage;