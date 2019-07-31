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
  dispatchOrganisationDetails,
  dispatchCreateOrganisation,
} from 'cnxapp/src/containers/Conexion/actions';

// Relative imports
import IndividualConexionForm from './IndividualConexionForm';
import { INDIVIDUAL } from '../../constants';
import { validate } from '../../validators/IndividualValidator';

class CreateIndividual extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onCreateConexion = this.onCreateConexion.bind(this);
  }

  _closeModal = () => {
    const { setModalOpenClose, dispatchFormReset } = this.props;
    dispatchFormReset('createConexion');
    setModalOpenClose(false);
  };

  componentDidMount() {}

  onCreateConexion = values => {
    const {
      setIndividualsDetails,
      createIndividual,
      dispatchFormReset,
      setOrganisationDetails,
      createOrganisation,
    } = this.props;
    const valuesForm = JSON.stringify(values, null, 2);
    const objectForm = JSON.parse(valuesForm);
    if (this.props.conexionType === INDIVIDUAL) {
      setIndividualsDetails(objectForm);
      createIndividual();
    } else {
      setOrganisationDetails(objectForm);
      createOrganisation();
    }
    this._closeModal();
    dispatchFormReset('createConexion');
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
          conexionType === INDIVIDUAL
            ? 'Create Individual'
            : 'Create Organisation'
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
          <IndividualConexionForm
            handleSubmit={handleSubmit}
            viewType={conexionType}
          />
        </ScrollView>
      </FullPageModal>
    );
  }
}

CreateIndividual.propTypes = {
  setModalOpenClose: PropTypes.func.isRequired,
  modalOpen: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  invalid: PropTypes.bool,
  conexionType: PropTypes.string.isRequired,
  setIndividualsDetails: PropTypes.func,
  createIndividual: PropTypes.func,
  dispatchFormReset: PropTypes.func.isRequired,
  setOrganisationDetails: PropTypes.func.isRequired,
  createOrganisation: PropTypes.func,
};

const redux = reduxForm({
  form: 'createConexion',
  validate,
  enableReinitialize: false,
  destroyOnUnmount: false,
  keepDirtyOnReinitialize: true,
});

const mapDispatchToProps = dispatch => ({
  setIndividualsDetails: value => dispatch(dispatchIndividualDetails(value)),
  setOrganisationDetails: value => dispatch(dispatchOrganisationDetails(value)),
  createIndividual: () => dispatch(dispatchCreateIndividual()),
  createOrganisation: () => dispatch(dispatchCreateOrganisation()),
  dispatchFormReset: formName => dispatch(reset(formName)),
});
const withConnect = connect(
  null,
  mapDispatchToProps,
);
export default compose(
  withConnect,
  redux,
)(CreateIndividual);
