export const validate = values => {
  const errors = {};
  if (!values.ind_first_name) errors.ind_first_name = true;
  if (!values.ind_last_name) errors.ind_last_name = true;
  if (!values.ind_initial) errors.ind_initial = true;

  errors.business_telephone_number = true;
  if (!values.org_name) errors.org_name = true;
  if (!values.org_short_name) errors.org_short_name = true;

  return errors;
};
