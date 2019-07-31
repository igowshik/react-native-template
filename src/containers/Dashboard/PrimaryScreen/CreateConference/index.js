import React from 'react';
import { View } from 'react-native';
import { Card } from 'react-native-paper';
import { Grid, Row } from 'native-base';
import { TextInput } from 'cnxapp/src/components/InputField';
import Dropdown from 'cnxapp/src/components/Dropdown';

class CreateConference extends React.Component {
  state = {};

  render() {
    return (
      <View>
        <Card>
          <Card.Content>
            <Grid>
              <Row>
                <TextInput
                  label="First Name"
                  name="ind_first_name"
                  required
                  helperText="First name is required"
                />
              </Row>
              <Row>
                <Dropdown
                  label="Title"
                  name="ind_title"
                  data="not ready yet."
                />
              </Row>
            </Grid>
          </Card.Content>
        </Card>
      </View>
    );
  }
}

export default CreateConference;
