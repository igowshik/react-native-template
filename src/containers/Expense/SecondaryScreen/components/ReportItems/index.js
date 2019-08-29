import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Lo from 'lodash';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5Pro';
import { Divider, Card, DataTable, IconButton, Text } from 'react-native-paper';

import { Col, Grid } from 'react-native-easy-grid';
import * as Colors from 'cnxapp/src/utils/colorsConstants';
import { createStructuredSelector } from 'reselect';
import Swipeout from 'react-native-swipeout';
import Dialog from 'cnxapp/src/components/Dialog';
import { getDateByFormat } from 'cnxapp/src/utils/DateFormatter';
import { CARD_BORDER_RADIUS } from 'cnxapp/src/utils/valueconstants';
import {
  selectExpenseDetails,
  selectReportItemModalVisibility,
} from '../../selectors';
import {
  getExpenseReportItems,
  setCreateReportItemModalVisibility,
  setExpenseReportItemsQuery,
  setDeleteExpenceReportItem,
  setEditReportItemModalVisibility,
} from '../../actions';
import EditReportItem from '../EditReportItem';
import CreateReportItem from './CreateReportItem';
import { DELETE_REPORT_ITEM_MESSAGE } from '../../../constants';
import { editExpenseItemMapper } from '../../../mappers';
const uuidv1 = require('uuid/v1');

class ReportItems extends React.Component {
  state = {
    dialogVisible: false,
    selectedReportItemId: null,
    mappedValues: {
      ri_transaction_date: new Date(),
      riExpenseType: '',
      riMiles: '',
      riStandardMileageRate: '',
      ri_payment_Type: '',
      riAmount: '',
      ri_business_purpose: '',
      ri_comment: '',
      riExpReceipt: [],
    },
    editReportItem: {},
  };

  handleViewAttachment = expenseItemId => {
    const { expenseDetailsData, onAttachmentClick } = this.props;
    const expReceipt = Lo.find(expenseDetailsData.ExpenseReceipts.Data, {
      ExpenseItemId: expenseItemId,
    });
    if (expReceipt) onAttachmentClick(expReceipt);
  };

  onDialogDismiss = () => this.setState({ dialogVisible: false });

  onDialogConfirm = () => {
    this.setState({ dialogVisible: false });
    this.props.dispatchDeleteExpenseReportItem(this.state.selectedReportItemId);
  };

  swipeDelete = Item => {
    this.setState({
      dialogVisible: true,
      selectedReportItemId: Item.ExpenseItemId,
    });
  };

  editExpenseItem = item => {
    const { expenseDetailsData } = this.props;

    const formValues = editExpenseItemMapper(item);
    if (item.HasReceipts) {
      const expReceipt = Lo.find(expenseDetailsData.ExpenseReceipts.Data, {
        ExpenseItemId: item.ExpenseItemId,
      });
      formValues.riExpReceipt.push(expReceipt.BlobUrl);
    }

    this.setState({
      mappedValues: formValues,
      editReportItem: item,
    });
    this.props.dispatchEditExpenseItemModalState(true);
  };

  swipeRightButton = item => [
    {
      component: (
        <View
          style={[
            styles.iconRoundActions,
            {
              backgroundColor: '#F5ECFF',
              marginTop: 4,
            },
          ]}
        >
          <IconButton
            icon={() => (
              <FontAwesome5
                name="marker"
                color={Colors.PURPLE}
                size={16}
                solid
              />
            )}
            size={18}
            color={Colors.PURPLE}
            onPress={() => this.editExpenseItem(item)}
          />
        </View>
      ),
      backgroundColor: 'transparent',
      underlayColor: 'transparent',
      onPress: () => {
        this.editExpenseItem(item);
      },
    },
    {
      component: (
        <View
          style={[
            styles.iconRoundActions,
            {
              backgroundColor: '#FFECEC',
              marginTop: 4,
            },
          ]}
        >
          <IconButton
            icon={() => (
              <FontAwesome5 name="trash" color={Colors.RED} size={16} solid />
            )}
            size={18}
            color={Colors.RED}
            onPress={() => this.swipeDelete(item)}
          />
        </View>
      ),
      backgroundColor: 'transparent',
      underlayColor: 'transparent',
      onPress: () => this.swipeDelete(item),
    },
  ];

  tableItems = ExpenseItems =>
    ExpenseItems.map(item => (
      <Swipeout
        right={this.swipeRightButton(item)}
        autoClose
        buttonWidth={75}
        backgroundColor="transparent"
        disabled={!this.props.expenseDetailsData.ExpenseUIActions.EnableSubmit}
        key={uuidv1()}
        // style={{ borderColor: 'rgba(0,0,0,0.2)', borderBottomWidth: 0.5 }}
      >
        <DataTable.Row key={item.ExpenseItemId}>
          <DataTable.Cell>{item.ExpenseItemId}</DataTable.Cell>
          <DataTable.Cell>
            {getDateByFormat(item.TransactionDate, 'L')}
          </DataTable.Cell>
          <DataTable.Cell>
            {item.ExpenseType.Value ? item.ExpenseType.Value : ''}
          </DataTable.Cell>
          <DataTable.Cell>{item.Miles ? item.Miles : ''}</DataTable.Cell>
          <DataTable.Cell>
            {item.PaymentType.Value ? item.PaymentType.Value : ''}
          </DataTable.Cell>
          <DataTable.Cell>{item.BusinessPurpose}</DataTable.Cell>
          <DataTable.Cell>
            <Text style={styles.linkText}>$ {item.Amount}</Text>
          </DataTable.Cell>
          <DataTable.Cell>
            {item.HasReceipts ? (
              <FontAwesome5
                name="paperclip"
                size={20}
                light
                color={Colors.BLUE}
                onPress={() => this.handleViewAttachment(item.ExpenseItemId)}
              />
            ) : null}
          </DataTable.Cell>
        </DataTable.Row>
      </Swipeout>
    ));

  renderPaging = pageDetail => {
    const {
      dispatchGetExpenseReportItems,
      dispatchSetExpenseReportItemsQuery,
    } = this.props;
    if (pageDetail.TotalPages <= 1) return null;
    return (
      <DataTable.Pagination
        page={pageDetail.CurrentPageNumber - 1}
        numberOfPages={pageDetail.TotalPages}
        onPageChange={page => {
          dispatchSetExpenseReportItemsQuery(page + 1);
          dispatchGetExpenseReportItems();
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
      riStandardMileageRate: '0.00',
      riAmount: '0',
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
            right={rightProps =>
              expenseDetailsData.ExpenseUIActions.EnableEdit ? (
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
              ) : null
            }
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
                    <DataTable.Title>Attachments</DataTable.Title>
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

        <EditReportItem
          initialValues={this.state.mappedValues}
          reportItem={this.state.editReportItem}
        />
        <Dialog
          visible={this.state.dialogVisible}
          title="Delete!"
          message={DELETE_REPORT_ITEM_MESSAGE}
          onDismiss={this.onDialogDismiss}
          onConfirm={this.onDialogConfirm}
        />
      </View>
    );
  }
}

ReportItems.propTypes = {
  data: PropTypes.object,
  expenseDetailsData: PropTypes.object,
  dispatchSetExpenseReportItemsQuery: PropTypes.func.isRequired,
  dispatchGetExpenseReportItems: PropTypes.func.isRequired,
  dispatchDeleteExpenseReportItem: PropTypes.func.isRequired,
  reportItemModalVisibility: PropTypes.bool,
  dispatchModalStateVisibility: PropTypes.func.isRequired,
  dispatchEditExpenseItemModalState: PropTypes.func.isRequired,
  onAttachmentClick: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  absolute: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  iconRoundBackground: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 45,
    height: 45,
    borderRadius: 100,
  },
  iconRoundActions: {
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 80,
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
  content: {
    backgroundColor: 'white',
    borderRadius: CARD_BORDER_RADIUS,
  },
  close: {
    margin: 8,
    position: 'absolute',
    top: 0,
    right: 0,
    width: 50,
    height: 50,
  },
});

const mapStateToProps = createStructuredSelector({
  expenseDetailsData: selectExpenseDetails(),
  reportItemModalVisibility: selectReportItemModalVisibility(),
});
const mapDispatchToProps = dispatch => ({
  dispatchSetExpenseReportItemsQuery: pageNumber =>
    dispatch(setExpenseReportItemsQuery(pageNumber)),
  dispatchModalStateVisibility: visibility =>
    dispatch(setCreateReportItemModalVisibility(visibility)),
  dispatchGetExpenseReportItems: () => dispatch(getExpenseReportItems()),
  dispatchDeleteExpenseReportItem: reportItemId =>
    dispatch(setDeleteExpenceReportItem(reportItemId)),
  dispatchEditExpenseItemModalState: visibility =>
    dispatch(setEditReportItemModalVisibility(visibility)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ReportItems);
