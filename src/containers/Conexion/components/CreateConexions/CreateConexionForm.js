import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

// Relative imports
import Details from './Details';
import ShareType from './ShareType';
import Communication from './Commuinacation';
import OrgDetails from '../CreateOrganisation/OrgDetails';
import { INDIVIDUAL } from '../../constants';

class CreateConexionForm extends React.Component {
  renderIndividualForm = () => (
    <View>
      <Details />
      <Communication />
      <ShareType />
    </View>
  );

  render() {
    const { viewType } = this.props;
    return (
      <View>
        {viewType === INDIVIDUAL ? this.renderIndividualForm() : <OrgDetails />}
      </View>
    );
  }
}

CreateConexionForm.propTypes = {
  viewType: PropTypes.string.isRequired,
};

export default CreateConexionForm;
