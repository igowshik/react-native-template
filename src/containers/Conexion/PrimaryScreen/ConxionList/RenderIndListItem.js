import React, { PureComponent } from 'react';
import { Avatar, Card, Subheading } from 'react-native-paper';
import PropTypes from 'prop-types';

import { listViewStyle } from '../../styles';

export default class RenderIndListItem extends PureComponent {
  constructor(props) {
    super(props);
    this._onPress = this._onPress.bind(this);
  }

  getIndSubDetails = conexion => {
    let sub = '';
    if (conexion.Organization) {
      sub += `${conexion.Organization.Name.trim()}`;
    }
    if (conexion.BusinessEmailAddress) {
      if (sub) sub += `, `;
      sub += `${conexion.BusinessEmailAddress.trim()}`;
    }
    if (conexion.BusinessTelephoneNumber) {
      if (sub) sub += `, `;
      sub += `${conexion.BusinessTelephoneNumber.trim()}`;
    }
    return sub;
  };

  getIndAvatarText = (firstName, lastName) => {
    if (firstName && lastName) {
      const fn = firstName.toUpperCase().split('')[0];
      const ln = lastName.toUpperCase().split('')[0];
      return fn + ln;
    }
    return '';
  };

  _onPress = () => {
    this.props.onPressItem(this.props.item.ConexionId);
  };

  render() {
    const { item } = this.props;
    return (
      <Card
        key={item.ConexionId}
        onPress={this._onPress}
        style={listViewStyle.cardMargin}
        elevation={2}
      >
        <Card.Title
          title={<Subheading>{item.DisplayName.trim()}</Subheading>}
          subtitle={this.getIndSubDetails(item)}
          left={props => (
            <Avatar.Text
              {...props}
              size={50}
              label={this.getIndAvatarText(item.Name, item.LastName)}
              style={{
                backgroundColor: `#${Math.random()
                  .toString(16)
                  .substr(-6)}`,
              }}
            />
          )}
        />
      </Card>
    );
  }
}

RenderIndListItem.propTypes = {
  onPressItem: PropTypes.func.isRequired,
  item: PropTypes.object,
};
