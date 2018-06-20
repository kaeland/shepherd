import React from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Segment, 
  Transition, 
  Confirm
} from 'semantic-ui-react';
import AppGrid from './AppGrid';
import sizeMe from 'react-sizeme';
import database from '../../firebase/firebase';
import _ from 'lodash';

class DriversPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      churchName: undefined,
      drivers: [],
      activeKey: '1',
      showRiders: undefined,
      showAll: false,
      open: false,
      firstName: undefined,
      driver_id: undefined
    };

    this.handleSelect = this.handleSelect.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  // Confirm Modal 
  show = (firstName, driver_id) => this.setState({ firstName: firstName, driver_id: driver_id, open: true })
  handleConfirm = () => this.onDelete()
  handleCancel = () => this.setState({ open: false, firstName: undefined })
  // --- //

  handleSelect(activeKey) {
    this.setState({ activeKey });
  }

  onDelete() {
    const church_id = this.props.match.params.church_id;
    const driversRefString = `churches/${church_id}/drivers/${this.state.driver_id}`;
    const driversRef = database.ref(driversRefString);
    driversRef.remove();
    this.setState({ open: false, firstName: undefined });
  }


  componentDidMount() {
    const church_id = this.props.match.params.church_id;
    const driversRefString = `churches/${church_id}/drivers`;
    const churchNameRef = database.ref(`churches/${church_id}/name`);
    const driversRef = database.ref(driversRefString);
    driversRef.orderByChild('firstName').on('value', (snapshot) => {
      const drivers = [];
      snapshot.forEach((childSnapshot) => {
        drivers.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        });
      });
      this.setState(() => ({ drivers }));
    });
    churchNameRef.once('value').then((snapshot) => {
      const churchName = snapshot.val();
      this.setState(() => ({ churchName }));
    });
  }

  renderRiders(riders, church_id, driver_id) {
    if (riders) {
      return (
        <span>
          {
            riders.map(rider =>
              <Link to={`/drivers/${church_id}/edit_rider/${driver_id}/${rider.id}`}>
                <span>{rider.name}</span>
              </Link>
            ).reduce((prev, curr) => [prev, ' - ', curr])
          }
        </span>
      );
    }
    // const ridersArray = riders.map((rider) => {
    //   console.log(rider, 'Rider');
    //   return (
    //     rider.name
    //   );
    // });
    // return ridersArray.join(' - ');
    // return <Link>{riders[0].name}</Link>
  }

  renderDrivers() {
    const church_id = this.props.match.params.church_id;
    const { push } = this.props.history;
    const { width } = this.props.size;
    const driversList = this.state.drivers.map(({
      id,
      firstName,
      lastName,
      riders = undefined,
      seatsAvailable = undefined,
      make = undefined,
      model = undefined,
      color = undefined
    }, index) => {

      const ridersArray = []
      if (riders) {
        _.forEach(riders, (value, key) => {
          const rider = {};
          const fullName = value.firstName + ' ' + value.lastName;
          rider.name = fullName;
          rider.id = key;
          ridersArray.push(rider);
        });
      };

      return (
        <div key={id} style={{ marginBottom: '15px' }}>
          <Segment.Group>
            <Segment clearing>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
                <div style={{ fontSize: '18px', fontWeight: 500 }}>
                  <Button
                    style={{ backgroundColor: 'white', textDecoration: 'underline', padding: '0px', marginBottom: '10px' }}
                    onClick={
                      (e) => {
                        if (this.state.showRiders === undefined) {
                          this.setState({ showRiders: firstName })
                        } else if (this.state.showRiders) {
                          this.setState({ showRiders: undefined })
                        }
                      }
                    }
                  >
                    {firstName + ' ' + lastName}
                  </Button>
                </div>
                <Button.Group size="tiny" fluid={width < 450 ? true : false}>
                  <Button positive onClick={(e) => push(`/drivers/${church_id}/add_rider/${id}`)}>Ride</Button>
                  <Button.Or />
                  <Button onClick={(e) => push(`/drivers/${church_id}/edit/${id}`)}>Edit</Button>
                  <Button.Or />
                  <Button color="red" onClick={(e) => this.show(firstName, id)}>Delete</Button>
                </Button.Group>
              </div>
            </Segment>
            {(this.state.showRiders === firstName || this.state.showAll === true) &&

              <Transition visible={this.state.showRiders || this.state.showAll} transitionOnMount unmountOnHide animation='slide down' duration={500}>
                <Segment>
                  {(make && model && color) &&
                    <p><i>{firstName} drives a {color} {make} {model}</i></p>
                  }
                  <p>Seats Left: {seatsAvailable}</p>
                  <p>Riders: {_.isEmpty(ridersArray) ? "There are no riders" : this.renderRiders(ridersArray, church_id, id)}</p>
                </Segment>
              </Transition>

            }
          </Segment.Group>
        </div>
      );


    });
    return driversList;
  }

  renderMessage() {
    const { churchName = undefined, drivers } = this.state;
    return (
      <div style={{ overflow: 'auto' }}>
        {_.isEmpty(drivers)
          ? (
            <p>
              Whoa! It looks like there are no drivers headed to
              {churchName ? churchName : 'a church'} this week.
              Add a new driver if you'd like.
            </p>
          )
          : (
            <p>
              Add to, or edit the list of drivers headed to
              {churchName ? churchName : 'a church'} this week.
            </p>
          )
        }
      </div>
    );
  }

  renderPrimaryButtons() {
    const { push } = this.props.history;
    const { church_id } = this.props.match.params;
    const { showAll } = this.state;
    return (
      <div>
        <Button
          floated="right"
          onClick={() => this.setState({ showAll: !showAll })}
        >
          {showAll === false ? 'Show All Riders' : 'Hide Riders'}
        </Button>
        <Button
          floated="right"
          primary
          onClick={(e) => push(`/drivers/${church_id}/add`)}
        >
          Add Driver
    </Button>
      </div>
    );
  }

  renderConfirm() {
    const { firstName, open } = this.state;
    const confirmContent = `Are you sure you want to delete ${firstName}?`;
    return (
      <Confirm
          open={open}
          onCancel={this.handleCancel}
          onConfirm={this.handleConfirm}
          content={confirmContent}
        />
    );
  }

  render() {
    // console.log('state:', this.state, 'props:', this.props, 'DriversPage');
    const message = this.renderMessage();
    const primaryButtons = this.renderPrimaryButtons();
    const confirm = this.renderConfirm();
    const body = this.renderDrivers();
    return (
      <AppGrid
        confirm={confirm}
        message={message}
        primaryButtons={primaryButtons}
        body={body}
      />
    );
  }
};

export default sizeMe()(DriversPage);
