import Lo from 'lodash';
import * as Colors from 'cnxapp/src/utils/colorsConstants';
const { ExpenseColors, LINEAR_EXPE_COLORS } = Colors;

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
      exp_business_unit: data.BusinessUnit.Code,
      exp_business_purpose: data.BusinessPurpose,
    };
    return payload;
  }
  return {};
};
export const statusColorMapper = statusCode => {
  switch (statusCode) {
    case 'ALL':
      return ExpenseColors.ALL;
    case 'NEW':
    case 'SAVE':
      return ExpenseColors.SAVED;
    case 'SUBM':
      return ExpenseColors.SUBMITED;
    case 'APPR':
    case 'MAPR':
    case 'AAPR':
      return ExpenseColors.APPROVED;
    case 'REJE':
    case 'MREJ':
    case 'AREJ':
      return ExpenseColors.REJECTED;
    default:
      return ExpenseColors.ALL;
  }
};
export const gradientColorMapper = statusCode => {
  switch (statusCode) {
    case 'ALL':
      return LINEAR_EXPE_COLORS.ALL;
    case 'NEW':
    case 'SAVE':
      return LINEAR_EXPE_COLORS.SAVED;
    case 'SUBM':
      return LINEAR_EXPE_COLORS.SUBMITED;
    case 'APPR':
    case 'MAPR':
    case 'AAPR':
      return LINEAR_EXPE_COLORS.APPROVED;
    case 'REJE':
    case 'MREJ':
    case 'AREJ':
      return LINEAR_EXPE_COLORS.REJECTED;
    default:
      return LINEAR_EXPE_COLORS.ALL;
  }
};
