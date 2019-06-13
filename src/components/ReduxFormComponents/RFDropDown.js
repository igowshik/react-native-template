import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { Dropdown as MaterialDropdown } from 'react-native-material-dropdown';

import * as fonts from 'cnxapp/src/utils/font-list';
import * as colors from 'cnxapp/src/utils/colorsConstants';

// Relative imports
import { CNXTextLight } from '../Texts';

class RFDropdown extends React.Component {
  state = {};

  render() {
    const {
      input,
      label,
      required,
      data,
      meta: { error, touched },
      ...inputProps
    } = this.props;
    let hasError = false;//eslint-disable-line
    let errorField = null; //eslint-disable-line

    if (required && touched && error) {
      hasError = true;
      if (typeof error === 'string')
        errorField = (
          <CNXTextLight style={styles.errorText}>{` ${error}`}</CNXTextLight>
        );
    }

    return (
      <View style={styles.parentView}>
        <MaterialDropdown
          {...inputProps}
          itemTextStyle={styles.picker}
          label={label}
          style={styles.dropDown}
          data={data}
          labelTextStyle={styles.label}
          titleTextStyle={styles.font}
          labelFontSize={12}
          value={input.value}
          onChangeText={input.onChange}
          selectedItemColor={colors.PRIMARY}
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
    width: '90%',
    margin: 10,
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
    color: '#C0392B',
  },
  font: {
    fontFamily: fonts.MONTSERRAT,
  },
});

export default RFDropdown;
