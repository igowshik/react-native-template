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

import { setRootGlobalLoader } from 'cnxapp/src/app/rootActions';
import * as colors from 'cnxapp/src/utils/colorsConstants';

import ExpenseListItem from './ExpenseListItem';
import { getExpenseList } from '../../actions';
import { selectExpenseList } from '../../selectors';
import { selectGlobalLoader } from '../../../selectors';

class ExpenseList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      pageNumber: 1,
      refreshing: false,
      searchQuery: '',
      expenseLocal: [],
    };
  }

  handleRefresh = () => {
    const { fetchExpenseList } = this.props;
    const { pageNumber } = this.state;
    this.setState({
      pageNumber: 1,
      refreshing: true,
    });
    fetchExpenseList(pageNumber);
    this.setState({ refreshing: false });
  };

  handleLoadMore = () => {
    const { fetchExpenseList } = this.props;
    const { pageNumber } = this.state;
    this.setState({ pageNumber: pageNumber + 1 });
    fetchExpenseList(pageNumber);
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
        // onEndReached={this.handleLoadMore}
        onEndReachedThreshold={0.5}
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
        {/* <FlatList
          data={this.renderExpenseList()}
          renderItem={({ item }) => (
            <ExpenseListItem item={item} onPressItem={this.itemPress} />
          )}
          keyExtractor={item => item.ExpenseId.toString()}
          ListFooterComponent={this.renderFooter}
          onRefresh={this.handleRefresh}
          refreshing={this.state.refreshing}
          // onEndReached={this.handleLoadMore}
          onEndReachedThreshold={0.5}
        /> */}
      </View>
    );
  }
}

ExpenseList.propTypes = {
  fetchExpenseList: PropTypes.func.isRequired,
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
  setGlobalLoaderState: value => dispatch(setRootGlobalLoader(value)),
  fetchExpenseList: pageNumber => dispatch(getExpenseList(pageNumber)),
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
