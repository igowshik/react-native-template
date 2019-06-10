import React from 'react';
import { Form } from 'native-base';
import PropTypes from 'prop-types';
import { View } from 'react-native';
// Absolute imports
import { TextInput } from 'cnxapp/src/components/InputField';

// Relative imports
// import { INDIVIDUAL } from '../../constants'

//---------------------
import { Details } from './Details';
import { ShareType } from './ShareType';
import { Communication } from './Commuinacation';
// eslint-disable-next-line import/named
// import ScrollView from '../../../components/ScrollView';

// const data = [
//   {
//     value: 'Home',
//   },
//   {
//     value: 'Office',
//   },
// ];

class CreateConexionForm1 extends React.Component {
  renderIndividualForm = () => (
    <View>
      <Details />
      <ShareType />
      <Communication />
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
    if (viewType === 'Individual') return this.renderIndividualForm();
    return this.renderOrgForm();
  }
}

CreateConexionForm1.propTypes = {
  viewType: PropTypes.string.isRequired,
};

export default CreateConexionForm1;
