import React from 'react';
import { View, StyleSheet } from 'react-native';
// Absolute imports
import { TextInput, NumberInput } from 'cnxapp/src/components/InputField';
import { Card } from 'react-native-paper';
import { Grid, Row } from 'native-base';
import * as colors from 'cnxapp/src/utils/colorsConstants';
import Dropdown from '../../../../components/Dropdown';

const title = [
  { value: 'Dr.' },
  { value: 'Miss' },
  { value: 'Mr.' },
  { value: 'Mrs.' },
  { value: 'Ms.' },
  { value: 'Prof.' },
];
const OrgDetails = () => (
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
            <Dropdown
              label="Managers"
              name="org_managers"
              data={title}
              required
            />
          </Row>
        </Grid>
      </Card.Content>
    </Card>
  </View>

  // <View style={{ marginLeft: 200 }}>
  //   <View style={{ width: '60%' }}>
  //     <TextInput label="Name" name="org_name" required />
  //     <TextInput label="Short Name" name="short_name" required />
  //     {/* <View style={styles.placeRight}> */}
  //     <View style={{ flex: 1, flexDirection: 'row' }}>
  //       <View style={{ width: 100 }}>
  //         <Dropdown label="+91" name="country_code" required data={title} />
  //       </View>
  //       <View style={(styles.container, { flex: 1 })}>
  //         <NumberInput label="Primary Mobile" name="primary_mobile" required />
  //       </View>
  //     </View>
  //     <View style={{ flex: 1, flexDirection: 'row' }}>
  //       <View style={{ width: 100 }}>
  //         <Dropdown label="+91" name="country_code" required data={title} />
  //       </View>
  //       <View style={(styles.container, { flex: 1 })}>
  //         <NumberInput
  //           label="Secondary Mobile"
  //           name="secondary_mobile"
  //           style={{ width: '80%' }}
  //           required
  //         />
  //       </View>
  //     </View>
  //     <View style={{ flex: 1, flexDirection: 'row' }}>
  //       <View style={{ width: 100 }}>
  //         <Dropdown label="+91" name="country_code" required data={title} />
  //       </View>
  //       <View style={(styles.container, { flex: 1 })}>
  //         <NumberInput
  //           label="Business Fax"
  //           name="business_fax"
  //           style={{ width: '70%', marginBottom: 20 }}
  //           required
  //         />
  //       </View>
  //     </View>
  //     {/* </View> */}

  //     <TextInput label="Web Address" name="web_address" />
  //     <Dropdown label="Managers" name="managers" required data={title} />
  //   </View>
  // </View>
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
export default OrgDetails;
