export const validate = values => {
  const errors = {};
  if (!values.exp_report_name) errors.exp_report_name = true;
  if (!values.exp_business_unit) errors.exp_business_unit = true;
  return errors;
};

export const reportItemFormValidate = values => {
  const errors = {};
  if (!values.ri_business_purpose) errors.ri_business_purpose = true;
  if (!values.riExpenseType) errors.riExpenseType = true;
  return errors;
};
