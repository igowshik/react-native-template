import regexValidators from 'cnxapp/src/utils/regexValidators';

const { Number, Email } = regexValidators;

export const validate = values => {
  const errors = {};
  if (!values.ind_first_name) errors.ind_first_name = true;
  if (!values.ind_last_name) errors.ind_last_name = true;
  if (!values.ind_initial) errors.ind_initial = true;
  if (!values.ind_primary_mobile || !Number.test(values.ind_primary_mobile))
    errors.ind_primary_mobile = true;
  if (!values.business_email || !Email.test(values.business_email))
    errors.business_email = true;
  if (
    !values.business_telephone_number ||
    !Number.test(values.business_telephone_number)
  )
    errors.business_telephone_number = true;
  if (!values.org_name) errors.org_name = true;
  if (!values.org_short_name) errors.org_short_name = true;

  return errors;
};
