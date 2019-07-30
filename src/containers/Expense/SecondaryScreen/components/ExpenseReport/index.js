import React, { Component } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Grid, Col } from 'react-native-easy-grid';
import * as Colors from 'cnxapp/src/utils/colorsConstants';
import PropType from 'prop-types';
import { withNavigation, withNavigationFocus } from 'react-navigation';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import ReportItems from './ReportItems';
import ExpenseCard from './ExpenseCard';
import ReportDetails from './ReportDetails';
import ReportReceipts from './ReportReceipts';
import ReportHistory from './ReportHistory';
import { getExpenseDetails } from '../../actions';

class ExpenseReport extends Component {
  componentDidMount() {
    const { navigation, dispatchGetExpense } = this.props;
    const selectedValue = navigation.getParam('expenseKey', 'NO-SELECT');
    dispatchGetExpense(selectedValue);
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: Colors.BGCOLOR }}>
        <View style={styles.rootView}>
          <Grid style={styles.rootGrid}>
            <Col size={25}>
              <ExpenseCard />
            </Col>
            <Col size={30}>
              <ReportDetails openActionSheet={this.openActionSheetHanlder} />
            </Col>
          </Grid>
        </View>
        <ScrollView>
          <ReportHistory />
          <ReportItems />
          <ReportReceipts />
        </ScrollView>
      </View>
    );
  }
}
ExpenseReport.propTypes = {
  dispatchGetExpense: PropType.func.isRequired,
  navigation: PropType.any,
};
const styles = StyleSheet.create({
  rootGrid: {
    height: 200,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  rootView: {
    margin: 15,
    display: 'flex',
    flexDirection: 'row',
  },
});
const mapStateToProps = createStructuredSelector({
  // expenseDetails: selectExpenseDetails(),
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
