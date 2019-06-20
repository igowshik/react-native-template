import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
// Absolute imports
import { TextInput, NumberInput } from 'cnxapp/src/components/InputField';
import { Card } from 'react-native-paper';
import { Grid, Row } from 'native-base';
import * as colors from 'cnxapp/src/utils/colorsConstants';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import MultiSelect from 'cnxapp/src/components/MultiSelect';
import Dropdown from '../../../../components/Dropdown';
import { selectUserDDList } from '../../selectors';
// import ScrollView from '../../../../components/ScrollView';
class OrgDetails extends React.Component {
  state = {
    managers: [],
  };

  // componentDidMount() {
  //   const { userDDList } = this.props;
  //   const mappedManagers = [];
  //   userDDList.forEach(user => {
  //     mappedManagers.push({ label: user.label, value: user.value });
  //   });
  //   this.setState({ managers: mappedManagers });
  // }

  OrgDetails1 = () => (
    <View style={styles.parentView}>
      <Card elevation={4} style={styles.card}>
        <Card.Content>
          {/* <ScrollView contentContainerStyle={{ flex: 1 }}> */}
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
                required
              />
            </Row>
            <Row>
              <NumberInput
                label="Secondary Phone Number"
                name="org_secondary_phone"
                required
              />
            </Row>
            <Row>
              <NumberInput
                label="Business Fax"
                name="org_business_fax"
                required
              />
            </Row>
            <Row>
              <TextInput label="Web Address" name="org_web_address" required />
            </Row>
            <Row>
              {/* <Dropdown
                label="Managers"
                name="org_managers"
                data={this.state.managers}
                required
              /> */}
              <MultiSelect
                label="Select users"
                items={this.props.userDDList}
                name="org_shared_users"
                searchText="Search users"
              />
            </Row>
          </Grid>
          {/* </ScrollView> */}
        </Card.Content>
      </Card>
    </View>
  );

  render() {
    return this.OrgDetails1();
  }
}

OrgDetails.propTypes = {
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
  placeRight: {
    flex: 1,
    marginBottom: 10,
    flexDirection: 'row',
  },
  placeRightPhone: {
    flex: 1,
    marginBottom: 10,
    flexDirection: 'row',
    // width: '33%',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
  },
  parentView: {
    margin: 10,
  },
  card: {
    borderTopColor: colors.ORANGE,
    borderTopWidth: 2,
  },
});

export default compose(withConnect)(OrgDetails);
