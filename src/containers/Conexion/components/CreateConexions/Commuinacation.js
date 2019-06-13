import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Divider } from 'react-native-paper';
import { TextInput } from 'cnxapp/src/components/InputField';
import Dropdown from '../../../../components/Dropdown';

const title = [
  { value: 'Dr.' },
  { value: 'Miss' },
  { value: 'Mr.' },
  { value: 'Mrs.' },
  { value: 'Ms.' },
  { value: 'Prof.' },
];

const Communication = () => (
  <View>
    <View style={styles.placeRightPhone}>
      <View style={{ flexDirection: 'row', flex: 1 }}>
        <View style={{ width: '20%' }}>
          <Dropdown label="+91" name="country_code" required data={title} />
        </View>
        <View style={(styles.container, { flex: 1, marginTop: 4 })}>
          <TextInput label="Business Phone" name="business_phone" required />
        </View>
      </View>
      <View style={{ flexDirection: 'row', flex: 1 }}>
        <View style={{ width: '20%' }}>
          <Dropdown label="+91" name="country_code" required data={title} />
        </View>
        <View style={(styles.container, { flex: 1, marginTop: 4 })}>
          <TextInput
            label="Business Phone 2"
            name="business_phone_2"
            required
          />
        </View>
      </View>
      <View style={{ flexDirection: 'row', flex: 1 }}>
        <View style={{ width: '20%' }}>
          <Dropdown label="+91" name="country_code" required data={title} />
        </View>
        <View style={(styles.container, { flex: 1, marginTop: 4 })}>
          <TextInput label="Business Fax" name="business_fax" required />
        </View>
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
      <View style={{ flexDirection: 'row', flex: 1 }}>
        <View style={{ width: '20%' }}>
          <Dropdown label="+91" name="country_code" required data={title} />
        </View>
        <View style={(styles.container, { flex: 1, marginTop: 4 })}>
          <TextInput label="Home Phone" name="home_phone" required />
        </View>
      </View>
      <View style={{ flexDirection: 'row', flex: 1 }}>
        <View style={{ width: '20%' }}>
          <Dropdown label="+91" name="country_code" required data={title} />
        </View>
        <View style={(styles.container, { flex: 1, marginTop: 4 })}>
          <TextInput label="Home Phone 2" name="home_phone_2" required />
        </View>
      </View>
      <View style={{ flexDirection: 'row', flex: 1 }}>
        <View style={{ width: '20%' }}>
          <Dropdown label="+91" name="country_code" required data={title} />
        </View>
        <View style={(styles.container, { flex: 1, marginTop: 4 })}>
          <TextInput label="Home Fax" name="hom_fax" required />
        </View>
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

export { Communication };
