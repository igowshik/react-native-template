import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Card } from 'react-native-paper';
import { Grid, Row } from 'native-base';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';

// Absolute imports
import { TextInput, NumberInput } from 'cnxapp/src/components/InputField';
import MultiSelect from 'cnxapp/src/components/MultiSelect';
import { CARD_BORDER_RADIUS } from 'cnxapp/src/utils/valueconstants';

import { selectUserDDList } from '../../selectors';

class OrganisationForm extends React.Component {
  OrgDetailsRender = () => (
    <View style={styles.parentView}>
      <Card elevation={4} style={styles.card}>
        <Card.Content>
          <Grid>
            <Row>
              <TextInput label="Name" name="org_name" required />
            </Row>
            <Row>
              <TextInput label="Short Name" name="org_short_name" required />
            </Row>
            <Row>
              <NumberInput
                label="Primary Phone Number"
                name="org_primary_phone"
              />
            </Row>
            <Row>
              <NumberInput
                label="Secondary Phone Number"
                name="org_secondary_phone"
              />
            </Row>
            <Row>
              <NumberInput label="Business Fax" name="org_business_fax" />
            </Row>
            <Row>
              <TextInput label="Web Address" name="org_web_address" />
            </Row>
            <Row style={{ marginTop: 20 }}>
              <MultiSelect
                label="Select users"
                items={this.props.userDDList}
                name="org_shared_users"
                searchText="Search users"
              />
            </Row>
          </Grid>
        </Card.Content>
      </Card>
    </View>
  );

  render() {
    return this.OrgDetailsRender();
  }
}

OrganisationForm.propTypes = {
  userDDList: PropTypes.array,
};
const mapStateToProps = createStructuredSelector({
  userDDList: selectUserDDList(),
});

const withConnect = connect(
  mapStateToProps,
  {},
);

const styles = StyleSheet.create({
  parentView: {
    margin: 10,
  },
  card: {
    borderRadius: CARD_BORDER_RADIUS,
  },
});

export default compose(withConnect)(OrganisationForm);
