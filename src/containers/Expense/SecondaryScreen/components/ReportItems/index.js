import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5Pro';
import { Divider, Card, DataTable, IconButton } from 'react-native-paper';
import { Col, Grid } from 'react-native-easy-grid';
import * as Colors from 'cnxapp/src/utils/colorsConstants';
import { createStructuredSelector } from 'reselect';
import { getDateByFormat } from 'cnxapp/src/utils/DateFormatter';
import {
  selectExpenseDetails,
  selectReportItemModalVisibility,
} from '../../selectors';
import {
  getExpenseReportItems,
  setCreateReportItemModalVisibility,
} from '../../actions';
import CreateReportItem from './CreateReportItem';

class ReportItems extends React.Component {
  tableItems = ExpenseItems =>
    ExpenseItems.map(item => (
      <DataTable.Row key={item.ExpenseItemId}>
        <DataTable.Cell>{item.ExpenseItemId}</DataTable.Cell>
        <DataTable.Cell>
          {getDateByFormat(item.TransactionDate, 'L')}
        </DataTable.Cell>
        <DataTable.Cell>{item.ExpenseType}</DataTable.Cell>
        <DataTable.Cell>{item.Miles ? item.Miles : ''}</DataTable.Cell>
        <DataTable.Cell>
          {item.PaymentType ? item.PaymentType : ''}
        </DataTable.Cell>
        <DataTable.Cell>{item.BusinessPurpose}</DataTable.Cell>
        <DataTable.Cell>{item.Amount}</DataTable.Cell>
        <DataTable.Cell>$500.00</DataTable.Cell>
      </DataTable.Row>
    ));

  renderPaging = pageDetail => {
    const { dispatchGetExpenseReportItems } = this.props;
    if (pageDetail.TotalPages <= 1) return null;
    return (
      <DataTable.Pagination
        page={pageDetail.CurrentPageNumber}
        numberOfPages={pageDetail.TotalPages}
        onPageChange={page => {
          dispatchGetExpenseReportItems(page);
        }}
        label={
          `${pageDetail.CurrentPageNumber}` +
          '  of  ' +
          `${pageDetail.TotalPages}`
        }
      />
    );
  };

  render() {
    const {
      expenseDetailsData,
      reportItemModalVisibility,
      dispatchModalStateVisibility,
    } = this.props;
    const intialValues = {
      ri_transaction_date: new Date(),
      ri_standard_mileage_rate: 'test',
    };
    return (
      <View style={{ flex: 1, margin: 10 }}>
        <Card elevation={4} style={styles.card}>
          <Card.Title
            title="Expense Report Items"
            left={leftProps => (
              <View
                style={[
                  styles.iconRoundBackground,
                  { backgroundColor: '#D0FCE2', borderColor: '#21D66C' },
                ]}
                {...leftProps}
              >
                <FontAwesome5 name="list-ul" color="#1F914E" size={20} light />
              </View>
            )}
            right={rightProps => (
              <IconButton
                {...rightProps}
                icon={() => (
                  <FontAwesome5
                    name="plus-circle"
                    color={Colors.PRIMARY}
                    size={25}
                    light
                  />
                )}
                style={{ height: 50, width: 50 }}
                color={Colors.PRIMARY}
                onPress={() => dispatchModalStateVisibility(true)}
              />
            )}
          />
          <Divider />
          <Card.Content>
            <Grid>
              <Col>
                <DataTable>
                  <DataTable.Header>
                    <DataTable.Title>Transaction Id</DataTable.Title>
                    <DataTable.Title>Transaction Date</DataTable.Title>
                    <DataTable.Title>Expense Type</DataTable.Title>
                    <DataTable.Title>Miles</DataTable.Title>
                    <DataTable.Title>Payment Type</DataTable.Title>
                    <DataTable.Title>Business Purpose</DataTable.Title>
                    <DataTable.Title>Amount</DataTable.Title>
                    <DataTable.Title>Action</DataTable.Title>
                  </DataTable.Header>
                  {this.tableItems(expenseDetailsData.ExpenseItems.Data)}
                  {this.renderPaging(
                    expenseDetailsData.ExpenseItems.PagingDetail,
                  )}
                </DataTable>
              </Col>
            </Grid>
          </Card.Content>
        </Card>
        <CreateReportItem
          modalOpen={reportItemModalVisibility}
          initialValues={intialValues}
        />
      </View>
    );
  }
}

ReportItems.propTypes = {
  data: PropTypes.object,
  expenseDetailsData: PropTypes.object,
  dispatchGetExpenseReportItems: PropTypes.func.isRequired,
  reportItemModalVisibility: PropTypes.bool,
  dispatchModalStateVisibility: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  iconRoundBackground: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 45,
    height: 45,
    borderRadius: 100,
  },
  linkText: {
    color: Colors.LINK,
  },
  propTag: {
    fontWeight: 'bold',
  },
  card: {
    borderRadius: 15,
  },
});

const mapStateToProps = createStructuredSelector({
  expenseDetailsData: selectExpenseDetails(),
  reportItemModalVisibility: selectReportItemModalVisibility(),
});
const mapDispatchToProps = dispatch => ({
  dispatchGetExpenseReportItems: pageNumber =>
    dispatch(getExpenseReportItems(pageNumber)),
  dispatchModalStateVisibility: visibility =>
    dispatch(setCreateReportItemModalVisibility(visibility)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ReportItems);
