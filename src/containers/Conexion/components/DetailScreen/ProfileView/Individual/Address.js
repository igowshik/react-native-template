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
  Button,
  Text,
} from 'react-native-paper';
import Lo from 'lodash';

import * as Colors from 'cnxapp/src/utils/colorsConstants';
import { setRootGlobalLoader } from 'cnxapp/src/app/rootActions';
import {
  selectConexionDetails,
  selectGlobalLoader,
} from 'cnxapp/src/containers/Conexion/selectors';
import {
  deleteAddress,
  setAddressModalVisibility,
} from 'cnxapp/src/containers/Conexion/actions';

import CreateAddressModal from '../CreateAddress';

class Address extends React.Component {
  state = {};

  setModalOpen = () => this.props.dispatchModalState(true);

  renderAddressCard = () => {
    const { data, dispatchDeleteAddress } = this.props;
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
                    size={18}
                    solid
                  />
                )}
                size={25}
                onPress={() => {}}
              />
              <IconButton
                icon={() => (
                  <FontAwesome5
                    name="trash"
                    color={Colors.SECONDARY}
                    size={18}
                    solid
                  />
                )}
                color={Colors.SECONDARY}
                size={25}
                onPress={() => {
                  dispatchDeleteAddress(add.ConexionAddressId);
                }}
              />
              <IconButton
                icon={() => (
                  <FontAwesome5
                    name="map-marked-alt"
                    color={Colors.GREEN}
                    size={18}
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
    const intialAddressValues = {
      address_type: 'WORK',
      line_1_address: 'test',
      city: 'Bangalore',
      state: 'Karnataka',
      country: 'IN',
      postal_area: '560102',
    };
    const { data } = this.props;
    if (!Lo.isEmpty(data)) {
      return (
        <View style={styles.parentView}>
          <Card elevation={4}>
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
                    size={25}
                    light
                  />
                </View>
              )}
              right={propss => (
                <View {...propss} style={{ marginRight: 10 }}>
                  <Button
                    raised
                    color={Colors.PURPLE}
                    icon={() => (
                      <FontAwesome5
                        name="map-marker-plus"
                        color="#FFF"
                        size={18}
                        light
                      />
                    )}
                    mode="contained"
                    onPress={this.setModalOpen}
                  >
                    Add Address
                  </Button>
                </View>
              )}
            />
            <Divider />
            <Card.Content>{this.renderAddressCard()}</Card.Content>
          </Card>
          <CreateAddressModal initialValues={intialAddressValues} />
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
