import React, { PureComponent } from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5Pro';
import { Avatar } from 'react-native-paper';
import PropTypes from 'prop-types';
export default class ListItemLeft extends PureComponent {
  render() {
    const { avatarProp } = this.props;
    return (
      <Avatar.Icon
        {...avatarProp}
        icon={() => (
          <FontAwesome5 name="money-bill-alt" color="#186A3B" size={20} light />
        )}
        style={{
          backgroundColor: '#EAFAF1',
          borderWidth: 0.8,
          borderColor: '#186A3B',
        }}
      />
    );
  }
}
ListItemLeft.propTypes = {
  avatarProp: PropTypes.object,
};
