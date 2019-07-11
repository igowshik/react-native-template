import React from 'react';
import { FAB, Portal } from 'react-native-paper';
import PropTypes from 'prop-types';

import * as colors from 'cnxapp/src/utils/colorsConstants';
import { INDIVIDUAL, ORGANIZATION } from '../../constants';

class FABUI extends React.Component {
  state = {
    open: false,
  };

  render() {
    return (
      <Portal>
        <FAB.Group
          fabStyle={{
            right: 0,
            backgroundColor: colors.PRIMARY,
          }}
          style={{
            paddingBottom: 60,
            paddingRight: 10,
          }}
          open={this.state.open}
          icon={this.state.open ? 'person-add' : 'add'}
          actions={[
            {
              icon: 'person',
              label: 'Individual',
              onPress: () => this.props.handleConexionCreate(true, INDIVIDUAL),
              // onPress: () => this.props.handleConexionCreate(),
              style: {
                backgroundColor: colors.SECONDARY,
                color: '#000',
              },
            },
            {
              icon: 'location-city',
              label: 'Organization',
              onPress: () =>
                this.props.handleConexionCreate(true, ORGANIZATION),
              //   this.props.handleConexionCreate(),
              // onPress: this.props.handleConexionCreate,
              style: {
                backgroundColor: colors.SECONDARY,
              },
            },
          ]}
          onStateChange={({ open }) => this.setState({ open })}
          onPress={() => {
            if (this.state.open) {
              // do something if the speed dial is open
            }
          }}
        />
      </Portal>
    );
  }
}

FABUI.propTypes = {
  handleConexionCreate: PropTypes.func.isRequired,
};

export default FABUI;
