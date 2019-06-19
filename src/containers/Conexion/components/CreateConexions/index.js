import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
// Absolute imports
import FullPageModal from 'cnxapp/src/components/FullPageModal';
import { PrimaryButton } from 'cnxapp/src/components/Buttons/Primary';
import ScrollView from 'cnxapp/src/components/ScrollView';

import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  dispatchIndividualDetails,
  dispatchCreateIndividual,
} from 'cnxapp/src/containers/Conexion/actions';

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
    this.props.setIndividualsDetails(objectForm);
    this.props.createIndividual();
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
            <PrimaryButton
              handleButtonClick={handleSubmit(this.onCreateConexion)}
              buttonText="Done"
              icon="check-circle"
              disabled={pristine || submitting || invalid}
              onPress={this.props.modalCloseOpen}
            />
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
  modalCloseOpen: PropTypes.func,
};

// export default reduxForm({
const redux1 = reduxForm({
  form: 'createConexion',
  validate,
  enableReinitialize: true,
  destroyOnUnmount: true,
  keepDirtyOnReinitialize: false,
});

const mapDispatchToProps = dispatch => ({
  setIndividualsDetails: value => dispatch(dispatchIndividualDetails(value)),
  createIndividual: () => dispatch(dispatchCreateIndividual()),
});
const withConnect = connect(
  null,
  mapDispatchToProps,
);
export default compose(
  withConnect,
  redux1,
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
