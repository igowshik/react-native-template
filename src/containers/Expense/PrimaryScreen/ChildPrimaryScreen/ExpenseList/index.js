import React, { Component } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { Divider, Searchbar, Card, Subheading } from 'react-native-paper';
import PropTypes from 'prop-types';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5Pro';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withNavigation, withNavigationFocus } from 'react-navigation';
import { createStructuredSelector } from 'reselect';
import Lo from 'lodash';

import * as colors from 'cnxapp/src/utils/colorsConstants';

import ExpenseListItem from './ExpenseListItem';
import { getExpenseHistoryList, setExpenseHistoryFilter } from '../../actions';
import {
  selectExpenseHistory,
  selectExpenseHistoryQuery,
} from '../../selectors';

const ITEM_HEIGHT = 70;

class ExpenseList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      refreshing: false,
      pageNumber: 1,
      searchQuery: '',
      expenseLocal: [],
    };
  }

  componentWillUnmount() {
    this.handleLoadMore.cancel();
    this.handleRefresh.cancel();
  }

  handleRefresh = Lo.debounce(() => {
    const {
      fetchExpenseList,
      dispatchSetExpenseHistoryFilter,
      expenseFilters,
    } = this.props;
    const { pageNumber } = this.state;
    this.setState(
      {
        pageNumber: 1,
        refreshing: false,
      },
      () => {
        dispatchSetExpenseHistoryFilter({
          ...expenseFilters,
          PageNumber: pageNumber,
        });
        fetchExpenseList();
      },
    );
  }, 200);

  handleLoadMore = Lo.debounce(() => {
    const { pageNumber } = this.state;
    const {
      dispatchSetExpenseHistoryFilter,
      expenseFilters,
      fetchExpenseList,
    } = this.props;
    if (!this.onEndReachedCalledDuringMomentum && !this.state.searchQuery) {
      this.setState({ pageNumber: pageNumber + 1, refreshing: false }, () => {
        dispatchSetExpenseHistoryFilter({
          ...expenseFilters,
          PageNumber: pageNumber,
        });
        fetchExpenseList();
      });
      this.onEndReachedCalledDuringMomentum = true;
    }
  }, 300);

  handleMomentedScrollBegin = () => {
    this.onEndReachedCalledDuringMomentum = false;
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
          backgroundColor: colors.BGCOLOR,
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

  itemPress = () => {
    // alert(JSON.stringify(itemData));
  };

  handleSearchText = Lo.debounce(queryValue => {
    this.onExpenseSearch(queryValue);
  }, 10);

  render() {
    this.onEndReachedCalledDuringMomentum = true;
    const { searchQuery } = this.state;
    return (
      <FlatList
        data={this.renderExpenseList()}
        renderItem={({ item }) => (
          <ExpenseListItem item={item} onPressItem={this.itemPress} />
        )}
        keyExtractor={item => item.ExpenseId.toString()}
        ListHeaderComponent={
          <Searchbar
            placeholder="Search"
            onChangeText={query => this.onExpenseSearch(query)}
            value={searchQuery}
          />
        }
        ListFooterComponent={this.renderFooter}
        ListEmptyComponent={this.renderListEmpty}
        onRefresh={this.handleRefresh}
        refreshing={this.state.refreshing}
        onEndReached={this.handleLoadMore}
        onMomentumScrollBegin={this.handleMomentedScrollBegin}
        onEndReachedThreshold={0}
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
  dispatchSetExpenseHistoryFilter: PropTypes.func.isRequired,
  expenseFilters: PropTypes.object.isRequired,
  expenseList: PropTypes.array,
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
  expenseList: selectExpenseHistory(),
  expenseFilters: selectExpenseHistoryQuery(),
});

/**
 * @method: mapDispatchToProps()
 * @description: Map the Props of this class to the respective Redux dispatch functions
 * @returns: Mapped functions
 */
const mapDispatchToProps = dispatch => ({
  fetchExpenseList: () => dispatch(getExpenseHistoryList()),
  dispatchSetExpenseHistoryFilter: expenseHistoryFilter =>
    dispatch(setExpenseHistoryFilter(expenseHistoryFilter)),
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
