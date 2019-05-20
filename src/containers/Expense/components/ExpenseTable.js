import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { Card, CardItem } from 'native-base';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Col, Grid } from 'react-native-easy-grid';

class ExpenseTable extends React.Component {
  render() {
    const { expenseData } = this.props;
    return expenseData.map(expense => (
      <Card key={expense.expenseId} style={styles.cardStyle}>
        <CardItem style={styles.cardContentContainerReport}>
          <Grid>
            <Col
              size={2}
              sstyle={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
              }}
            >
              <Text numberOfLines={1} ellipsizeMode="tail">
                {expense.expenseName}
              </Text>
              <Text style={{ fontSize: 10, color: 'grey' }}>
                {expense.expenseId}
              </Text>
            </Col>
            <Col
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
              }}
            >
              <Text>{expense.expenseDate}</Text>
            </Col>
            <Col
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
              }}
            >
              <Text>{expense.expenseStatus}</Text>
            </Col>
            <Col
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
              }}
            >
              <Text style={{ color: '#3498DB' }}>
                {`$${expense.expenseAmount.toLocaleString()}`}
              </Text>
            </Col>
            <Col
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}
            >
              <View
                style={[
                  styles.iconRoundBackground,
                  { backgroundColor: '#808B96' },
                ]}
              >
                <FontAwesome5
                  name="chevron-right"
                  color="#FFFFFF"
                  size={15}
                  brand
                />
              </View>
            </Col>
          </Grid>
        </CardItem>
      </Card>
    ));
  }
}

ExpenseTable.propTypes = {
  expenseData: PropTypes.array,
};

const styles = StyleSheet.create({
  cardContentContainerReport: {
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    flex: 1,
    flexGrow: 1,
    margin: 5,
  },
  cardStyle: {
    elevation: 0, // remove shadow on Android
    shadowOpacity: 0,
    backgroundColor: 'transparent',
  },
  iconRoundBackground: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 100,
    // margin: 20,
    shadowColor: '#808B96',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.46,
    shadowRadius: 8,
    elevation: 10,
  },
});

export default ExpenseTable;
