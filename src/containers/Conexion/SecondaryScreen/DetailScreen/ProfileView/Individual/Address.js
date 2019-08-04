import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5Pro';
import {
  Divider,
  Card,
  Paragraph,
  IconButton,
  Avatar,
  Text,
} from 'react-native-paper';
import Lo from 'lodash';

// Absolute imports
import * as Colors from 'cnxapp/src/utils/colorsConstants';
import { CARD_BORDER_RADIUS } from 'cnxapp/src/utils/valueconstants';

import { setRootGlobalLoader } from 'cnxapp/src/app/rootActions';
import {
  selectConexionDetails,
  selectGlobalLoader,
} from 'cnxapp/src/containers/Conexion/selectors';
import {
  deleteAddress,
  setAddressModalVisibility,
} from 'cnxapp/src/containers/Conexion/actions';
import Dialog from 'cnxapp/src/components/Dialog';
import { DELETE_ADDRESS_MESSAGE } from 'cnxapp/src/containers/Conexion/constants';

import CreateAddressModal from '../CreateAddress';

class Address extends React.Component {
  state = {
    editAddress: false,
    intialAddressValues: {},
    ConexionAddressId: '',
    dialogVisible: false,
  };

  setModalOpen = () => this.props.dispatchModalState(true);

  editAddressHandler = addressId => {
    this.setState({ editAddress: true });
    const { conexionDetails } = this.props;
    const addressData = Lo.filter(conexionDetails.Addresses, {
      ConexionAddressId: addressId,
    });
    const values = {
      address_type: addressData[0].AddressType,
      line_1_address: addressData[0].Line1Address,
      city: addressData[0].City,
      state: addressData[0].State,
      country: addressData[0].Country,
      postal_area: addressData[0].PostalArea,
      postal_area_2: addressData[0].PostalArea2,
    };
    this.setState({
      intialAddressValues: values,
      ConexionAddressId: addressId,
    });
    this.props.dispatchModalState(true);
  };

  onDialogDismiss = () => this.setState({ dialogVisible: false });

  onDialogConfirm = () => {
    this.props.dispatchDeleteAddress(this.state.ConexionAddressId);
    this.setState({ dialogVisible: false });
  };

  deleteAddressConfirmation = addressId => {
    this.setState({ ConexionAddressId: addressId, dialogVisible: true });
  };

  renderAddressCard = () => {
    const { data } = this.props;
    if (data.Addresses.length > 0) {
      return data.Addresses.map(add => (
        <View style={{ margin: 10 }} key={add.ConexionAddressId}>
          <Card>
            <Card.Title
              title={add.AddressType}
              left={prope => (
                <Avatar.Icon
                  {...prope}
                  icon="place"
                  style={styles.avatar}
                  color={Colors.YELLOW}
                />
              )}
            />
            <Card.Content>
              <Paragraph>{add.DisplayAddress}</Paragraph>
            </Card.Content>
            <Card.Actions>
              <IconButton
                icon={() => (
                  <FontAwesome5
                    name="pen-alt"
                    color={Colors.PRIMARY}
                    size={15}
                    solid
                  />
                )}
                size={25}
                onPress={() => {
                  this.editAddressHandler(add.ConexionAddressId);
                }}
              />
              <IconButton
                icon={() => (
                  <FontAwesome5
                    name="trash"
                    color={Colors.SECONDARY}
                    size={15}
                    solid
                  />
                )}
                color={Colors.SECONDARY}
                size={25}
                onPress={() => {
                  this.deleteAddressConfirmation(add.ConexionAddressId);
                }}
              />
              <IconButton
                icon={() => (
                  <FontAwesome5
                    name="map-marked-alt"
                    color={Colors.GREEN}
                    size={15}
                    solid
                  />
                )}
                color={Colors.GREEN}
                size={25}
                onPress={() => {}}
              />
            </Card.Actions>
          </Card>
        </View>
      ));
    }
    return (
      <Text style={styles.noAddress}>No address found for this conexion.</Text>
    );
  };

  render() {
    const { data } = this.props;
    const {
      intialAddressValues,
      editAddress,
      ConexionAddressId,
      dialogVisible,
    } = this.state;
    if (!Lo.isEmpty(data)) {
      return (
        <View style={styles.parentView}>
          <Card elevation={4} style={{ borderRadius: CARD_BORDER_RADIUS }}>
            <Card.Title
              title="Address"
              left={propss => (
                <View
                  style={[styles.iconRoundBackground, styles.iconsColor]}
                  {...propss}
                >
                  <FontAwesome5
                    name="address-card"
                    color="#1B5E20"
                    size={20}
                    light
                  />
                </View>
              )}
              right={rightProps => (
                <View {...rightProps} style={{ marginRight: 10 }}>
                  <IconButton
                    {...rightProps}
                    icon={() => (
                      <FontAwesome5
                        name="map-marker-plus"
                        color={Colors.PURPLE}
                        size={20}
                        solid
                      />
                    )}
                    style={{ height: 50, width: 50 }}
                    color={Colors.PURPLE}
                    onPress={this.setModalOpen}
                  />
                </View>
              )}
            />
            <Divider />
            <Card.Content>{this.renderAddressCard()}</Card.Content>
          </Card>
          <CreateAddressModal
            initialValues={intialAddressValues}
            editAddress={editAddress}
            addressId={ConexionAddressId}
          />
          <Dialog
            visible={dialogVisible}
            title="Delete!"
            message={DELETE_ADDRESS_MESSAGE}
            onDismiss={this.onDialogDismiss}
            onConfirm={this.onDialogConfirm}
          />
        </View>
      );
    }
    return null;
  }
}

Address.propTypes = {
  data: PropTypes.object,
  dispatchDeleteAddress: PropTypes.func.isRequired,
  dispatchModalState: PropTypes.func.isRequired,
  conexionDetails: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  iconRoundBackground: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 45,
    height: 45,
    borderRadius: 100,
  },
  avatar: {
    backgroundColor: '#FFF',
    borderColor: '#FCBB0D',
    borderWidth: 1,
  },
  parentView: {
    flex: 1,
    margin: 15,
  },
  iconsColor: { backgroundColor: '#E8F5E9', borderColor: '#1B5E20' },
  noAddress: {
    margin: 5,
  },
});

const mapStateToProps = createStructuredSelector({
  conexionDetails: selectConexionDetails(),
  loaderState: selectGlobalLoader(),
});

const mapDispatchToProps = dispatch => ({
  dispatchSetGlobalLoaderState: value => dispatch(setRootGlobalLoader(value)),
  dispatchDeleteAddress: id => dispatch(deleteAddress(id)),
  dispatchModalState: visibility =>
    dispatch(setAddressModalVisibility(visibility)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(withConnect)(Address);
