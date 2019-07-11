import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import Lo from 'lodash';
import { Card } from 'react-native-paper';

// Absolute imports
import { TextInput } from 'cnxapp/src/components/InputField';
import Dropdown from 'cnxapp/src/components/Dropdown';
import { setRootGlobalLoader } from 'cnxapp/src/app/rootActions';
import { Grid, Row } from 'native-base';
import * as colors from 'cnxapp/src/utils/colorsConstants';

// Relative Imports
import {
  selectGlobalLoader,
  selectConexionMetaData,
} from '../../../../selectors';

class AddressForm extends React.Component {
  state = {
    country: [],
    addressType: [],
  };

  componentDidMount() {
    const { metaData } = this.props;
    if (!Lo.isEmpty(metaData)) {
      const mappedCountry = [];
      const mappedAddressType = [];
      metaData.country_list.forEach(data => {
        mappedCountry.push({ label: data.Description, value: data.Value });
      });
      metaData.address_type.forEach(data => {
        mappedAddressType.push({ label: data.Description, value: data.Value });
      });
      this.setState({
        country: mappedCountry,
        addressType: mappedAddressType,
      });
    }
  }

  render() {
    const { country, addressType } = this.state;
    return (
      <View style={styles.parentView}>
        <Card elevation={4} style={styles.card}>
          <Card.Content>
            <Grid>
              <Row>
                <Dropdown
                  label="Address Type"
                  name="address_type"
                  required
                  data={addressType}
                />
              </Row>
              <Row>
                <TextInput
                  label="Line 1 Address"
                  name="line_1_address"
                  required
                />
              </Row>
              <Row>
                <TextInput label="City" name="city" required />
              </Row>
              <Row>
                <TextInput label="State" name="state" required />
              </Row>
              <Row>
                <Dropdown
                  label="Country"
                  name="country"
                  required
                  data={country}
                />
              </Row>
              <Row>
                <TextInput label="Postal Area" name="postal_area" required />
              </Row>
              <Row>
                <TextInput label="Postal Area 2" name="postal_area_2" />
              </Row>
            </Grid>
          </Card.Content>
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  parentView: {
    // margin: 10,
  },
  card: {
    borderTopColor: colors.PINK,
    borderTopWidth: 2,
    margin: 20,
  },
});

AddressForm.propTypes = {
  metaData: PropTypes.object.isRequired,
};

/**
 * @method: mapStateToProps()
 * @description: Redux Map method to map all redux state into each individual state value
 * @returns: jobState ans filterState in the State
 */
const mapStateToProps = createStructuredSelector({
  loaderState: selectGlobalLoader(),
  metaData: selectConexionMetaData(),
});

/**
 * @method: mapDispatchToProps()
 * @description: Map the Props of this class to the respective Redux dispatch functions
 * @returns: Mapped functions
 */
const mapDispatchToProps = dispatch => ({
  setGlobalLoaderState: value => dispatch(setRootGlobalLoader(value)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(AddressForm);
