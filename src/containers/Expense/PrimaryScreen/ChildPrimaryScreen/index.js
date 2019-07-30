import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import {
  Text,
  IconButton,
  TouchableRipple,
  Surface,
  Divider,
} from 'react-native-paper';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5Pro';
// import { Row, Col } from 'native-base';
import { Row, Col } from 'react-native-easy-grid';

// Absolute Imports
import * as colors from 'cnxapp/src/utils/colorsConstants';
import { getDateByFormat } from 'cnxapp/src/utils/DateFormatter';
import DateTimePicker from 'cnxapp/src/components/DateTimePicker';

import ExpenseList from '../components/ExpenseList';
import {
  getExpenseList,
  setExpenseStatusFilter,
  setExpensePageNumber,
  loadMoreExpense,
} from '../actions';
import { selectExpenseFilterQuery } from '../selectors';

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
      dispatchSetExpenseListType,
      dispatchGetHistoryExpenses,
      updateExpensePageNumber,
    } = this.props;
    updateExpensePageNumber(1);
    dispatchSetExpenseListType('EXTR');
    dispatchGetHistoryExpenses();
  }

  showFromDatePicker = () => this.setState({ fromDateVisible: true });

  showToDatePicker = () => this.setState({ toDateVisible: true });

  handleDatePicked = date => {
    const { fromDateVisible, toDateVisible } = this.state;
    const { dispatchSetConexionNoteFilter, expenseFilters } = this.props;
    if (fromDateVisible) {
      dispatchSetConexionNoteFilter({
        ...expenseFilters,
        StartDate: getDateByFormat(date, 'L'),
      });
    }
    if (toDateVisible) {
      dispatchSetConexionNoteFilter({
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
      <View style={{ flex: 1 }}>
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
              <IconButton
                icon={() => (
                  <FontAwesome5
                    color={colors.PURPLE}
                    name="filter"
                    size={20}
                    solid
                  />
                )}
                mode="outlined"
                color={colors.PURPLE}
                onPress={this.applyDateFilter}
              />
            </Col>
          </Row>
          <Divider />
        </Surface>
        <View style={styles.container}>
          <ExpenseList />
          <DateTimePicker
            value={this.getSelectedDate()}
            mode="date"
            visible={this.state.fromDateVisible || this.state.toDateVisible}
            onDateSelect={this.handleDatePicked}
            onCancel={this.hideDateTimePicker}
          />
        </View>
      </View>
    );
  }
}

ExpenseHistory.propTypes = {
  dispatchSetExpenseListType: PropTypes.func.isRequired,
  dispatchGetHistoryExpenses: PropTypes.func.isRequired,
  updateExpensePageNumber: PropTypes.func.isRequired,

  expenseFilters: PropTypes.object.isRequired,
  dispatchSetConexionNoteFilter: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    paddingTop: 0,
    backgroundColor: 'white',
  },
  list: {
    flex: 1,
    paddingTop: 25,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: colors.PRIMARY,
  },
  searchbar: {
    marginBottom: 2,
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
  expenseFilters: selectExpenseFilterQuery(),
  // expenseList: selectExpenseList(),
});

const mapDispatchToProps = dispatch => ({
  dispatchSetExpenseListType: expenseType =>
    dispatch(setExpenseStatusFilter(expenseType)),
  // dispatchSetConexionNoteFilter: noteFilter =>
  //   dispatch(setNoteFilter(noteFilter)),

  updateExpensePageNumber: pageNumber =>
    dispatch(setExpensePageNumber(pageNumber)),
  dispatchGetHistoryExpenses: () => dispatch(getExpenseList()),
  fetchMoreExpense: () => dispatch(loadMoreExpense()),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ExpenseHistory);
