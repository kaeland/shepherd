import React from 'react';
import {
  Button,
  Form,
  Confirm
} from 'semantic-ui-react';
import AppGrid from './AppGrid';
import database from '../../firebase/firebase';

class EditRiderPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      location: '',
      open: false
    };

    this.onFirstNameChange = this.onFirstNameChange.bind(this);
    this.onLastNameChange = this.onLastNameChange.bind(this);
    this.onLocationChange = this.onLocationChange.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Confirm Modal 
  show = () => this.setState({ open: true })
  handleConfirm = (e) => this.onDelete(e)
  handleCancel = () => this.setState({ open: false })
  // --- //

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

  onDelete(e) {
    e.preventDefault();
    const { church_id, driver_id, rider_id } = this.props.match.params;
    const driversSeatsString = `churches/${church_id}/drivers/${driver_id}/seatsAvailable`;
    const driversSeatsRef = database.ref(driversSeatsString);
    const ridersRefString = `churches/${church_id}/drivers/${driver_id}/riders/${rider_id}`;
    const ridersRef = database.ref(ridersRefString);
    driversSeatsRef.transaction((currentSeatsAvailable) => {
      ridersRef.remove();
      return currentSeatsAvailable + 1;
    });
    this.props.history.push(`/drivers/${church_id}`);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { firstName, lastName, location } = this.state;
    const { church_id, driver_id, rider_id } = this.props.match.params;
    const ridersRefString = `churches/${church_id}/drivers/${driver_id}/riders/${rider_id}`;
    const ridersRef = database.ref(ridersRefString);
    const rider = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      location: location.trim()
    };
    ridersRef.update(rider);
    this.props.history.push(`/drivers/${church_id}`);
  }


  componentDidMount() {
    const { church_id, driver_id, rider_id } = this.props.match.params;
    const ridersRefString = `churches/${church_id}/drivers/${driver_id}/riders/${rider_id}`;
    const ridersRef = database.ref(ridersRefString);
    ridersRef.once('value', (snapshot) => {
      const { firstName, lastName, location } = snapshot.val();
      this.setState(() => ({
        firstName,
        lastName,
        location
      }));
    });
  }

  renderConfirm() {
    const { firstName, open } = this.state;
    return (
      <Confirm
        open={open}
        onCancel={this.handleCancel}
        onConfirm={this.handleConfirm}
        content={`Are you sure you want to delete ${firstName}?`}
      />
    );
  }

  renderForm() {
    const { firstName, lastName, location } = this.state;
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
          <label>Pickup Location</label>
          <input placeholder="Student Center, Starbucks, etc..." type="text" value={location} onChange={this.onLocationChange} />
        </Form.Field>

        <Button type="submit" primary>Add</Button>
        <Button type="button" color="red" onClick={this.show}>Delete Rider</Button>
      </Form>
    );
  }

  render() {
    const message = <p>Edit a rider below...</p>;
    const confirm = this.renderConfirm();
    const body = this.renderForm();
    return (
      <AppGrid 
        confirm={confirm}
        message={message}
        body={body}
      />
    );
  }
}

export default EditRiderPage;