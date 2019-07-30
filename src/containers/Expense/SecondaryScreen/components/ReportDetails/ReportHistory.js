import React, { Component } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5Pro';
import { Divider, Card, Text } from 'react-native-paper';

import * as Colors from 'cnxapp/src/utils/colorsConstants';

const SAMPLE_DATA = [
  {
    Id: 1,
    Status: 'New',
    Date: '12/02/19 6AM',
    UpdatedUser: 'John wick',
  },
  {
    Id: 2,
    Status: 'New',
    Date: '12/02/19 6AM',
    UpdatedUser: 'John wick',
  },
  {
    Id: 3,
    Status: 'New',
    Date: '12/02/19 6AM',
    UpdatedUser: 'John wick',
  },
  {
    Id: 4,
    Status: 'New',
    Date: '12/02/19 6AM',
    UpdatedUser: 'John wick',
  },
  {
    Id: 12,
    Status: 'New',
    Date: '12/02/19 6AM',
    UpdatedUser: 'John wick',
  },
  {
    Id: 22,
    Status: 'New',
    Date: '12/02/19 6AM',
    UpdatedUser: 'John wick',
  },
  {
    Id: 13,
    Status: 'New',
    Date: '12/02/19 6AM',
    UpdatedUser: 'John wick',
  },
  {
    Id: 42,
    Status: 'New',
    Date: '12/02/19 6AM',
    UpdatedUser: 'John wick',
  },
];

class ReportHistory extends Component {
  _keyExtractor = item => item.Id.toString();

  _renderItem = ({ item }) => {
    const value = '';
    return (
      <View style={{ flex: 1, width: 150, margin: 5 }}>
        <Text>{item.Status || value}</Text>
        <View style={{ flexDirection: 'row' }}>
          <FontAwesome5
            name="circle"
            color={Colors.PRIMARY}
            size={13}
            solid
            style={{ paddingRight: 5 }}
          />
          <Divider />
        </View>
      </View>
    );
  };

  render() {
    return (
      <View style={{ flex: 1, margin: 15 }}>
        <Card elevation={4}>
          <Card.Title
            title="Expense Report History"
            left={propss => (
              <View
                style={[
                  styles.iconRoundBackground,
                  { backgroundColor: '#FEF2CC', borderColor: '#F1B808' },
                ]}
                {...propss}
              >
                <FontAwesome5 name="history" color="#F18408" size={20} light />
              </View>
            )}
          />
          <Divider />
          <Card.Content>
            <FlatList
              data={SAMPLE_DATA}
              keyExtractor={this._keyExtractor}
              horizontal
              renderItem={this._renderItem}
            />
          </Card.Content>
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  iconRoundBackground: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 45,
    height: 45,
    borderRadius: 100,
  },
  linkText: {
    color: Colors.LINK,
  },
  propTag: {
    fontWeight: 'bold',
  },
});

export default ReportHistory;
