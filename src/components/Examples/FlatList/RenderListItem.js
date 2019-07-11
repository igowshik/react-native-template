import React, { PureComponent } from 'react';
import { List, Avatar } from 'react-native-paper';
import PropTypes from 'prop-types';

export default class RenderListItem extends PureComponent {
  _onPress = () => {
    this.props.onPressItem(this.props.item);
  };

  render() {
    const { item } = this.props;
    return (
      <List.Item
        roundAvatar
        title={`${item.name.first} ${item.name.last}`}
        description={item.email}
        onPress={this._onPress}
        left={props => (
          <Avatar.Image {...props} source={{ uri: item.picture.thumbnail }} />
        )}
      />
    );
  }
}

RenderListItem.propTypes = {
  onPressItem: PropTypes.func.isRequired,
  item: PropTypes.object,
};
