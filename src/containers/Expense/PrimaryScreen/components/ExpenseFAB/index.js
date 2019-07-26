import React from 'react';
import { FAB, Portal } from 'react-native-paper';
import PropTypes from 'prop-types';

import * as colors from 'cnxapp/src/utils/colorsConstants';

class ExpenseFAB extends React.Component {
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
          icon={this.state.open ? 'add' : 'add'}
          actions={[
            {
              icon: 'add',
              label: 'Create expense',
              onPress: () => this.props.handleExpenseCreate(true),
              style: {
                backgroundColor: colors.SECONDARY,
                color: '#000',
              },
            },
            {
              icon: 'history',
              label: 'Completed Expenses',
              onPress: () => this.props.handleExpenseHistoryPress(),
              style: {
                backgroundColor: colors.SECONDARY,
              },
            },
            // {
            //   icon: 'add',
            //   label: 'Expense dashboard',
            //   onPress: () => {},
            //   // this.props.handleConexionCreate(true, ORGANIZATION),
            //   //   this.props.handleConexionCreate(),
            //   // onPress: this.props.handleConexionCreate,
            //   style: {
            //     backgroundColor: colors.SECONDARY,
            //   },
            // },
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

ExpenseFAB.propTypes = {
  handleExpenseCreate: PropTypes.func.isRequired,
  handleExpenseHistoryPress: PropTypes.func.isRequired,
};

export default ExpenseFAB;
