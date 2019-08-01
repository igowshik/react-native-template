import React, { PureComponent } from 'react';
import { FlatList, View, StyleSheet, Image } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5Pro';
import { Divider, Card, Text } from 'react-native-paper';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as Colors from 'cnxapp/src/utils/colorsConstants';
import { getDateByFormat } from 'cnxapp/src/utils/DateFormatter';
import { createStructuredSelector } from 'reselect';
import { selectExpenseDetails } from '../../selectors';

const EXPESNE_HISTORY_ICON = require('cnxapp/src/assets/icons/expensehistory.png');

class ReportHistory extends PureComponent {
  _keyExtractor = item => item.ExpenseHistoryId.toString();

  _renderItem = ({ item }) => {
    const empty = '';
    return (
      <View style={styles.lineRoot}>
        <View style={styles.lineText}>
          <Text>{item.NewStatus || empty}</Text>
        </View>
        <View style={styles.iconLine}>
          <View style={{ flexDirection: 'column' }}>
            <FontAwesome5 name="usd-circle" color="#34495E" size={20} solid />
          </View>
          <View style={styles.line} />
        </View>
        <View style={styles.lineText}>
          <Text style={{ fontSize: 12, paddingBottom: 10, color: '#797D7F' }}>
            {getDateByFormat(item.StatusChangeDate, 'L') || empty}
          </Text>
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
    const { expenseDetailsData } = this.props;
    return (
      <View style={{ flex: 1, margin: 10 }}>
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
              data={expenseDetailsData.ExpenseHistories.Data}
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

ReportHistory.propTypes = {
  expenseDetailsData: PropTypes.object,
};

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
    width: 100,
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

const mapStateToProps = createStructuredSelector({
  expenseDetailsData: selectExpenseDetails(),
});

const withConnect = connect(
  mapStateToProps,
  null,
);

export default compose(withConnect)(ReportHistory);
