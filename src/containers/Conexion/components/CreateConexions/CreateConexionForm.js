import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

// Relative imports
import Details from './Details';
import ShareType from './ShareType';
import Communication from './Commuinacation';
import OrgDetails from '../CreateOrganisation/OrgDetails';

class CreateConexionForm extends React.Component {
  renderIndividualForm = () => (
    <View>
      <Details />
      <Communication />
      <ShareType />
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
