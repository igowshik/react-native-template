import React, { PureComponent } from 'react';
import { Text } from 'react-native-paper';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5Pro';

import * as Colors from 'cnxapp/src/utils/colorsConstants';
const { ExpenseColors } = Colors;
export default class ListItemRight extends PureComponent {
  statusColor = status => {
    const _status = status.toUpperCase();
    if (_status.includes('ALL')) return ExpenseColors.ALL;
    if (_status.includes('NEW')) return ExpenseColors.SAVED;
    if (_status.includes('SUBMITED')) return ExpenseColors.SUBMITED;
    if (_status.includes('APPROVED')) return ExpenseColors.APPROVED;
    if (_status.includes('REJECTED')) return ExpenseColors.REJECTED;
    return ExpenseColors.ALL;
    // switch (status.toUpperCase()) {
    //   case 'ALL':
    //     return ExpenseColors.ALL;
    //   case 'NEW': // NEW is SAVED
    //     return ExpenseColors.SAVED;
    //   case 'SUBM':
    //     return ExpenseColors.SUBMITED;
    //   case 'MAPR':
    //   case 'AAPR':
    //     return ExpenseColors.APPROVED;
    //   case 'REJECTED':
    //   case 'MREJ':
    //   case 'AREJ':
    //     return ExpenseColors.REJECTED;
    //   default:
    //     return ExpenseColors.ALL;
    // }
  };

  render() {
    const { item } = this.props;
    return (
      <View
        style={{
          flexDirection: 'column',
          marginRight: 10,
        }}
      >
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignContent: 'center',
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignContent: 'center',
              alignItems: 'center',
            }}
          >
            <FontAwesome5
              name="dollar-sign"
              color="black"
              size={27}
              light
              style={{ paddingRight: 5 }}
            />
            <Text style={{ fontSize: 30 }}>{item.TotalAmount}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ fontSize: 10, paddingRight: 5 }}>
              {item.CurrentStatus.Value}
            </Text>
            <FontAwesome5
              name="circle"
              color={this.statusColor(item.CurrentStatus.Value)}
              size={10}
              solid
            />
          </View>
        </View>
      </View>
    );
  }
}
ListItemRight.propTypes = {
  item: PropTypes.object,
};
