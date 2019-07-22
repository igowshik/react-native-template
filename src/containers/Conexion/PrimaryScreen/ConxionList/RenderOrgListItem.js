import React, { PureComponent } from 'react';
import { Avatar, Card, Subheading } from 'react-native-paper';
import PropTypes from 'prop-types';

import { listViewStyle } from '../../styles';

export default class RenderOrgListItem extends PureComponent {
  constructor(props) {
    super(props);
    this._onPress = this._onPress.bind(this);
  }

  _onPress = () => {
    this.props.onPressItem(this.props.item.ConexionId);
  };

  getOrgSubDetails = conexion => {
    let sub = '';
    if (conexion.BusinessHomePage) {
      sub += `${conexion.BusinessHomePage.trim()}, `;
    }
    if (conexion.BusinessTelephoneNumber) {
      sub += `${conexion.BusinessTelephoneNumber.trim()}`;
    }
    return sub;
  };

  getOrgAvatarText = name => {
    const nameSplit = name.toUpperCase().split('')[0];
    return nameSplit;
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
          subtitle={this.getOrgSubDetails(item)}
          left={props => (
            <Avatar.Text
              {...props}
              size={50}
              label={this.getOrgAvatarText(item.Name, item.LastName)}
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
RenderOrgListItem.propTypes = {
  onPressItem: PropTypes.func.isRequired,
  item: PropTypes.object,
};
