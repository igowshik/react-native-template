import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import {
  Banner,
  Text,
  ActivityIndicator,
  IconButton,
} from 'react-native-paper';
import { Grid, Col } from 'react-native-easy-grid';
import PropType from 'prop-types';
import { withNavigation, withNavigationFocus } from 'react-navigation';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5Pro';
import { createStructuredSelector } from 'reselect';

import * as Colors from 'cnxapp/src/utils/colorsConstants';
import { CARD_BORDER_RADIUS } from 'cnxapp/src/utils/valueconstants';
import Lo from 'lodash';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Modal from 'react-native-modal';
import ReportItems from '../ReportItems';
import ExpenseCard from './ExpenseCard';
import ReportDetails from './ReportDetails';
import ReportReceipts from '../ReportReceipts';
import ReportHistory from './ReportHistory';
import {
  getExpenseDetails,
  setReceiptPdfViewerVisibility,
} from '../../actions';
import { selectExpenseDetails } from '../../selectors';
import PdfViewer from '../ReportReceipts/PdfViewer';

class ExpenseReport extends Component {
  state = {
    pdfItem: { BlobUrl: '', ReceiptName: '' },
    imgSrc: '',
    imageLoadeState: true,
    imageModalVisible: false,
  };

  componentDidMount() {
    const { navigation, dispatchGetExpense } = this.props;
    const selectedValue = navigation.getParam('expenseKey', 'NO-SELECT');
    dispatchGetExpense(selectedValue);
  }

  handleBackNavigation() {
    const { navigation } = this.props;
    navigation.goBack();
  }

  renderBanner = () => {
    const { expenseDetailsData } = this.props;
    const currentStatus = expenseDetailsData.ExpenseDetail.CurrentStatus.Value.toUpperCase();

    if (currentStatus.includes('REJECTED')) {
      const result = Lo.find(expenseDetailsData.ExpenseHistories.Data, o =>
        o.NewStatus.Value.toUpperCase().includes('REJECTED'),
      );
      if (result)
        return (
          <Banner
            visible
            actions={[]}
            style={{ backgroundColor: '#E74C3C', justifyContent: 'center' }}
          >
            <FontAwesome5 name="vote-nay" color="#fff" size={20} light />
            <Text style={{ color: '#fff' }}>
              {`   Rejected reason: ${result.Comment}`}
            </Text>
          </Banner>
        );
    }
    return null;
  };

  handleImageClick = image => {
    if (image.BlobUrl.includes('.pdf')) {
      this.setState({ pdfItem: image });
      this.props.dispatchSetPdfViewerVisibility(true);
    } else {
      this.setState({ imageModalVisible: true, imgSrc: image.BlobUrl });
    }
  };

  _hideDialog = () => this.setState({ imageModalVisible: false });

  render() {
    const { imageModalVisible, imgSrc, pdfItem } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: Colors.BGCOLOR }}>
        {this.renderBanner()}
        <View style={styles.rootView}>
          <Grid style={styles.rootGrid}>
            <Col size={25}>
              <ExpenseCard />
            </Col>
            <Col size={30}>
              <ReportDetails
                openActionSheet={this.openActionSheetHanlder}
                onBack={() => this.handleBackNavigation()}
              />
            </Col>
          </Grid>
        </View>
        <ScrollView>
          <ReportItems onAttachmentClick={this.handleImageClick} />
          <ReportReceipts
            deleteReceipt={this.handleDeleteReceipt}
            onReceiptClick={this.handleImageClick}
          />
          <ReportHistory />
        </ScrollView>
        <PdfViewer receipt={pdfItem} />
        <Modal isVisible={imageModalVisible} onBackdropPress={this._hideDialog}>
          <View style={styles.content}>
            <Image
              resizeMode="stretch"
              style={{
                width: '100%',
                height: '100%',
                borderRadius: CARD_BORDER_RADIUS,
              }}
              onLoadEnd={() => this.setState({ imageLoadeState: false })}
              onLoadStart={() => this.setState({ imageLoadeState: true })}
              source={{
                isStatic: true,
                uri: `${imgSrc}`,
              }}
            />
            <IconButton
              icon={() => (
                <FontAwesome5
                  name="times-circle"
                  size={30}
                  solid
                  color={Colors.RED}
                />
              )}
              size={30}
              style={styles.close}
              onPress={this._hideDialog}
              color={Colors.RED}
            />
            {this.state.imageLoadeState ? (
              <View style={styles.absolute}>
                <ActivityIndicator animating size="large" />
              </View>
            ) : null}
          </View>
        </Modal>
      </View>
    );
  }
}
ExpenseReport.propTypes = {
  dispatchGetExpense: PropType.func.isRequired,
  expenseDetailsData: PropType.object.isRequired,
  navigation: PropType.any,
  dispatchSetPdfViewerVisibility: PropType.func.isRequired,
};
const styles = StyleSheet.create({
  close: {
    margin: 8,
    position: 'absolute',
    top: 0,
    right: 0,
    width: 50,
    height: 50,
  },
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
  rootGrid: {
    height: 240,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  rootView: {
    margin: 15,
    marginTop: 10,
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row',
  },
  content: {
    backgroundColor: 'white',
    borderRadius: CARD_BORDER_RADIUS,
  },
});
const mapStateToProps = createStructuredSelector({
  expenseDetailsData: selectExpenseDetails(),
});

const mapDispatchToProps = dispatch => ({
  dispatchGetExpense: expenseId => dispatch(getExpenseDetails(expenseId)),
  dispatchSetPdfViewerVisibility: visibility =>
    dispatch(setReceiptPdfViewerVisibility(visibility)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withNavigation,
  withNavigationFocus,
  withConnect,
)(ExpenseReport);
