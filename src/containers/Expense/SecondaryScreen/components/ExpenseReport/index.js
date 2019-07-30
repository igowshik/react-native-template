import React, { Component } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Grid, Col } from 'react-native-easy-grid';
// import * as Colors from 'cnxapp/src/utils/colorsConstants';
import ReportItems from './ReportItems';
import ExpenseCard from './ExpenseCard';
import ReportDetails from './ReportDetails';
import ReportReceipts from './ReportReceipts';
import ReportHistory from './ReportHistory';

class ExpenseReport extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
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
const styles = StyleSheet.create({
  rootGrid: {
    height: 200,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  rootView: {
    margin: 20,
    display: 'flex',
    flexDirection: 'row',
  },
});
export default ExpenseReport;
