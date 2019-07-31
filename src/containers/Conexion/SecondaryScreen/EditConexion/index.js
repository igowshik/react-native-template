import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, reset } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { IconButton } from 'react-native-paper';
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
import IndividualConexionForm from 'cnxapp/src/containers/Conexion/PrimaryScreen/CreateIndividual/IndividualConexionForm';

// Relative imports
import { validate } from '../../validators/IndividualValidator';
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
    if (conexionType === INDIVIDUAL) {
      setIndividualsDetails(objectForm);
      dispatchEditIndividual();
    } else {
      // delete objectForm.org_shared_type;
      setOrganisationDetails(objectForm);
      dispatchEditOrganisation();
    }
    this._closeModal();
  };

  render() {
    const {
      modalOpen,
      handleSubmit,
      pristine,
      submitting,
      invalid,
      conexionType,
    } = this.props;

    return (
      <FullPageModal
        visible={modalOpen}
        handleModalVisible={this._closeModal}
        modalHeaderText={
          conexionType === INDIVIDUAL ? 'Edit Conexion' : 'Edit Organisaiton'
        }
        modalHeaderRightComponent={
          <IconButton
            icon={() => (
              <FontAwesome5 name="check-circle" color="#FFF" size={25} solid />
            )}
            color="#FFF"
            onPress={handleSubmit(this.onCreateConexion)}
            disabled={pristine || submitting || invalid}
          />
        }
      >
        <ScrollView>
          <IndividualConexionForm viewType={conexionType} />
        </ScrollView>
      </FullPageModal>
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
