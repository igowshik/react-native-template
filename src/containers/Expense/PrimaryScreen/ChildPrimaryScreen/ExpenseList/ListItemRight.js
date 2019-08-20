import React, { PureComponent } from 'react';
import { Text } from 'react-native-paper';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5Pro';

import { statusColorMapper } from 'cnxapp/src/containers/Expense/mappers';
export default class ListItemRight extends PureComponent {
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
            <FontAwesome5
              name="circle"
              color={statusColorMapper(item.CurrentStatus)}
              size={10}
              solid
              style={{ paddingRight: 5 }}
            />
            <Text style={{ fontSize: 10 }}>{item.CurrentStatus.Value}</Text>
          </View>
        </View>
      </View>
    );
  }
}
ListItemRight.propTypes = {
  item: PropTypes.object,
};
