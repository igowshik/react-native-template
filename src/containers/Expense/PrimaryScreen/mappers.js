import Lo from 'lodash';

export const mapGroupedStatusCodeRole = (expenseStatus, expenseCodeRole) => {
  const mappedStatus = [];
  expenseStatus.forEach(d => {
    const filterData = Lo.filter(expenseCodeRole, { Value: d.Status })[0];
      d.Description = filterData.Description; //eslint-disable-line
    mappedStatus.push(d);
  });
  return mappedStatus;
};
export const mapStatusCodeRole = (expenseList, expenseCodeRole) => {
  const mappedStatus = [];
  expenseList.forEach(d => {
    const filterData = Lo.filter(expenseCodeRole, {
      Value: d.CurrentStatus,
    })[0];
      d.StatusDescription = filterData.Description; //eslint-disable-line
    mappedStatus.push(d);
  });
  return mappedStatus;
};
