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
  dispatchOrganisationDetails,
  dispatchCreateOrganisation,
} from 'cnxapp/src/containers/Conexion/actions';
import * as colors from 'cnxapp/src/utils/colorsConstants';
import { INDIVIDUAL } from '../../constants';

// Relative imports
import CreateConexionForm from './CreateConexionForm';

import { validate } from '../../validate';

class CreateConexions extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _closeModal = () => {
    const { setModalOpenClose } = this.props;
    setModalOpenClose(false);
  };

  componentDidMount() {}

  onCreateConexion = values => {
    const valuesForm = JSON.stringify(values, null, 2);
    const objectForm = JSON.parse(valuesForm);
    if (this.props.conexionType === INDIVIDUAL) {
      this.props.setIndividualsDetails(objectForm);
      this.props.createIndividual();
    } else {
      this.props.setOrganisationDetails(objectForm);
      this.props.createOrganisation();
    }
    this.props.dispatchFormReset('createConexion');
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

    console.log('##&$&#$&#$&#$', this.props.conexionType);
    return (
      <View>
        <FullPageModal
          visible={modalOpen}
          handleModalVisible={this._closeModal}
          // modalHeaderText="Create Conexion"
          modalHeaderText={
            conexionType === 'Individual'
              ? 'Create Conexion'
              : 'Create Organisation'
          }
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
            <CreateConexionForm
              handleSubmit={handleSubmit}
              viewType={conexionType}
            />
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
  createIndividual: PropTypes.func,
  dispatchFormReset: PropTypes.func.isRequired,
  setOrganisationDetails: PropTypes.func.isRequired,
  createOrganisation: PropTypes.func,
};

// export default reduxForm({
const redux = reduxForm({
  form: 'createConexion',
  validate,
  enableReinitialize: true,
  destroyOnUnmount: true,
  keepDirtyOnReinitialize: false,
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
