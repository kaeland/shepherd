import React from 'react';
import {
  Grid, 
  Message
} from 'semantic-ui-react';

const AppGrid = (props) => {
  return (
    <Grid>

      {/*Confirm component and its content*/}
      {props.confirm &&
        props.confirm 
      }

      {/* Row */}
      {props.message && 
        <Grid.Row centered={true}>
          <Grid.Column width={14} computer={12} widescreen={8}>
            <Message color={props.messageColor || "blue"}>
              {props.message}
            </Message>
          </Grid.Column>
        </Grid.Row>
      }

      {/* Row */}
      {props.primaryButtons &&
        <Grid.Row centered={true}>
          <Grid.Column width={14} computer={12} widescreen={8}>
            {props.primaryButtons}
          </Grid.Column>
        </Grid.Row>
      }

      {/* Row */}
      {props.body && 
        <Grid.Row centered={true}>
          <Grid.Column width={14} computer={12} widescreen={8}>
            {props.body}
          </Grid.Column>
        </Grid.Row>
      }

    </Grid>
  );
};

export default AppGrid;