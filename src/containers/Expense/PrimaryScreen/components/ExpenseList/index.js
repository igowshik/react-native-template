import React, { Component } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { Divider, Searchbar, Subheading, Card } from 'react-native-paper';
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
  setExpenseSearchQuery,
} from '../../actions';
import {
  selectExpenseList,
  selectGlobalLoader,
  selectExpenseSearchQuery,
} from '../../selectors';

const ITEM_HEIGHT = 70;

class ExpenseList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      refreshing: false,
    };
  }

  componentWillUnmount() {
    this.handleLoadMore.cancel();
    this.handleRefresh.cancel();
  }

  handleRefresh = Lo.debounce(() => {
    const {
      fetchExpenseList,
      fetchExpenseSummary,
      updateExpensePageNumber,
    } = this.props;
    this.onEndReachedCalledDuringMomentum = true;
    this.setState({ refreshing: true });
    fetchExpenseSummary();
    updateExpensePageNumber(1);
    fetchExpenseList();
    this.setState({ refreshing: false });
  }, 200);

  handleLoadMore = Lo.debounce(() => {
    const { searchQuery } = this.props;
    if (!this.onEndReachedCalledDuringMomentum && !searchQuery.searchString) {
      this.props.fetchMoreExpense();
      this.setState({ refreshing: false });
      this.onEndReachedCalledDuringMomentum = true;
    }
  }, 300);

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
    const { expenseList, dispatchSetExpenseSearchQuery } = this.props;
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
    dispatchSetExpenseSearchQuery({
      searchString: query,
      searchResult: filterData,
    });
  };

  renderExpenseList = () => {
    const { expenseList, searchQuery } = this.props;
    if (!searchQuery.searchString && Lo.isEmpty(searchQuery.searchResult)) {
      return expenseList;
    }
    return searchQuery.searchResult;
  };

  handleMomentedScrollBegin = () => {
    this.onEndReachedCalledDuringMomentum = false;
  };

  renderListEmpty = () => (
    <Card style={styles.footerCard}>
      <Card.Content style={styles.nodataCard}>
        <FontAwesome5
          name="list-alt"
          color={colors.GREY}
          style={{ margin: 5 }}
          size={30}
          light
        />
        <Subheading style={{ color: colors.GREY }}>
          No data to display
        </Subheading>
      </Card.Content>
    </Card>
  );

  itemPress = () => {};

  render() {
    this.onEndReachedCalledDuringMomentum = true;
    const { searchQuery } = this.props;
    return (
      <FlatList
        data={this.renderExpenseList()}
        renderItem={({ item }) => (
          <ExpenseListItem item={item} onPressItem={itemPress} />
        )}
        keyExtractor={item => item.ExpenseId.toString()}
        ListHeaderComponent={
          <Searchbar
            placeholder="Search"
            onChangeText={query => this.onExpenseSearch(query)}
            value={searchQuery.searchString}
          />
        }
        ListFooterComponent={this.renderFooter}
        ListEmptyComponent={this.renderListEmpty}
        onRefresh={this.handleRefresh}
        refreshing={this.state.refreshing}
        onEndReached={this.handleLoadMore}
        onEndReachedThreshold={0}
        onMomentumScrollBegin={this.handleMomentedScrollBegin}
        stickyHeaderIndices={[0]}
        getItemLayout={(data, index) => ({
          length: ITEM_HEIGHT,
          offset: ITEM_HEIGHT * index,
          index,
        })}
      />
    );
  }
}

ExpenseList.propTypes = {
  fetchExpenseList: PropTypes.func.isRequired,
  fetchExpenseSummary: PropTypes.func.isRequired,
  updateExpensePageNumber: PropTypes.func.isRequired,
  fetchMoreExpense: PropTypes.func.isRequired,
  expenseList: PropTypes.array,
  searchQuery: PropTypes.object.isRequired,
  dispatchSetExpenseSearchQuery: PropTypes.func.isRequired,
};
const styles = StyleSheet.create({
  noDataContainer: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  footerCard: {
    marginTop: 2,
    marginRight: 1,
    marginLeft: 1,
  },
  nodataCard: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
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
  searchQuery: selectExpenseSearchQuery(),
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
  dispatchSetExpenseSearchQuery: query =>
    dispatch(setExpenseSearchQuery(query)),
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
