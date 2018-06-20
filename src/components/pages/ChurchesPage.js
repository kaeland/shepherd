import React from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Segment 
} from 'semantic-ui-react';
import AppGrid from './AppGrid';
import sizeMe from 'react-sizeme'
import database from '../../firebase/firebase';
import _ from 'lodash';


class ChurchesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      churches: []
    };
  }

  componentDidMount() {
    const churchesRef = database.ref('churches');
    churchesRef.orderByChild('name').on('value', (snapshot) => {
      const churches = [];
      snapshot.forEach((childSnapshot) => {
        churches.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        });
      });

      this.setState(() => ({ churches }));
    });
  }


  renderChurches() {
    const churchList = this.state.churches.map(({ name, id }) => {
      const { push } = this.props.history;
      const { width } = this.props.size;
      return (
        <Segment key={id} clearing>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', overflow: 'auto' }}>
            <div style={{ fontSize: '18px', fontWeight: 500, marginBottom: '5px' }}>
              <p style={{ display: 'flex' }}>{name}</p>
            </div>
            <Button.Group size="tiny" fluid={width < 450 ? true : false}>
              <Button positive onClick={(e) => push(`/drivers/${id}`)}>Find a Ride</Button>
              <Button.Or />
              <Button onClick={(e) => push(`/edit/church/${id}`)}>Edit</Button>
            </Button.Group>
          </div>
        </Segment>
      );
    });
    return churchList;
  }

  renderMessage() {
    return ( _.isEmpty(this.state.churches)
    ? (
      <p>
        Welcome to Shepherd! Use the button below to add the
        church you attend to the Shepherd database.
      </p>
    )
    : <p>Find a ride with the churches below...</p>
    );
  }

  render() {
    const { push } = this.props.history;
    const message = this.renderMessage();
    const primaryButtons = (
      <Button primary floated="right" onClick={(e) => push(`/add/church`)}>
        Add
      </Button>
    );
    return (
      <AppGrid 
        message={message}
        messageColor="blue"
        primaryButtons={primaryButtons}
        body={this.renderChurches()}
      />
    );
  }
}

export default sizeMe()(ChurchesPage);