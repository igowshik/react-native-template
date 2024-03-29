import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { Dropdown as MaterialDropdown } from 'react-native-material-dropdown';

import * as fonts from 'cnxapp/src/utils/font-list';

class RFDropdown extends React.Component {
  state = {
    hasError: false,
  };

  onFocusOut = () => {
    const {
      required,
      meta: { error, touched },
    } = this.props;
    if (required && touched && error) {
      this.setState({ hasError: true });
    }
  };

  render() {
    const {
      input,
      label,
      required,
      data,
      meta: { error, touched },
      ...inputProps
    } = this.props;

    if (required && touched && error) {
      this.setState({ hasError: true });
    }

    return (
      <View style={styles.parentView}>
        <MaterialDropdown
          {...inputProps}
          itemTextStyle={styles.picker}
          label={required ? `${label}*` : label}
          style={styles.dropDown}
          data={data}
          labelTextStyle={styles.label}
          titleTextStyle={styles.font}
          labelFontSize={12}
          value={input.value}
          onChangeText={input.onChange}
          onBlur={this.onFocusOut}
          error={this.state.hasError ? 'required' : null}
          textColor="rgba(0, 0, 0, 0.8)"
          baseColor="rgba(0, 0, 0, 0.5)"
        />
      </View>
    );
  }
}

RFDropdown.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  data: PropTypes.array.isRequired,
};

const styles = StyleSheet.create({
  dropDown: {
    margin: 8,
    marginTop: 0,
    marginBottom: 0,
    fontFamily: fonts.MONTSERRAT,
  },
  parentView: {
    flex: 1,
    margin: 8,
    marginBottom: 0,
    marginTop: 0,
  },
  picker: {
    fontFamily: fonts.MONTSERRAT,
  },
  label: {
    fontFamily: fonts.MONTSERRAT,
    fontWeight: '400',
    marginLeft: 10,
    color: 'rgba(0, 0, 0, 0.5)',
  },
  font: {
    fontFamily: fonts.MONTSERRAT,
  },
  errorText: {
    color: 'red',
    fontSize: 13,
  },
});

export default RFDropdown;
