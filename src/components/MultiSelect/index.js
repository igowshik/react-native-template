import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

import RFMultiSelect from '../ReduxFormComponents/RFMultiSelect';

const Dropdown = props => {
  const { label, items, name, required, searchText } = props;
  return (
    <Field
      label={label}
      items={items}
      name={name}
      searchText={searchText}
      component={RFMultiSelect}
      required={required}
    />
  );
};

Dropdown.propTypes = {
  label: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  searchText: PropTypes.string.isRequired,
};

export default Dropdown;
