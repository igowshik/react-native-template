import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { Paragraph, RadioButton, TouchableRipple } from 'react-native-paper';

import * as fonts from 'cnxapp/src/utils/font-list';

// Relative imports
import { Grid, Col } from 'native-base';
import { CNXTextLight } from '../Texts';

class RFRadioButton extends React.Component {
  touchabelClickChange = value => {
    this.props.input.onChange(value);
  };

  render() {
    const {
      input,
      required,
      data,
      defaultValue,
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
        <RadioButton.Group
          value={input.value || defaultValue}
          onValueChange={input.onChange}
          {...inputProps}
        >
          <Grid>
            {data.map(radio => (
              <Col key={radio.key}>
                <TouchableRipple
                  onPress={() => this.touchabelClickChange(radio.value)}
                >
                  <View style={styles.row}>
                    <Paragraph>{radio.label}</Paragraph>
                    <RadioButton value={radio.value} />
                  </View>
                </TouchableRipple>
              </Col>
            ))}
          </Grid>
        </RadioButton.Group>
      </View>
    );
  }
}

RFRadioButton.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  required: PropTypes.bool,
  data: PropTypes.array.isRequired,
  defaultValue: PropTypes.string,
};

const styles = StyleSheet.create({
  dropDown: {
    margin: 8,
    marginTop: 0,
    marginBottom: 0,
    fontFamily: fonts.MONTSERRAT,
  },
  parentView: {
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
});

export default RFRadioButton;
