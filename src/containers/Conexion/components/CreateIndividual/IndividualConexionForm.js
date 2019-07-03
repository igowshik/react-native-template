import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

// Relative imports
import Details from './Details';
import ShareType from './ShareType';
import Communication from './Commuinacation';
import OrganisationForm from '../CreateOrganisation';
import { INDIVIDUAL } from '../../constants';

class IndividualConexionForm extends React.Component {
  renderIndividualForm = () => (
    <View>
      <Details />
      <Communication />
      <ShareType />
    </View>
  );

  render() {
    const { viewType } = this.props;
    return viewType === INDIVIDUAL ? (
      this.renderIndividualForm()
    ) : (
      <OrganisationForm />
    );
  }
}

IndividualConexionForm.propTypes = {
  viewType: PropTypes.string.isRequired,
};

export default IndividualConexionForm;
