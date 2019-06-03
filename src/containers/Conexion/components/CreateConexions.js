import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
// Absolute imports
import FullPageModal from 'cnxapp/src/components/FullPageModal';
import { PrimaryButton } from 'cnxapp/src/components/Buttons/Primary';

// Relative imports
// import CreateConexionForm from './CreateConexionForm';
import CreateConexionForm1 from './CreateConexionForm1';
import { validate } from '../validate';

class CreateConexions extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _closeModal = () => {
    const { setModalOpenClose } = this.props;
    setModalOpenClose(false);
  };

  componentDidMount() {
    const { untouch } = this.props;
    const fields = [
      'first_name',
      'last_name',
      'job_title',
      'organization',
      'telephone_number',
      'business_email',
      'business_telephone_number',
      'org_name',
      'org_business_telephone_number',
      'org_business_homepage',
    ];
    untouch('createConexion', fields);
  }

  onCreateConexion = values => {
    const { reset, handleCreateConexion, conexionType } = this.props;
    const valuesForm = JSON.stringify(values, null, 2);
    const objectForm = JSON.parse(valuesForm);
    handleCreateConexion(objectForm, conexionType);
    this._closeModal();
    reset();
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
          modalHeaderText="Create Conexion"
        >
          <View style={styles.headerContainer}>
            <PrimaryButton
              handleButtonClick={handleSubmit(this.onCreateConexion)}
              buttonText="Done"
              icon="check-circle"
              disabled={pristine || submitting || invalid}
            />
          </View>
          <View style={{ flex: 1 }}>
            <CreateConexionForm1 viewType={conexionType} />
          </View>
        </FullPageModal>
      </View>
    );
  }
}

CreateConexions.propTypes = {
  setModalOpenClose: PropTypes.func.isRequired,
  handleCreateConexion: PropTypes.func,
  modalOpen: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  invalid: PropTypes.bool,
  reset: PropTypes.func,
  untouch: PropTypes.func,
  conexionType: PropTypes.string.isRequired,
};

export default reduxForm({
  form: 'createConexion',
  validate,
  enableReinitialize: true,
  destroyOnUnmount: true,
  keepDirtyOnReinitialize: false,
})(CreateConexions);

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
