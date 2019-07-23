import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import React from 'react';

import RFDatePicker from '../ReduxFormComponents/RFDatePicker';

const DatePickerReduxForm = props => {
  const { name, required, visible, mode, defaultValue, onCancel } = props;
  return (
    <Field
      name={name}
      defaultValue={defaultValue}
      component={RFDatePicker}
      required={required}
      visible={visible}
      mode={mode}
      onCancel={onCancel}
    />
  );
};

DatePickerReduxForm.propTypes = {
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  defaultValue: PropTypes.string,
  visible: PropTypes.bool.isRequired,
  mode: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
};

export default DatePickerReduxForm;
