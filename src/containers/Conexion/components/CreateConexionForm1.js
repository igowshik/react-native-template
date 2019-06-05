import React from 'react';
import { Form } from 'native-base';
import PropTypes from 'prop-types';
import { View,ScrollView } from 'react-native';
// Absolute imports
import { TextInput } from 'cnxapp/src/components/InputField';

// Relative imports
import { INDIVIDUAL } from '../constants';

//---------------------
import { ConexionHeaderForm } from './ConexionHeaderForm';
import { ConexionShareForm } from './ConexionShareForm';
import { ConexionFooterForm } from './ConexionFooterForm';
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
    <ScrollView style={{flex:1}}>
      <ConexionHeaderForm />
      <ConexionShareForm />
      <ConexionFooterForm />
    </ScrollView>
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

export default CreateConexionForm1;
