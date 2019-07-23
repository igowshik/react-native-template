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
