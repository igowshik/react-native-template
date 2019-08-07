import Lo from 'lodash';

export const mapGroupedStatusCodeRole = (expenseStatus, expenseCodeRole) => {
  const mappedStatus = [];
  if (expenseCodeRole) {
    expenseStatus.forEach(d => {
      const filterData = Lo.filter(expenseCodeRole, { Value: d.Status })[0];
        d.Description = filterData.Text; //eslint-disable-line
      mappedStatus.push(d);
    });
  }
  return mappedStatus;
};
export const mapStatusCodeRole = (expenseList, expenseCodeRole) => {
  const mappedStatus = [];
  if (expenseCodeRole) {
    expenseList.forEach(d => {
      const filterData = Lo.filter(expenseCodeRole, {
        Value: d.CurrentStatus,
      })[0];
      d.StatusDescription = filterData.Text; //eslint-disable-line
      mappedStatus.push(d);
    });
  }
  return mappedStatus;
};

export const editExpenseMapper = data => {
  if (!Lo.isEmpty(data)) {
    const payload = {
      exp_report_date: new Date(data.ReportDate),
      exp_report_name: data.ReportName,
      exp_business_unit: data.BusinessUnit,
      exp_business_purpose: data.BusinessPurpose,
    };
    return payload;
  }
  return {};
};
