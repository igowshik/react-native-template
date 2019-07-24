import React, { Component } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { Divider, Searchbar, Text } from 'react-native-paper';
import PropTypes from 'prop-types';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5Pro';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withNavigation, withNavigationFocus } from 'react-navigation';
import { createStructuredSelector } from 'reselect';
import Lo from 'lodash';

import * as colors from 'cnxapp/src/utils/colorsConstants';

import ExpenseListItem from './ExpenseListItem';
import {
  getExpenseList,
  getExpenseSummary,
  setExpensePageNumber,
  loadMoreExpense,
} from '../../actions';
import { selectExpenseList, selectGlobalLoader } from '../../selectors';

const ITEM_HEIGHT = 70;

class ExpenseList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      refreshing: false,
      searchQuery: '',
      expenseLocal: [],
    };
  }

  handleRefresh = () => {
    const {
      fetchExpenseList,
      fetchExpenseSummary,
      updateExpensePageNumber,
    } = this.props;
    this.setState({
      pageNumber: 1,
      refreshing: true,
    });
    fetchExpenseSummary();
    updateExpensePageNumber(1);
    fetchExpenseList();
    this.setState({ refreshing: false });
  };

  handleLoadMore = () => {
    const { pageNumber } = this.state;
    this.setState({ pageNumber: pageNumber + 1 }, () => {
      this.lodMoreExpense();
    });
  };

  lodMoreExpense = () => {
    this.props.fetchMoreExpense();
    this.setState({ refreshing: false });
  };

  renderSeparator = () => <Divider />;

  renderFooter = () => {
    if (!this.state.loading) return null;
    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: '#CED0CE',
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  onExpenseSearch = query => {
    const { expenseList } = this.props;
    const filterData = [];

    expenseList
      .filter(
        expense =>
          expense.ReportName.toLowerCase()
            .trim()
            .includes(query.toLowerCase().trim()) ||
          expense.ExpenseKey.toLowerCase()
            .trim()
            .includes(query.toLowerCase().trim()),
      )
      .map(exp => filterData.push(exp));
    this.setState({ searchQuery: query, expenseLocal: filterData });
  };

  renderExpenseList = () => {
    const { expenseList } = this.props;
    const { expenseLocal, searchQuery } = this.state;
    if (!searchQuery && Lo.isEmpty(expenseLocal)) {
      return expenseList;
    }
    return expenseLocal;
  };

  renderExpenseView = () => {
    const listItems = this.renderExpenseList();
    if (listItems.length === 0) {
      return (
        <View style={styles.noDataContainer}>
          <FontAwesome5
            name="info-circle"
            color={colors.GREY}
            size={35}
            light
          />
          <Text style={styles.noDataText}>No Data</Text>
        </View>
      );
    }
    return (
      <FlatList
        data={listItems}
        renderItem={({ item }) => (
          <ExpenseListItem item={item} onPressItem={this.itemPress} />
        )}
        keyExtractor={item => item.ExpenseId.toString()}
        ListFooterComponent={this.renderFooter}
        onRefresh={this.handleRefresh}
        refreshing={this.state.refreshing}
        onEndReached={this.handleLoadMore}
        onEndReachedThreshold={0}
        getItemLayout={(data, index) => ({
          length: ITEM_HEIGHT,
          offset: ITEM_HEIGHT * index,
          index,
        })}
      />
    );
  };

  itemPress = () => {
    // alert(JSON.stringify(itemData));
  };

  render() {
    const { searchQuery } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <Searchbar
          placeholder="Search"
          onChangeText={query => this.onExpenseSearch(query)}
          value={searchQuery}
        />
        {this.renderExpenseView()}
      </View>
    );
  }
}

ExpenseList.propTypes = {
  fetchExpenseList: PropTypes.func.isRequired,
  fetchExpenseSummary: PropTypes.func.isRequired,
  updateExpensePageNumber: PropTypes.func.isRequired,
  fetchMoreExpense: PropTypes.func.isRequired,
  expenseList: PropTypes.array,
};
const styles = StyleSheet.create({
  noDataContainer: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

/**
 * @method: mapStateToProps()
 * @description: Redux Map method to map all redux state into each individual state value
 * @returns: jobState ans filterState in the State
 */
const mapStateToProps = createStructuredSelector({
  expenseList: selectExpenseList(),
  loaderState: selectGlobalLoader(),
});

/**
 * @method: mapDispatchToProps()
 * @description: Map the Props of this class to the respective Redux dispatch functions
 * @returns: Mapped functions
 */
const mapDispatchToProps = dispatch => ({
  updateExpensePageNumber: pageNumber =>
    dispatch(setExpensePageNumber(pageNumber)),
  fetchExpenseList: () => dispatch(getExpenseList()),
  fetchExpenseSummary: () => dispatch(getExpenseSummary()),
  fetchMoreExpense: () => dispatch(loadMoreExpense()),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withNavigation,
  withNavigationFocus,
  withConnect,
)(ExpenseList);
