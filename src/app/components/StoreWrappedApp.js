import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { View } from 'react-native';
import { compose } from 'redux';
import PropTypes from 'prop-types';

// Absolute imports
import Navigation from 'cnxapp/src/navigation';

// Relative imports
import Snackbar from '../../components/Snackbar';
import { selectToastVisibility, selectToastData } from '../rootSelector';
import { setRootGlobalLoader } from '../rootActions';
import NavigationService from '../../navigation/NavigationService';

const StoreWrappedApp = props => (
  <View style={{ flex: 1 }}>
    <Navigation
      ref={navigatorRef => {
        NavigationService.setTopLevelNavigator(navigatorRef);
      }}
    />
    <Snackbar toastVisible={props.toastVisible} toast={props.toast} />
  </View>
);

StoreWrappedApp.propTypes = {
  toastVisible: PropTypes.bool.isRequired,
  toast: PropTypes.object.isRequired,
};

/**
 * @method: mapStateToProps()
 * @description: Redux Map method to map all redux state into each individual state value
 * @returns: jobState ans filterState in the State
 */
const mapStateToProps = createStructuredSelector({
  toastVisible: selectToastVisibility(),
  toast: selectToastData(),
});

/**
 * @method: mapDispatchToProps()
 * @description: Map the Props of this class to the respective Redux dispatch functions
 * @returns: Mapped functions
 */
const mapDispatchToProps = dispatch => ({
  setLoaderState: value => dispatch(setRootGlobalLoader(value)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(StoreWrappedApp);
