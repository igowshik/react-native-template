import React from 'react';
import { Form, View } from 'native-base';
import PropTypes from 'prop-types';

// Absolute imports
import { TextInput, NumberInput } from 'cnxapp/src/components/InputField';

import Dropdown from '../../../../components/Dropdown';

// Relative imports
import { INDIVIDUAL } from '../../constants';

// const data = [
//   {
//     value: 'Office',
//   },
//   {
//     value: 'Home',
//   },
// ];

class CreateConexionForm extends React.Component {
  renderIndividualForm = () => (
    // <Form>
    <View>
      <TextInput label="First Name" name="first_name" required />
      <TextInput label="Last Name" name="last_name" required />
      <TextInput label="Job Title" name="job_title" required />
      <TextInput label="Organization" name="organization" required />
      <NumberInput label="Telephone Number" name="telephone_number" required />
      <TextInput label="Business Email" name="business_email" required />
      <TextInput
        label="Business Telephone Number"
        name="business_telephone_number"
        required
      />
      <Dropdown label="Phone type" name="phone_type" required data={data} />
    </View>
    // </Form>
  );

  renderOrgForm = () => (
    // <Form>
    <View>
      <TextInput label="Name" name="org_name" required />
      <TextInput
        label="Business Telephone Number"
        name="org_business_telephone_numbers"
      />
      <TextInput label="Business Homepage" name="org_business_homepages" />
    </View>
    // </Form>
  );

  render() {
    const { viewType } = this.props;
    if (viewType === INDIVIDUAL) return this.renderIndividualForm();
    return this.renderOrgForm();
  }
}

CreateConexionForm.propTypes = {
  viewType: PropTypes.string.isRequired,
};

export default CreateConexionForm;
