import React from 'react';
import {
  Grid, Message, Button,
  Segment, Container, Header,
  Form
} from 'semantic-ui-react';

export default class ChurchForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.props.onChurchNameChange(e.target.value);
  }

  handleSubmit(e) {
    this.props.onChurchNameSubmit(e);
  }

  render() {
    const church = this.props.church;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Field>
          <label>Church</label>
          <input placeholder="Church's Name" type="text" value={church} onChange={this.handleChange} />
        </Form.Field>
        <Button type="submit" primary>Add</Button>
      </Form>
    );
  }
}
