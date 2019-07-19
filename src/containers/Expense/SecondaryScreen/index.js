import React, { Component } from 'react';
import { View } from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { setRootGlobalLoader } from 'cnxapp/src/app/rootActions';
import ExpenseItemList from './components/ExpenseItemList';
// import ExpenseReceiptList from './components/ExpenseReceiptList';

import {
  selectToken,
  selectGlobalLoader,
  selectToastVisibility,
  selectToastData,
} from '../selectors';

class SecondaryScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={{ flex: 1, margin: 30 }}>
        {/* <Text>Expense Second Screen</Text> */}
        <ExpenseItemList />
      </View>
    );
  }
}

// SecondaryScreen.propTypes = {
//   navigation: PropTypes.object,
//   SetGlobalLoaderState: PropTypes.func.isRequired,
//   loaderState: PropTypes.bool.isRequired,
//   toastVisible: PropTypes.bool.isRequired,
//   toast: PropTypes.object.isRequired,
// };

/**
 * @method: mapStateToProps()
 * @description: Redux Map method to map all redux state into each individual state value
 * @returns: jobState ans filterState in the State
 */
const mapStateToProps = createStructuredSelector({
  accessToken: selectToken(),
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
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withNavigation,
  withConnect,
)(SecondaryScreen);
