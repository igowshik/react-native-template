import { Card, Text } from 'react-native-paper';
import Lo from 'lodash';
// Absolute imports
import Loader from 'cnxapp/src/components/Loader';

import ScrollView from 'cnxapp/src/components/ScrollView';

import React from 'react';
import { View } from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import PropTypes from 'prop-types';

import { setRootGlobalLoader } from 'cnxapp/src/app/rootActions';

import {
  selectToken,
  selectGlobalLoader,
  selectToastVisibility,
  selectToastData,
} from '../../../selectors';

import { selectExpenseItems } from '../../selectors';

import { getExpenseItems } from '../../actions';

// Relative imports
// import { listViewStyle } from '../styles';

class ExpenseItemList extends React.Component {
  getSubTitleDetails = expenseItem => expenseItem.BusinessPurpose;

  componentDidMount() {
    const { accessToken, fetchExpenseItems, setGlobalLoaderState } = this.props;
    setGlobalLoaderState(true);
    fetchExpenseItems(accessToken);
  }

  renderExpenseItemList = () => {
    const { expenseItemListData, clickListItemHandler } = this.props;
    if (!Lo.isEmpty(expenseItemListData)) {
      return expenseItemListData.map(expenseItem => (
        <Card
          key={expenseItem.ExpenseItemId}
          onPress={() => {
            clickListItemHandler(expenseItem.ExpenseItemId);
          }}
          // style={listViewStyle.cardMargin}
          elevation={2}
        >
          <Card.Title
            title={expenseItem.ExpenseType}
            subtitle={this.getSubTitleDetails(expenseItem)}
          />
        </Card>
      ));
    }
    return null;
  };

  renderExpenseItems = () => {
    const { expenseItemListData } = this.props;
    if (expenseItemListData === false) {
      return (
        <Text
          style={{
            textAlign: 'center',
            fontSize: 18,
            paddingTop: 10,
          }}
        >
          No data to display
        </Text>
      );
    }
    return this.renderExpenseItemList();
  };

  render() {
    const { loader } = this.props;
    return (
      <ScrollView>
        {loader ? (
          <View>
            <Loader
              showLoader={loader}
              loaderTitle="Expense Items"
              loadingText="Loading expense items..."
            />
          </View>
        ) : (
          this.renderExpenseItems()
        )}
      </ScrollView>
    );
  }
}

ExpenseItemList.propTypes = {
  accessToken: PropTypes.string.isRequired,
  setGlobalLoaderState: PropTypes.func.isRequired,
  fetchExpenseItems: PropTypes.func.isRequired,
  expenseItemListData: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  clickListItemHandler: PropTypes.func,
  loader: PropTypes.bool.isRequired,
};

/**
 * @method: mapStateToProps()
 * @description: Redux Map method to map all redux state into each individual state value
 * @returns: jobState ans filterState in the State
 */
const mapStateToProps = createStructuredSelector({
  accessToken: selectToken(),
  expenseItems: selectExpenseItems(),
  loaderState: selectGlobalLoader(),
  toastVisible: selectToastVisibility(),
  toast: selectToastData(),
});

/**
 * @method: mapDispatchToProps()
 * @description: Map the Props of this class to the respective Redux dispatch functions
 * @returns: Mapped functions
 */
const mapDispatchToProps = dispatch => ({
  SetGlobalLoaderState: value => dispatch(setRootGlobalLoader(value)),
  fetchExpenseItems: token => dispatch(getExpenseItems(token)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withNavigation,
  withConnect,
)(ExpenseItemList);
