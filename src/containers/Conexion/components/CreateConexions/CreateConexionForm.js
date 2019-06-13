import React from 'react';
import { Form } from 'native-base';
import PropTypes from 'prop-types';
import { View } from 'react-native';
// Absolute imports
import { TextInput } from 'cnxapp/src/components/InputField';

// Relative imports
import Details from './Details';
import { ShareType } from './ShareType';
import { Communication } from './Commuinacation';
import OrgDetails from '../CreateOrganisation/OrgDetails';

class CreateConexionForm extends React.Component {
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
    return (
      <View>
        {viewType === 'Individual' ? (
          this.renderIndividualForm()
        ) : (
          <OrgDetails />
        )}
      </View>
    );
  }
}

CreateConexionForm.propTypes = {
  viewType: PropTypes.string.isRequired,
};

export default CreateConexionForm;
