import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Button } from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5Pro';

// Absolute imports
import FullPageModal from 'cnxapp/src/components/FullPageModal';
import ScrollView from 'cnxapp/src/components/ScrollView';
import Loader from 'cnxapp/src/components/Loader';
import { validate } from 'cnxapp/src/containers/Conexion/validators/AddressValidator';
import {
  selectAddressModalVisible,
  selectGlobalLoader,
} from 'cnxapp/src/containers/Conexion/selectors';
import {
  setAddressModalVisibility,
  setCreateAddressData,
  createConexionAddress,
  editConexionAddress,
} from 'cnxapp/src/containers/Conexion/actions';
import * as colors from 'cnxapp/src/utils/colorsConstants';

// Relative imports
import AddressForm from './AddressForm';

class CreateAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _closeModal = () => {
    const { dispatchModalState } = this.props;
    dispatchModalState(false);
  };

  componentDidMount() {}

  onCreateConexionAddress = values => {
    const {
      dispatchSaveCreateAddressData,
      dispatchCreateConexionAddress,
      dispatchEditAddress,
      editAddress,
      addressId,
    } = this.props;
    const valuesForm = JSON.stringify(values, null, 2);
    const objectForm = JSON.parse(valuesForm);
    if (editAddress) objectForm.addressId = addressId; // set address id if it is in edit mode
    dispatchSaveCreateAddressData(objectForm); // Dispatch the address data
    if (!editAddress) dispatchCreateConexionAddress();
    else dispatchEditAddress();
  };

  render() {
    const {
      modalOpen,
      handleSubmit,
      invalid,
      pristine,
      submitting,
      loaderState,
    } = this.props;

    return (
      <View>
        <FullPageModal
          visible={modalOpen}
          handleModalVisible={this._closeModal}
          modalHeaderText="Create Address"
        >
          <View style={styles.headerContainer}>
            <Button
              raised
              mode="contained"
              onPress={handleSubmit(this.onCreateConexionAddress)}
              disabled={pristine || submitting || invalid}
              color={colors.PURPLE}
              primary
              icon={() => (
                <FontAwesome5
                  name="map-marker-plus"
                  color="#fff"
                  size={18}
                  light
                />
              )}
            >
              Done
            </Button>
          </View>
          <ScrollView>
            {loaderState ? (
              <View>
                <Loader
                  showLoader={loaderState}
                  loaderTitle="Conexion"
                  loadingText="Loading conexion address..."
                />
              </View>
            ) : (
              <AddressForm />
            )}
          </ScrollView>
        </FullPageModal>
      </View>
    );
  }
}

CreateAddress.propTypes = {
  modalOpen: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  invalid: PropTypes.bool,
  dispatchModalState: PropTypes.func.isRequired,
  loaderState: PropTypes.bool.isRequired,
  dispatchSaveCreateAddressData: PropTypes.func.isRequired,
  dispatchCreateConexionAddress: PropTypes.func.isRequired,
  addressId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  editAddress: PropTypes.bool,
  dispatchEditAddress: PropTypes.func.isRequired,
};

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

const mapStateToProps = createStructuredSelector({
  modalOpen: selectAddressModalVisible(),
  loaderState: selectGlobalLoader(),
});

const mapDispatchToProps = dispatch => ({
  dispatchModalState: visibility =>
    dispatch(setAddressModalVisibility(visibility)),
  dispatchSaveCreateAddressData: data => dispatch(setCreateAddressData(data)),
  dispatchCreateConexionAddress: () => dispatch(createConexionAddress()),
  dispatchEditAddress: () => dispatch(editConexionAddress()),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(
  reduxForm({
    form: 'createConexionAddress',
    validate,
    enableReinitialize: true,
    destroyOnUnmount: true,
    keepDirtyOnReinitialize: false,
  }),
  withConnect,
)(CreateAddress);
