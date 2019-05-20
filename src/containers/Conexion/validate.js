import regexValidators from 'cnxapp/src/utils/regexValidators';

const { Number, Email } = regexValidators;

export const validate = values => {
  const errors = {};
  if (!values.first_name) errors.first_name = true;
  if (!values.last_name) errors.last_name = true;
  if (!values.job_title) errors.job_title = true;
  if (!values.organization) errors.organization = true;
  if (!values.telephone_number || !Number.test(values.telephone_number))
    errors.telephone_number = true;
  if (!values.business_email || !Email.test(values.business_email))
    errors.business_email = true;
  if (
    !values.business_telephone_number ||
    !Number.test(values.business_telephone_number)
  )
    errors.business_telephone_number = true;
  if (!values.org_name) errors.org_name = true;

  return errors;
};
