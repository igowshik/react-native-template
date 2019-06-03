import React from 'react';
import { Form } from 'native-base';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
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
    checked: 'Private',
  };

  renderIndividualForm = () => (
    <Form>
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
          <Dropdown label="Title" name="title" required data={title} />
          <Dropdown label="Suffix" name="suffix" required data={suffix} />
        </View>
        <View style={styles.placeRight}>
          <Dropdown
            label="Select Oraganisation"
            name="job_title"
            required
            data={title} // organisation data to be filled
          />
          <TextInput label="Job Title" name="job_title" required />
        </View>
        <View style={styles.placeRight}>
          <Dropdown
            label="Primary Mobile"
            name="telephone_number"
            required
            data={title}
          />
          <Dropdown
            label="Secondary Mobile"
            name="telephone_number"
            required
            data={title}
          />
        </View>
        <HorizDivider />
        <View style={{ flexDirection: 'row', margin: 10 }}>
          <Text style={{ marginRight: 30, marginTop: 8, fontSize: 20 }}>
            Sharing?
          </Text>
          <RadioInput
            value="Public"
            label="Public"
            name="Public"
            onPress={() => {
              this.setState({ checked: 'Public' });
            }}
            required
          />
          <Text style={{ marginRight: 30, marginTop: 8, fontSize: 17 }}>
            Public
          </Text>
          <RadioInput label="private" name="Private" required />
          <Text style={{ marginRight: 30, marginTop: 8, fontSize: 17 }}>
            Private
          </Text>
          <RadioInput label="Shared" name="Shared" required />
          <Text style={{ marginRight: 30, marginTop: 8, fontSize: 17 }}>
            Shared
          </Text>
        </View>
        <HorizDivider />
        <View style={styles.placeRight}>
          <Dropdown
            label="Business Phone"
            name="telephone_number"
            required
            data={title}
          />
          <Dropdown
            label="Business Phone 2"
            name="telephone_number"
            required
            data={title}
          />
          <Dropdown
            label="Business Fax"
            name="telephone_number"
            required
            data={title}
          />
        </View>
        <TextInput label="Business Email" name="business_email" required />
        <TextInput
          label="Business Home Page"
          name="business_home_page"
          required
        />
        <HorizDivider style={{ marginTop: 10 }} />
        <View style={styles.placeRight}>
          <Dropdown
            label="Home Phone"
            name="telephone_number"
            required
            data={title}
          />
          <Dropdown
            label="Home Phone 2"
            name="telephone_number"
            required
            data={title}
          />
          <Dropdown
            label="Home Fax"
            name="telephone_number"
            required
            data={title}
          />
        </View>
        <TextInput label="Personal Email" name="personal_email" required />
        <TextInput
          label="Personal Home Page"
          name="personal_home_page"
          required
        />
      </View>
    </Form>
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
});

export default CreateConexionForm1;
