import React from 'react';
import {
  Grid, Message, Button,
  Segment, Container, Header,
  Form
} from 'semantic-ui-react';
import database from '../../firebase/firebase';

class EditDriverPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      seatsAvailable: '',
      make: '',
      model: '',
      color: '',
      driver: undefined
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
    const { church_id, driver_id } = this.props.match.params;
    const { firstName, lastName, seatsAvailable, make, model, color } = this.state;
    const driversRefString = `churches/${church_id}/drivers/${driver_id}`;
    const driversRef = database.ref(driversRefString);
    const driver = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      make: make.trim(),
      model: model.trim(),
      color: color.trim(),
      seatsAvailable
    };
    driversRef.update(driver);
    this.props.history.push(`/drivers/${church_id}`);
  }

  componentDidMount() {
    const { church_id, driver_id } = this.props.match.params;
    const driversRefString = `churches/${church_id}/drivers/${driver_id}`;
    const driversRef = database.ref(driversRefString);
    driversRef.once('value', (snapshot) => {
      const { firstName, lastName, seatsAvailable, make, model, color } = snapshot.val();
      this.setState(() => ({
        firstName,
        lastName,
        seatsAvailable,
        make,
        model,
        color
      }));
    });
  }

  render() {
    const { firstName, lastName, seatsAvailable, make, model, color } = this.state;

    return (
      <Grid>

        {/* Row */}
        <Grid.Row centered={true}>
          <Grid.Column width={14} computer={12} widescreen={8}>
            <Message color="blue">
              <p>Edit a driver below...</p>
            </Message>
          </Grid.Column>
        </Grid.Row>

        {/* Row */}
        <Grid.Row centered={true}>
          <Grid.Column width={14} computer={12} widescreen={8}>
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
                <Form.Input fluid label='Car Make' placeholder='Car Make' value={make} onChange={this.onMakeChange} />
                <Form.Input fluid label='Car Model' placeholder='Car Model' value={model} onChange={this.onModelChange} />
                <Form.Input fluid label='Car Color' placeholder='Car Color' value={color} onChange={this.onColorChange} />
              </Form.Group>

              <Button type="submit" primary>Add</Button>
            </Form>
          </Grid.Column>
        </Grid.Row>

      </Grid>
    );
  }
}

export default EditDriverPage;