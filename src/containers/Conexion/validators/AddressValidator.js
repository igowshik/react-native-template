export const validate = values => {
  const errors = {};
  if (!values.address_type) errors.address_type = true;
  if (!values.line_1_address) errors.line_1_address = true;
  if (!values.city) errors.city = true;
  if (!values.state) errors.state = true;
  if (!values.country) errors.country = true;
  if (!values.postal_area) errors.postal_area = true;

  return errors;
};
