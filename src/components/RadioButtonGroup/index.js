import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import React from 'react';

import RFRadioButton from '../ReduxFormComponents/RFRadioButton';

const RadioButtonGroup = props => {
  const { data, name, required, defaultValue } = props;
  return (
    <Field
      data={data}
      name={name}
      defaultValue={defaultValue}
      component={RFRadioButton}
      required={required}
    />
  );
};

RadioButtonGroup.propTypes = {
  data: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  defaultValue: PropTypes.string,
};

export default RadioButtonGroup;
