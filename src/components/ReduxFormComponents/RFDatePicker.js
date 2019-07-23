import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { HelperText } from 'react-native-paper';
import DateTimePicker from 'react-native-modal-datetime-picker';

import { PRIMARY } from 'cnxapp/src/utils/colorsConstants';

import { MONTSERRAT } from '../../utils/font-list';
import * as Colors from '../../utils/colorsConstants';

export default class RFDatePicker extends PureComponent {
  hideDateTimePicker = () => {
    this.props.onCancel();
  };

  handleDateSelected = event => {
    const { input } = this.props;
    input.onChange(event);
    this.props.onCancel();
  };

  render() {
    const {
      input,
      required,
      helperText,
      visible,
      mode,
      meta: { error, touched },
      ...inputProps
    } = this.props;
    let hasError = false;

    if (required && touched && error) {
      hasError = true;
    }
    return (
      <View style={styles.item}>
        <DateTimePicker
          {...inputProps}
          isVisible={visible}
          onConfirm={this.handleDateSelected}
          onCancel={this.hideDateTimePicker}
          mode={mode || 'date'}
          titleStyle={styles.textStyle}
          confirmTextStyle={styles.textStyle}
          cancelTextStyle={styles.cancelStyle}
          date={input.value || new Date()}
        />
        {required ? (
          <HelperText type="error" visible={hasError}>
            {helperText || 'this field is required'}
          </HelperText>
        ) : null}
      </View>
    );
  }
}

RFDatePicker.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  required: PropTypes.bool,
  helperText: PropTypes.string,
  visible: PropTypes.bool.isRequired,
  mode: PropTypes.string,
  value: PropTypes.any,
  onCancel: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    margin: 8,
  },
  field: {
    flex: 1,
    marginTop: 5,
    fontSize: 14,
  },
  lable: {
    fontSize: 16,
    marginRight: 4,
    color: PRIMARY,
  },
  lableError: {
    fontSize: 16,
    marginRight: 4,
    color: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 13,
  },
  textStyle: {
    fontFamily: MONTSERRAT,
    color: Colors.PRIMARY,
    fontSize: 20,
  },
  cancelStyle: {
    fontFamily: MONTSERRAT,
    color: Colors.SECONDARY,
    fontSize: 20,
  },
});
