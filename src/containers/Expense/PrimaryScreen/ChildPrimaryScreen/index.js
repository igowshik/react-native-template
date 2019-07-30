import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import {
  Text,
  IconButton,
  TouchableRipple,
  Surface,
  Divider,
  Button,
} from 'react-native-paper';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5Pro';
import { Row, Col } from 'react-native-easy-grid';

// Absolute Imports
import * as colors from 'cnxapp/src/utils/colorsConstants';
import { getDateByFormat, getDateBefore } from 'cnxapp/src/utils/DateFormatter';
import DateTimePicker from 'cnxapp/src/components/DateTimePicker';

import ExpenseList from './ExpenseList';
import { setExpenseHistoryFilter, getExpenseHistoryList } from '../actions';
import { selectExpenseHistoryQuery } from '../selectors';

class ExpenseHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fromDateVisible: false,
      toDateVisible: false,
    };
  }

  componentDidMount() {
    const {
      dispatchSetExpenseHistoryFilter,
      dispatchGetHistoryExpenses,
    } = this.props;
    dispatchSetExpenseHistoryFilter({
      StartDate: getDateByFormat(getDateBefore(180), 'L'),
      EndDate: getDateByFormat(new Date(new Date().setHours(24, 0, 0, 0)), 'L'),
      PageSize: 20,
      PageNumber: 1,
      Status: 'EXTR',
    });
    dispatchGetHistoryExpenses();
  }

  showFromDatePicker = () => this.setState({ fromDateVisible: true });

  showToDatePicker = () => this.setState({ toDateVisible: true });

  handleDatePicked = date => {
    const { fromDateVisible, toDateVisible } = this.state;
    const { dispatchSetExpenseHistoryFilter, expenseFilters } = this.props;
    if (fromDateVisible) {
      dispatchSetExpenseHistoryFilter({
        ...expenseFilters,
        StartDate: getDateByFormat(date, 'L'),
      });
    }
    if (toDateVisible) {
      dispatchSetExpenseHistoryFilter({
        ...expenseFilters,
        EndDate: getDateByFormat(date, 'L'),
      });
    }
    this.hideDateTimePicker();
  };

  hideDateTimePicker = () => {
    const { fromDateVisible, toDateVisible } = this.state;
    if (fromDateVisible) this.setState({ fromDateVisible: false });
    if (toDateVisible) this.setState({ toDateVisible: false });
  };

  getSelectedDate = () => {
    const { fromDateVisible, toDateVisible } = this.state;
    const { expenseFilters } = this.props;
    if (fromDateVisible) return new Date(expenseFilters.StartDate);
    if (toDateVisible) return new Date(expenseFilters.EndDate);
    return new Date();
  };

  applyDateFilter = () => {
    const { dispatchGetHistoryExpenses } = this.props;
    dispatchGetHistoryExpenses();
  };

  render() {
    const { expenseFilters } = this.props;

    return (
      <View style={{ flex: 1, backgroundColor: colors.BGCOLOR }}>
        <Surface style={{ elevation: 4 }}>
          <Row style={{ height: 'auto' }}>
            <Col>
              <TouchableRipple onPress={this.showFromDatePicker}>
                <View style={styles.dateView}>
                  <IconButton
                    icon={() => (
                      <FontAwesome5
                        name="calendar-plus"
                        color={colors.SECONDARY}
                        size={20}
                        light
                      />
                    )}
                    color={colors.SECONDARY}
                    mode="outlined"
                    onPress={this.showFromDatePicker}
                  />
                  <Text>From: </Text>
                  <Text style={styles.dateText}>
                    {` ${getDateByFormat(
                      expenseFilters.StartDate
                        ? expenseFilters.StartDate
                        : new Date(),
                      'L',
                    )}`}
                  </Text>
                </View>
              </TouchableRipple>
            </Col>
            <Col>
              <TouchableRipple onPress={this.showToDatePicker}>
                <View style={styles.dateView}>
                  <IconButton
                    icon={() => (
                      <FontAwesome5
                        name="calendar-plus"
                        color={colors.SECONDARY}
                        size={20}
                        light
                      />
                    )}
                    color={colors.SECONDARY}
                    mode="outlined"
                    onPress={this.showToDatePicker}
                  />
                  <Text>To: </Text>
                  <Text style={styles.dateText}>{` ${getDateByFormat(
                    expenseFilters.EndDate
                      ? expenseFilters.EndDate
                      : new Date(),
                    'L',
                  )}`}</Text>
                </View>
              </TouchableRipple>
            </Col>
            <Col style={styles.filterView}>
              <Button
                icon={() => (
                  <FontAwesome5 color="#fff" name="filter" size={15} />
                )}
                mode="contained"
                color={colors.PURPLE}
                onPress={this.applyDateFilter}
                uppercase
                solid
              >
                Filter
              </Button>
            </Col>
          </Row>
          <Divider />
          <DateTimePicker
            value={this.getSelectedDate()}
            mode="date"
            visible={this.state.fromDateVisible || this.state.toDateVisible}
            onDateSelect={this.handleDatePicked}
            onCancel={this.hideDateTimePicker}
          />
        </Surface>
        <ExpenseList />
      </View>
    );
  }
}

ExpenseHistory.propTypes = {
  dispatchGetHistoryExpenses: PropTypes.func.isRequired,
  expenseFilters: PropTypes.object.isRequired,
  dispatchSetExpenseHistoryFilter: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    backgroundColor: 'white',
  },
  dateView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateText: {
    color: colors.PRIMARY,
    margin: 3,
  },
  noDataText: { fontSize: 20, color: colors.GREY },
  noDataContainer: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

const mapStateToProps = createStructuredSelector({
  expenseFilters: selectExpenseHistoryQuery(),
});

const mapDispatchToProps = dispatch => ({
  dispatchSetExpenseHistoryFilter: expenseHistoryFilter =>
    dispatch(setExpenseHistoryFilter(expenseHistoryFilter)),
  dispatchGetHistoryExpenses: () => dispatch(getExpenseHistoryList()),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ExpenseHistory);
