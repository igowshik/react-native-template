import React from 'react';
import { Form } from 'native-base';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import { Divider, RadioButton } from 'react-native-paper';
// Absolute imports
import {
  TextInput,
  NumberInput,
  RadioInput,
} from 'cnxapp/src/components/InputField';

import Dropdown from '../../../components/Dropdown';
import { HorizDivider } from '../../../components/Dividers';

// Relative imports
import { INDIVIDUAL } from '../constants';

const data = [
  {
    value: 'Home',
  },
  {
    value: 'Office',
  },
];
const title = [
  { value: 'Dr.' },
  { value: 'Miss' },
  { value: 'Mr.' },
  { value: 'Mrs.' },
  { value: 'Ms.' },
  { value: 'Prof.' },
];
const suffix = [
  { value: 'I' },
  { value: 'II' },
  { value: 'III' },
  { value: 'Jr.' },
  { value: 'Sr.' },
];
class CreateConexionForm1 extends React.Component {
  state = {
    value: '',
  };

  renderIndividualForm = () => (
    <View style={{ marginBottom: 30 }}>
      <View style={styles.row}>
        <View style={styles.placeRight}>
          <TextInput label="First Name" name="first_name" required />
          <TextInput label="Middle Name" name="middle_name" required />
        </View>
        <View style={styles.placeRight}>
          <TextInput label="Last Name" name="last_name" required />
          <TextInput label="initial" name="initial" required />
        </View>
        <View style={styles.placeRight}>
          <View style={{ flex: 1 }}>
            <Dropdown label="Title" name="title" required data={title} />
          </View>
          <View style={{ flex: 1 }}>
            <Dropdown label="Suffix" name="suffix" required data={suffix} />
          </View>
        </View>
        <View style={styles.placeRight}>
          <View style={{ flex: 1 }}>
            <Dropdown
              label="Select Oraganisation"
              name="select_oraganisation"
              required
              data={title} // organisation data to be filled
            />
          </View>
          {/* <View style={{ flex: 1 }}> */}
          <TextInput label="Job Title" name="job_title" required />
          {/* </View> */}
        </View>
        <View style={styles.placeRight}>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{ width: '20%' }}>
              <Dropdown label="+91" name="country_code" required data={title} />
            </View>
            <View style={(styles.container, { flex: 1, marginTop: 4 })}>
              <TextInput
                label="Primary Mobile"
                name="primary_mobile"
                required
              />
            </View>
          </View>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{ width: '20%' }}>
              <Dropdown
                label="+91"
                name="country_code"
                required
                style={{ width: '10%' }}
                data={title}
              />
            </View>
            <View style={(styles.container, { flex: 1, marginTop: 4 })}>
              <TextInput
                label="Secondary Mobile"
                name="secondary_mobile"
                style={{ width: '90%' }}
                required
              />
            </View>
          </View>
        </View>
        <Divider style={{ marginLeft: 10, marginRight: 20, marginTop: 20 }} />
        <View style={{ flexDirection: 'row', margin: 10 }}>
          <Text style={{ marginRight: 30, marginTop: 8, fontSize: 20 }}>
            Sharing?
          </Text>

          <RadioButton.Group
            onValueChange={value => this.setState({ value })}
            value={this.state.value}
          >
            <View
              style={{
                flexDirection: 'row',
              }}
            >
              <RadioButton value="public" />
              <Text style={styles.radioText}>Public</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
              }}
            >
              <RadioButton value="private" />
              <Text style={styles.radioText}>Private</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
              }}
            >
              <RadioButton value="shared" />
              <Text style={styles.radioText}>Shared</Text>
            </View>
          </RadioButton.Group>
        </View>
        <Divider style={{ marginLeft: 10, marginRight: 20 }} />
        <View style={styles.placeRightPhone}>
          <View style={{ flex: 1 }}>
            <Dropdown
              label="Business Phone"
              name="business_phone"
              style={styles.dropdownPhone}
              required
              data={title}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Dropdown
              label="Business Phone 2"
              name="business_phone_2"
              style={styles.dropdownPhone}
              required
              data={title}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Dropdown
              label="Business Fax"
              name="business_fax"
              style={styles.dropdownPhone}
              required
              data={title}
            />
          </View>
        </View>
        <View style={styles.placeRight}>
          <View style={{ flex: 1 }}>
            <TextInput label="Business Email" name="business_email" required />
          </View>
          <View style={{ flex: 1 }}>
            <TextInput
              label="Business Home Page"
              name="business_home_page"
              required
            />
          </View>
        </View>
        <Divider style={{ marginTop: 10, marginLeft: 10, marginRight: 20 }} />
        <View style={styles.placeRight}>
          <View style={{ flex: 1 }}>
            <Dropdown
              label="Home Phone"
              name="home_phone"
              required
              data={title}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Dropdown
              label="Home Phone 2"
              name="home_phone_2"
              required
              data={title}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Dropdown label="Home Fax" name="home_fax" required data={title} />
          </View>
        </View>
        <View style={styles.placeRight}>
          <View style={{ flex: 1 }}>
            <TextInput label="Personal Email" name="personal_email" required />
          </View>
          <View style={{ flex: 1 }}>
            <TextInput
              label="Personal Home Page"
              name="personal_home_page"
              required
            />
          </View>
        </View>
      </View>
    </View>
  );

  renderOrgForm = () => (
    <Form>
      <TextInput label="Name" name="org_name" required />
      <TextInput
        label="Business Telephone Number"
        name="org_business_telephone_numbers"
      />
      <TextInput label="Business Homepage" name="org_business_homepages" />
    </Form>
  );

  render() {
    const { viewType } = this.props;
    if (viewType === INDIVIDUAL) return this.renderIndividualForm();
    return this.renderOrgForm();
  }
}

CreateConexionForm1.propTypes = {
  viewType: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  row: {
    flex: 1,
  },
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
  // dropdownPhone: { width: '33%' },
  radioText: {
    marginRight: 30,
    marginTop: 8,
    fontSize: 17,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
  },
});

export default CreateConexionForm1;
