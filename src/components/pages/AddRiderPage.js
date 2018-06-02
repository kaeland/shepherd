import React from 'react';
import {
  Grid, Message, Button,
  Segment, Container, Header,
  Form
} from 'semantic-ui-react';
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

  render() {
    return (
      <Grid>

        {/* Row */}
        <Grid.Row centered={true}>
          <Grid.Column width={14} computer={12} widescreen={8}>
            <Message color="blue">
              <p>Add a rider below...</p>
            </Message>
          </Grid.Column>
        </Grid.Row>

        {/* Row */}
        <Grid.Row centered={true}>
          <Grid.Column width={14} computer={12} widescreen={8}>
            <Form onSubmit={this.handleSubmit}> 

              <Form.Field>
                <label>First Name</label>
                <input placeholder="First Name" type="text" value={this.state.firstName} onChange={this.onFirstNameChange} />
              </Form.Field>

              <Form.Field>
                <label>Last Name</label>
                <input placeholder="Last Name" type="text" value={this.state.lastName} onChange={this.onLastNameChange} />
              </Form.Field>

              <Form.Field>
                <label>Pickup Location</label>
                <input placeholder="Student Center, Starbucks, etc..." type="text" value={this.state.location} onChange={this.onLocationChange} />
              </Form.Field>

              <Button type="submit" primary>Add</Button>
            </Form>
          </Grid.Column>
        </Grid.Row>

      </Grid>
    );
  }
}

export default AddRiderPage;