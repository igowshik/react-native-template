import React, { Component } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Banner, Text } from 'react-native-paper';
import { Grid, Col } from 'react-native-easy-grid';
import PropType from 'prop-types';
import { withNavigation, withNavigationFocus } from 'react-navigation';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5Pro';
import { createStructuredSelector } from 'reselect';

import * as Colors from 'cnxapp/src/utils/colorsConstants';
import Lo from 'lodash';
import { compose } from 'redux';
import { connect } from 'react-redux';
import ReportItems from '../ReportItems';
import ExpenseCard from './ExpenseCard';
import ReportDetails from './ReportDetails';
import ReportReceipts from './ReportReceipts';
import ReportHistory from './ReportHistory';
import { getExpenseDetails } from '../../actions';
import { selectExpenseDetails } from '../../selectors';

class ExpenseReport extends Component {
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
    const currentStatus = expenseDetailsData.ExpenseDetail.CurrentStatus.toUpperCase();

    if (currentStatus.includes('REJECTED')) {
      const result = Lo.find(expenseDetailsData.ExpenseHistories.Data, o =>
        o.NewStatus.toUpperCase().includes('REJECTED'),
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

  render() {
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
          <ReportItems />
          <ReportReceipts />
          <ReportHistory />
        </ScrollView>
      </View>
    );
  }
}
ExpenseReport.propTypes = {
  dispatchGetExpense: PropType.func.isRequired,
  expenseDetailsData: PropType.object.isRequired,
  navigation: PropType.any,
};
const styles = StyleSheet.create({
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
});
const mapStateToProps = createStructuredSelector({
  expenseDetailsData: selectExpenseDetails(),
});

const mapDispatchToProps = dispatch => ({
  dispatchGetExpense: expenseId => dispatch(getExpenseDetails(expenseId)),
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
