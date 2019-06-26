import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import DateTimePicker from 'react-native-modal-datetime-picker';

import { MONTSERRAT } from '../../utils/font-list';
import * as Colors from '../../utils/colorsConstants';

export default class DatetimePicker extends Component {
  hideDateTimePicker = () => {
    this.props.onCancel();
  };

  handleDatePicked = date => {
    this.props.onDateSelect(date);
  };

  render() {
    const { visible, mode, value } = this.props;
    return (
      <View>
        <DateTimePicker
          isVisible={visible}
          onConfirm={this.handleDatePicked}
          onCancel={this.hideDateTimePicker}
          mode={mode || 'date'}
          titleStyle={styles.textStyle}
          confirmTextStyle={styles.textStyle}
          cancelTextStyle={styles.cancelStyle}
          date={value || new Date()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
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

DatetimePicker.propTypes = {
  visible: PropTypes.bool.isRequired,
  mode: PropTypes.string,
  value: PropTypes.any,
  onDateSelect: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
