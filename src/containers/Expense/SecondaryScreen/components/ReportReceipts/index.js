import React from 'react';
import { View, StyleSheet, FlatList, Text, Alert } from 'react-native';
import PropTypes from 'prop-types';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5Pro';
import { Divider, Card, IconButton } from 'react-native-paper';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as Colors from 'cnxapp/src/utils/colorsConstants';
import ImagePicker from 'react-native-image-picker';
import Permissions from 'react-native-permissions';

import { CARD_BORDER_RADIUS } from 'cnxapp/src/utils/valueconstants';
import { isPermissionEnabled } from 'cnxapp/src/containers/Expense/mappers';
import Dialog from 'cnxapp/src/components/Dialog';

import { createStructuredSelector } from 'reselect';
import { selectExpenseDetails } from '../../selectors';
import {
  getExpenseReportReceipts,
  setNewExpReceipt,
  createNewExpReceipt,
  deleteExpenseReceipt,
} from '../../actions';
import ReportReceiptItem from './ReportReceiptItem';
import { DELETE_RECEIPT_MESSAGE } from '../../constants';

class ReportReceipts extends React.Component {
  state = {
    receiptId: '',
    deleteReceiptConfirmationVisible: false,
  };

  openFilePicker = () => {
    const {
      dispatchSetNewExpReceipt,
      expenseDetailsData,
      dispatchCreateNewExpReceipt,
    } = this.props;
    const options = {
      title: 'Select Receipt',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      quality: 0.2,
      permissionDenied: {
        title: 'Permission denied',
        text:
          'To be able to take pictures with your camera and choose images from your library.',
        reTryTitle: 're-try',
        okTitle: "I'm sure",
      },
    };

    Permissions.checkMultiple(['camera', 'photo']).then(response => {
      const hasCameraPermission = isPermissionEnabled(response.camera);
      const hasPhotoPermission = isPermissionEnabled(response.photo);
      if (hasCameraPermission && hasPhotoPermission) {
        ImagePicker.showImagePicker(options, controlResponse => {
          if (controlResponse.data) {
            const receiptObj = {
              ExpenseId: expenseDetailsData.ExpenseDetail.ExpenseId.toString(),
              Receipts: [],
            };
            receiptObj.Receipts.push(controlResponse.data);
            dispatchSetNewExpReceipt(receiptObj);
            dispatchCreateNewExpReceipt();
          }
        });
      } else {
        let permissionMessage = '';
        if (!hasCameraPermission)
          permissionMessage += 'Camera permission is disabled. ';

        if (!hasPhotoPermission)
          permissionMessage += 'Photo album permission is disabled. ';

        permissionMessage += 'Enable permission from Settings -> BOAST';
        Alert.alert(
          'Permission required!',
          permissionMessage,
          [
            {
              text: 'OK',
              style: 'cancel',
            },
          ],
          { cancelable: true },
        );
      }
    });
  };

  renderReceipts = () => {
    const { expenseDetailsData } = this.props;
    if (expenseDetailsData.ExpenseReceipts.PagingDetail.TotalItems >= 1) {
      return (
        <FlatList
          data={expenseDetailsData.ExpenseReceipts.Data}
          renderItem={({ item }) => (
            <ReportReceiptItem
              item={item}
              onClick={() => this.props.onReceiptClick(item)}
              deleteReceipt={this.handleDeleteReceipt}
              isDeleteEnabled={expenseDetailsData.ExpenseUIActions.EnableEdit}
            />
          )}
          numColumns={10}
          keyExtractor={(item, index) => index.toString()}
        />
      );
    }

    return (
      <View style={styles.noDataContainer}>
        <FontAwesome5 name="info-circle" color={Colors.GREY} size={25} light />
        <Text style={styles.noDataText}>No Data</Text>
      </View>
    );
  };

  handleDeleteReceipt = receiptId =>
    this.setState({
      receiptId,
      deleteReceiptConfirmationVisible: true,
    });

  onDialogDismiss = () =>
    this.setState({ deleteReceiptConfirmationVisible: false });

  onDialogConfirm = () => {
    this.props.dispatchDeleteReportReceipt(this.state.receiptId);
    this.setState({ deleteReceiptConfirmationVisible: false });
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
                  onPress={this.openFilePicker}
                />
              ) : null
            }
          />
          <Divider />
          <Card.Content>
            <View style={styles.MainContainer}>{this.renderReceipts()}</View>
          </Card.Content>
        </Card>
        <Dialog
          visible={this.state.deleteReceiptConfirmationVisible}
          title="Delete!"
          message={DELETE_RECEIPT_MESSAGE}
          onDismiss={this.onDialogDismiss}
          onConfirm={this.onDialogConfirm}
        />
      </View>
    );
  }
}

ReportReceipts.propTypes = {
  data: PropTypes.object,
  expenseDetailsData: PropTypes.object,
  dispatchGetExpenseReportReceipts: PropTypes.func.isRequired,
  dispatchSetNewExpReceipt: PropTypes.func.isRequired,
  dispatchCreateNewExpReceipt: PropTypes.func.isRequired,
  dispatchDeleteReportReceipt: PropTypes.func.isRequired,
  onReceiptClick: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    flex: 1,
    paddingTop: 10,
  },
  content: {
    backgroundColor: 'white',
    borderRadius: CARD_BORDER_RADIUS,
  },
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
  noDataText: { fontSize: 15, color: Colors.GREY },
  noDataContainer: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

const mapStateToProps = createStructuredSelector({
  expenseDetailsData: selectExpenseDetails(),
});
const mapDispatchToProps = dispatch => ({
  dispatchGetExpenseReportReceipts: pageNumber =>
    dispatch(getExpenseReportReceipts(pageNumber)),
  dispatchSetNewExpReceipt: expReceipt =>
    dispatch(setNewExpReceipt(expReceipt)),
  dispatchCreateNewExpReceipt: () => dispatch(createNewExpReceipt()),
  dispatchDeleteReportReceipt: receiptId =>
    dispatch(deleteExpenseReceipt(receiptId)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ReportReceipts);
