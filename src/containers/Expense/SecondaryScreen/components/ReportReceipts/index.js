import React from 'react';
import { View, StyleSheet, FlatList, Image, Text } from 'react-native';
import PropTypes from 'prop-types';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5Pro';
import { Divider, Card, IconButton } from 'react-native-paper';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as Colors from 'cnxapp/src/utils/colorsConstants';
import Modal from 'react-native-modal';
import { CARD_BORDER_RADIUS } from 'cnxapp/src/utils/valueconstants';

// import { getDateByFormat } from 'cnxapp/src/utils/DateFormatter';
import { createStructuredSelector } from 'reselect';
import { selectExpenseDetails } from '../../selectors';
import { getExpenseReportReceipts } from '../../actions';
import ReportReceiptItem from './ReportReceiptItem';

class ReportReceipts extends React.Component {
  state = { imageModalVisible: false, imgSrc: '' };

  _hideDialog = () => this.setState({ imageModalVisible: false });

  handleImageClick = image =>
    this.setState({ imageModalVisible: true, imgSrc: image });

  renderReceipts = () => {
    const { expenseDetailsData } = this.props;
    if (expenseDetailsData.ExpenseReceipts.PagingDetail.TotalItems >= 1) {
      return (
        <FlatList
          data={expenseDetailsData.ExpenseReceipts.Data}
          renderItem={({ item }) => (
            <ReportReceiptItem item={item} onClick={this.handleImageClick} />
          )}
          numColumns={3}
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

  render() {
    const { expenseDetailsData } = this.props;
    const { imageModalVisible, imgSrc } = this.state;
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
                  // onPress={() => console.log('Pressed')}
                />
              ) : null
            }
          />
          <Divider />
          <Card.Content>
            <View style={styles.MainContainer}>{this.renderReceipts()}</View>
            <Modal
              isVisible={imageModalVisible}
              onBackdropPress={() => this._hideDialog}
            >
              <View style={styles.content}>
                <Image
                  resizeMode="stretch"
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: CARD_BORDER_RADIUS,
                  }}
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
                      light
                      color={Colors.RED}
                    />
                  )}
                  size={30}
                  style={styles.close}
                  onPress={this._hideDialog}
                  color={Colors.RED}
                />
              </View>
            </Modal>
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
  MainContainer: {
    justifyContent: 'center',
    flex: 1,
    paddingTop: 10,
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
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ReportReceipts);
