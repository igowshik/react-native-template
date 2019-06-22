import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { reduxForm, reset } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Button } from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5Pro';

// Absolute imports
import FullPageModal from 'cnxapp/src/components/FullPageModal';
import ScrollView from 'cnxapp/src/components/ScrollView';
import {
  dispatchIndividualDetails,
  dispatchCreateIndividual,
  editIndividualConexion,
  dispatchOrganisationDetails,
  dispatchCreateOrganisation,
  editOrganisationConexion,
} from 'cnxapp/src/containers/Conexion/actions';
import * as colors from 'cnxapp/src/utils/colorsConstants';

// Relative imports
import CreateConexionForm from '../CreateConexions/CreateConexionForm';

import { validate } from '../../validate';
import { INDIVIDUAL } from '../../constants';

class CreateConexions extends Component {
  _closeModal = () => {
    const { setModalOpenClose } = this.props;
    setModalOpenClose(false);
  };

  onCreateConexion = values => {
    const {
      setIndividualsDetails,
      dispatchEditIndividual,
      conexionType,
      setOrganisationDetails,
      dispatchEditOrganisation,
    } = this.props;
    const valuesForm = JSON.stringify(values, null, 2);
    const objectForm = JSON.parse(valuesForm);
    console.log('obeject value ds dsd ** dsd', objectForm);
    if (conexionType === INDIVIDUAL) {
      setIndividualsDetails(objectForm);
      dispatchEditIndividual();
    } else {
      // delete objectForm.org_shared_type;
      setOrganisationDetails(objectForm);
      dispatchEditOrganisation();
    }
  };

  render() {
    const {
      modalOpen,
      handleSubmit,
      invalid,
      pristine,
      submitting,
      conexionType,
    } = this.props;

    return (
      <View>
        <FullPageModal
          visible={modalOpen}
          handleModalVisible={this._closeModal}
          modalHeaderText="Edit Conexion"
        >
          <View style={styles.headerContainer}>
            <Button
              raised
              onPress={handleSubmit(this.onCreateConexion)}
              disabled={pristine || submitting || invalid}
              mode="contained"
              color={colors.PURPLE}
              icon={() => (
                <FontAwesome5 name="user-plus" color="#fff" size={18} light />
              )}
            >
              Done
            </Button>
          </View>
          <ScrollView>
            <CreateConexionForm viewType={conexionType} />
          </ScrollView>
        </FullPageModal>
      </View>
    );
  }
}

CreateConexions.propTypes = {
  setModalOpenClose: PropTypes.func.isRequired,
  modalOpen: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  invalid: PropTypes.bool,
  conexionType: PropTypes.string.isRequired,
  setIndividualsDetails: PropTypes.func,
  dispatchEditIndividual: PropTypes.func.isRequired,
  setOrganisationDetails: PropTypes.func,
  dispatchEditOrganisation: PropTypes.func.isRequired,
};

// export default reduxForm({
const redux = reduxForm({
  form: 'editConexion',
  validate,
  enableReinitialize: true,
  destroyOnUnmount: true,
  keepDirtyOnReinitialize: false,
});

const mapDispatchToProps = dispatch => ({
  setIndividualsDetails: value => dispatch(dispatchIndividualDetails(value)),
  dispatchcreateIndividual: () => dispatch(dispatchCreateIndividual()),
  dispatchFormReset: formName => dispatch(reset(formName)),
  dispatchEditIndividual: () => dispatch(editIndividualConexion()),
  setOrganisationDetails: value => dispatch(dispatchOrganisationDetails(value)),
  dispatchCreateOrganisation: () => dispatch(dispatchCreateOrganisation()),
  dispatchEditOrganisation: () => dispatch(editOrganisationConexion()),
});
const withConnect = connect(
  null,
  mapDispatchToProps,
);
export default compose(
  withConnect,
  redux,
)(CreateConexions);

const styles = StyleSheet.create({
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    margin: 10,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    flex: 1,
  },
});
