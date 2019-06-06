import * as React from 'react';
// import { StyleSheet, View } from 'react-native';
import { Snackbar, Text } from 'react-native-paper';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import PropTypes from 'prop-types';

import * as colors from 'cnxapp/src/utils/colorsConstants';
import { setToastMessage, setToastVisibility } from '../../app/rootActions';
import { INFO, ERROR, WARNING, SUCCESS } from '../../utils/constants';

class SnackbarCustom extends React.Component {
  getMessage = () => {
    const { toast } = this.props;
    if (typeof toast.toastMessage === 'string' && toast) {
      switch (toast.toastType) {
        case INFO: {
          return (
            <Text style={{ color: colors.BLUE }}>{toast.toastMessage}</Text>
          );
        }
        case ERROR: {
          return (
            <Text style={{ color: colors.PINK }}>{toast.toastMessage}</Text>
          );
        }
        case WARNING: {
          return (
            <Text style={{ color: colors.ORANGE }}>{toast.toastMessage}</Text>
          );
        }
        case SUCCESS: {
          return (
            <Text style={{ color: colors.GREEN }}>{toast.toastMessage}</Text>
          );
        }
        default: {
          return (
            <Text style={{ color: colors.BLUE }}>{toast.toastMessage}</Text>
          );
        }
      }
    }
    return null;
  };

  onToastDismiss = () => {
    const defultToastData = {
      toastMessage: '',
      toastType: INFO,
    };
    this.props.dispatchToastData(defultToastData);
    this.props.dispatchToastVisibility(false);
  };

  render() {
    const { toastVisible } = this.props;
    return (
      <Snackbar
        visible={toastVisible}
        onDismiss={this.onToastDismiss}
        action={{
          label: '',
        }}
        duration={Snackbar.DURATION_MEDIUM}
        style={{
          backgroundColor: '#FBFDFF',
        }}
      >
        {this.getMessage()}
      </Snackbar>
    );
  }
}

SnackbarCustom.propTypes = {
  toast: PropTypes.object,
  dispatchToastData: PropTypes.func.isRequired,
  toastVisible: PropTypes.bool,
  dispatchToastVisibility: PropTypes.func.isRequired,
};

/**
 * @method: mapStateToProps()
 * @description: Redux Map method to map all redux state into each individual state value
 * @returns: jobState ans filterState in the State
 */
const mapStateToProps = createStructuredSelector({});

/**
 * @method: mapDispatchToProps()
 * @description: Map the Props of this class to the respective Redux dispatch functions
 * @returns: Mapped functions
 */
const mapDispatchToProps = dispatch => ({
  dispatchToastData: data => dispatch(setToastMessage(data)),
  dispatchToastVisibility: visibility =>
    dispatch(setToastVisibility(visibility)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(SnackbarCustom);
