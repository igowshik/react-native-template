import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

import RFDropdown from '../ReduxFormComponents/RFDropDown';

const Dropdown = props => {
  const { label, data, name, required } = props;
  return (
    <Field
      label={label}
      data={data}
      name={name}
      component={RFDropdown}
      required={required}
    />
  );
};

Dropdown.propTypes = {
  label: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
};

export default Dropdown;
