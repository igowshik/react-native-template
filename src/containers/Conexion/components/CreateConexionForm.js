import React from 'react';
import { Form } from 'native-base';
import PropTypes from 'prop-types';

// Absolute imports
import {
  CNXTextInput,
  CNXNumberInput,
} from 'cnxapp/src/components/CNXInputField';

// Relative imports
import { INDIVIDUAL } from '../constants';

class CreateConexionForm extends React.Component {
  renderIndividualForm = () => (
    <Form>
      <CNXTextInput label="First Name" name="first_name" required />
      <CNXTextInput label="Last Name" name="last_name" required />
      <CNXTextInput label="Job Title" name="job_title" required />
      <CNXTextInput label="Organization" name="organization" required />
      <CNXNumberInput
        label="Telephone Number"
        name="telephone_number"
        required
      />
      <CNXTextInput label="Business Email" name="business_email" required />
      <CNXTextInput
        label="Business Telephone Number"
        name="business_telephone_number"
        required
      />
    </Form>
  );

  renderOrgForm = () => (
    <Form>
      <CNXTextInput label="Name" name="org_name" required />
      <CNXTextInput
        label="Business Telephone Number"
        name="org_business_telephone_numbers"
      />
      <CNXTextInput label="Business Homepage" name="org_business_homepages" />
    </Form>
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
