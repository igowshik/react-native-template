import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5Pro';
import { Divider, Card, DataTable, IconButton } from 'react-native-paper';
import { Col, Grid } from 'react-native-easy-grid';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as Colors from 'cnxapp/src/utils/colorsConstants';
import { getDateByFormat } from 'cnxapp/src/utils/DateFormatter';
import { createStructuredSelector } from 'reselect';
import { selectExpenseDetails } from '../../selectors';

const receiptItems = ExpenseReceipts =>
  ExpenseReceipts.map(item => (
    <DataTable.Row key={item.ExpenseReceiptId}>
      <DataTable.Cell>{item.ReceiptName}</DataTable.Cell>
      <DataTable.Cell>{item.ExpenseItemId}</DataTable.Cell>
      <DataTable.Cell>{getDateByFormat(item.UpdatedDate, 'L')}</DataTable.Cell>
      <DataTable.Cell>{item.Comment ? item.Comment : ''}</DataTable.Cell>
      <DataTable.Cell>Credit Card</DataTable.Cell>
    </DataTable.Row>
  ));

const ReportReceipts = props => {
  const { expenseDetailsData } = props;
  return (
    <View style={{ flex: 1, margin: 15 }}>
      <Card elevation={4}>
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
              // onPress={() => console.log('Pressed')}
            />
          )}
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
                  <DataTable.Title>Actions</DataTable.Title>
                </DataTable.Header>
                {receiptItems(expenseDetailsData.ExpenseReceipts.Data)}
                {/* <DataTable.Row>
                  <DataTable.Cell>263</DataTable.Cell>
                  <DataTable.Cell>7/26/2019</DataTable.Cell>
                  <DataTable.Cell>Travel - Fuel</DataTable.Cell>
                  <DataTable.Cell>23</DataTable.Cell>
                  <DataTable.Cell>Credit Card</DataTable.Cell>
                </DataTable.Row> */}
                <DataTable.Pagination
                  page={
                    expenseDetailsData.ExpenseReceipts.PagingDetail
                      .CurrentPageNumber
                  }
                  numberOfPages={
                    expenseDetailsData.ExpenseReceipts.PagingDetail.TotalPages
                  }
                  // onPageChange={page => {
                  //   console.log(page);
                  // }}
                  label="1-2 of 6"
                />
              </DataTable>
            </Col>
          </Grid>
        </Card.Content>
      </Card>
    </View>
  );
};

ReportReceipts.propTypes = {
  data: PropTypes.object,
  expenseDetailsData: PropTypes.object,
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
});

const mapStateToProps = createStructuredSelector({
  expenseDetailsData: selectExpenseDetails(),
});

const withConnect = connect(
  mapStateToProps,
  null,
);

export default compose(withConnect)(ReportReceipts);
