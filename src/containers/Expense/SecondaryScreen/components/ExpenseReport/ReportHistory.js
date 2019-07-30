import React, { PureComponent } from 'react';
import { FlatList, View, StyleSheet, Image } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5Pro';
import { Divider, Card, Text } from 'react-native-paper';

import * as Colors from 'cnxapp/src/utils/colorsConstants';

const EXPESNE_HISTORY_ICON = require('cnxapp/src/assets/icons/expensehistory.png');

const SAMPLE_DATA = [
  {
    Id: 1,
    Status: 'New',
    Date: '30/07/2019 9:00 AM',
    UpdatedUser: 'John wick',
  },
  {
    Id: 2,
    Status: 'Saved',
    Date: '30/07/2019 9:40 AM',
    UpdatedUser: 'John wick',
  },
  {
    Id: 3,
    Status: 'Submited',
    Date: '30/07/2019 11:00 AM',
    UpdatedUser: 'John wick',
  },
  {
    Id: 4,
    Status: 'Manager Rejected',
    Date: '30/07/2019 02:00 PM',
    UpdatedUser: 'Pete Ange',
  },
  {
    Id: 12,
    Status: 'Submited',
    Date: '30/07/2019 02:30 PM',
    UpdatedUser: 'John wick',
  },
  {
    Id: 22,
    Status: 'Manager Approved',
    Date: '30/07/2019 05:00 PM',
    UpdatedUser: 'Pete Ange',
  },
  {
    Id: 23,
    Status: 'Released',
    Date: '31/07/2019 02:00 PM',
    UpdatedUser: 'Mark Wood',
  },
];

class ReportHistory extends PureComponent {
  _keyExtractor = item => item.Id.toString();

  _renderItem = ({ item }) => {
    const empty = '';
    return (
      <View style={styles.lineRoot}>
        <View style={styles.lineText}>
          <Text>{item.Status || empty}</Text>
        </View>
        <View style={styles.iconLine}>
          <View style={{ flexDirection: 'column' }}>
            <FontAwesome5 name="usd-circle" color="#34495E" size={20} solid />
          </View>
          <View style={styles.line} />
        </View>
        <View style={styles.lineText}>
          <Text style={styles.dateText}>{item.Date || empty}</Text>
        </View>
      </View>
    );
  };

  _renderHeader = () => (
    <View style={styles.lineHeader}>
      <View style={styles.iconLine}>
        <View style={{ flexDirection: 'column' }}>
          <Image
            style={{ width: 40, height: 40 }}
            source={EXPESNE_HISTORY_ICON}
          />
        </View>
        <View style={styles.line} />
      </View>
    </View>
  );

  _renderFooter = () => (
    <View style={styles.lineFooter}>
      <View style={styles.iconLine}>
        <View style={{ flexDirection: 'column' }}>
          <FontAwesome5
            name="caret-right"
            color="#34495E"
            size={25}
            solid
            style={styles.footerEndIcon}
          />
        </View>
      </View>
    </View>
  );

  render() {
    return (
      <View style={{ flex: 1, margin: 15 }}>
        <Card elevation={4} style={styles.card}>
          <Card.Title
            title="Expense Report History"
            left={propss => (
              <View style={styles.iconRoundBackground} {...propss}>
                <FontAwesome5 name="history" color="#F18408" size={20} light />
              </View>
            )}
          />
          <Divider />
          <Card.Content style={styles.cardContent}>
            <FlatList
              data={SAMPLE_DATA}
              keyExtractor={this._keyExtractor}
              horizontal
              renderItem={this._renderItem}
              ListHeaderComponent={this._renderHeader}
              ListFooterComponent={this._renderFooter}
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
    backgroundColor: '#FEF2CC',
    borderColor: '#F1B808',
  },
  linkText: {
    color: Colors.LINK,
  },
  propTag: {
    fontWeight: 'bold',
  },
  card: {
    borderRadius: 15,
  },
  lineRoot: { flex: 1, width: 170 },
  iconLine: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  line: {
    flex: 1,
    flexDirection: 'column',
    borderTopColor: '#34495E',
    borderWidth: 1,
    alignItems: 'center',
    borderColor: 'transparent',
  },
  lineText: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  lineHeader: {
    flex: 1,
    paddingBottom: 5,
    width: 150,
  },
  lineFooter: { flex: 1, width: 100, paddingBottom: 10 },
  dateText: { fontSize: 12, paddingBottom: 10, color: '#797D7F' },
  footerEndIcon: {
    alignItems: 'center',
    alignContent: 'center',
  },
  cardContent: {
    marginTop: 20,
    marginBottom: 10,
  },
});

export default ReportHistory;
