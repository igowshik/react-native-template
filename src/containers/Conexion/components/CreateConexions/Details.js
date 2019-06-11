import React from 'react';
import { View, StyleSheet } from 'react-native';
// Absolute imports
import { TextInput } from 'cnxapp/src/components/InputField';

import Dropdown from '../../../../components/Dropdown';

// Relative imports
// import { INDIVIDUAL } from '../../constants';

// const data = [
//   {
//     value: 'Home',
//   },
//   {
//     value: 'Office',
//   },
// ];
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

const Details = () => (
  // <View style={{ marginBottom: 30 }}>
  <View>
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
          <TextInput label="Primary Mobile" name="primary_mobile" required />
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
  </View>
);

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

export { Details };
