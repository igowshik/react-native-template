import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import Lo from 'lodash';

// Absolute imports
import { TextInput, NumberInput } from 'cnxapp/src/components/InputField';
import Dropdown from 'cnxapp/src/components/Dropdown';
import { setRootGlobalLoader } from 'cnxapp/src/app/rootActions';
import { selectGlobalLoader, selectConexionMetaData } from '../../selectors';

class Details extends React.Component {
  state = {
    title: [],
    suffix: [],
  };

  componentDidMount() {
    const { metaData } = this.props;
    if (!Lo.isEmpty(metaData)) {
      const mappedTitle = [];
      const mappedSuffix = [];
      metaData.title.forEach(data => {
        mappedTitle.push({ label: data.Description, value: data.Value });
      });
      metaData.suffix.forEach(data => {
        mappedSuffix.push({ label: data.Description, value: data.Value });
      });
      this.setState({ title: mappedTitle, suffix: mappedSuffix });
    }
  }

  render() {
    const { title, suffix } = this.state;
    return (
      <View>
        <View style={styles.placeRight}>
          <TextInput label="First Name" name="first_name" required />
          <TextInput label="Middle Name" name="middle_name" required />
        </View>
        <View style={styles.placeRight}>
          <TextInput label="Last Name" name="last_name" required />
          <TextInput label="initial" name="initial" required />
        </View>
        <View style={styles.placeRight}>
          <View style={{ flex: 1 }}>
            <Dropdown label="Title" name="title" required data={title} />
          </View>
          <View style={{ flex: 1 }}>
            <Dropdown label="Suffix" name="suffix" required data={suffix} />
          </View>
        </View>
        <View style={styles.placeRight}>
          <View style={{ flex: 1 }}>
            <Dropdown
              label="Select Oraganisation"
              name="select_oraganisation"
              required
              data={title} // organisation data to be filled
            />
          </View>
          {/* <View style={{ flex: 1 }}> */}
          <TextInput label="Job Title" name="job_title" required />
          {/* </View> */}
        </View>
        <View style={styles.placeRight}>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{ width: '20%' }}>
              <Dropdown label="+91" name="country_code" required data={title} />
            </View>
            <View style={(styles.container, { flex: 1, marginTop: 4 })}>
              <NumberInput
                label="Primary Mobile"
                name="primary_mobile"
                required
              />
            </View>
          </View>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{ width: '20%' }}>
              <Dropdown
                label="+91"
                name="country_code"
                required
                style={{ width: '10%' }}
                data={title}
              />
            </View>
            <View style={(styles.container, { flex: 1, marginTop: 4 })}>
              <NumberInput
                label="Secondary Mobile"
                name="secondary_mobile"
                style={{ width: '90%' }}
                required
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
  },
  placeRight: {
    flex: 1,
    marginBottom: 10,
    flexDirection: 'row',
  },
  placeRightPhone: {
    flex: 1,
    marginBottom: 10,
    flexDirection: 'row',
    // width: '33%',
  },
  // dropdownPhone: { width: '33%' },
  radioText: {
    marginRight: 30,
    marginTop: 8,
    fontSize: 17,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
  },
});

Details.propTypes = {
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

export default compose(withConnect)(Details);
