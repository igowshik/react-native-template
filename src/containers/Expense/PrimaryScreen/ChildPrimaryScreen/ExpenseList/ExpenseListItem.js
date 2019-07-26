import React, { PureComponent } from 'react';
import { Card, Subheading } from 'react-native-paper';
import PropTypes from 'prop-types';
import { getDateByFormat } from 'cnxapp/src/utils/DateFormatter';
import ListItemRight from './ListItemRight';
import ListItemLeft from './ListItemLeft';

export default class ExpenseListItem extends PureComponent {
  _onPress = () => {
    this.props.onPressItem(this.props.item);
  };

  render() {
    const { item } = this.props;
    return (
      <Card
        elevation={2}
        style={{ marginTop: 2, marginRight: 1, marginLeft: 1 }}
      >
        <Card.Title
          title={
            <Subheading>{`${item.ReportName} - ${item.ExpenseKey}`}</Subheading>
          }
          subtitle={`Report date: ${getDateByFormat(
            new Date(item.ReportDate),
            'L',
          )} | Created on: ${getDateByFormat(new Date(item.CreatedDate), 'L')}`}
          left={props => <ListItemLeft avatarProp={props} />}
          right={() => <ListItemRight item={item} />}
        />
      </Card>
    );
  }
}

ExpenseListItem.propTypes = {
  onPressItem: PropTypes.func.isRequired,
  item: PropTypes.object,
};
