import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5Pro';
import { Divider, Card, DataTable, IconButton, Text } from 'react-native-paper';
import { Col, Grid } from 'react-native-easy-grid';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as Colors from 'cnxapp/src/utils/colorsConstants';
import { getDateByFormat } from 'cnxapp/src/utils/DateFormatter';
import { createStructuredSelector } from 'reselect';
import { selectExpenseDetails } from '../../selectors';
import { getExpenseReportReceipts } from '../../actions';

class ReportReceipts extends React.PureComponent {
  receiptItems = ExpenseReceipts =>
    ExpenseReceipts.map(item => (
      <DataTable.Row key={item.ExpenseReceiptId}>
        <DataTable.Cell>
          <Text style={styles.linkText}>{item.ReceiptName}</Text>
        </DataTable.Cell>
        <DataTable.Cell>{item.ExpenseItemId}</DataTable.Cell>
        <DataTable.Cell>
          {getDateByFormat(item.UpdatedDate, 'L')}
        </DataTable.Cell>
        <DataTable.Cell>{item.Comment ? item.Comment : ''}</DataTable.Cell>
      </DataTable.Row>
    ));

  renderPageNumber = pagingDetail => {
    const { dispatchGetExpenseReportReceipts } = this.props;
    if (pagingDetail.TotalPages <= 1) return null;
    return (
      <DataTable.Pagination
        page={pagingDetail.CurrentPageNumber}
        numberOfPages={pagingDetail.TotalPages}
        onPageChange={page => dispatchGetExpenseReportReceipts(page)}
        label={
          `${pagingDetail.CurrentPageNumber}` +
          '  of  ' +
          `${pagingDetail.TotalPages}`
        }
      />
    );
  };

  render() {
    const { expenseDetailsData } = this.props;
    return (
      <View style={{ flex: 1, margin: 10 }}>
        <Card elevation={4} style={styles.card}>
          <Card.Title
            title="Expense Report Receipts"
            left={leftProps => (
              <View
                style={[
                  styles.iconRoundBackground,
                  { backgroundColor: '#FFDBE6', borderColor: '#FA2A6C' },
                ]}
                {...leftProps}
              >
                <FontAwesome5 name="receipt" color="#FA2A6C" size={20} light />
              </View>
            )}
            right={rightProps =>
              expenseDetailsData.ExpenseUIActions.EnableSubmit ? (
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
                  // onPress={() => console.log('Pressed')}
                />
              ) : null
            }
          />
          <Divider />
          <Card.Content>
            <Grid>
              <Col>
                <DataTable>
                  <DataTable.Header>
                    <DataTable.Title>Name</DataTable.Title>
                    <DataTable.Title>Transaction Id</DataTable.Title>
                    <DataTable.Title>Uploaded On</DataTable.Title>
                    <DataTable.Title>Comment</DataTable.Title>
                  </DataTable.Header>
                  {this.receiptItems(expenseDetailsData.ExpenseReceipts.Data)}
                  {this.renderPageNumber(
                    expenseDetailsData.ExpenseReceipts.PagingDetail,
                  )}
                </DataTable>
              </Col>
            </Grid>
          </Card.Content>
        </Card>
      </View>
    );
  }
}

ReportReceipts.propTypes = {
  data: PropTypes.object,
  expenseDetailsData: PropTypes.object,
  dispatchGetExpenseReportReceipts: PropTypes.func.isRequired,
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
});
const mapDispatchToProps = dispatch => ({
  dispatchGetExpenseReportReceipts: pageNumber =>
    dispatch(getExpenseReportReceipts(pageNumber)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ReportReceipts);
