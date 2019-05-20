import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { Left, Container, Body, Card, CardItem, Header, H1 } from 'native-base';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Col, Grid } from 'react-native-easy-grid';
import LinearGradient from 'react-native-linear-gradient';

import DateTimePickerUI from '../../components/DateTimePickerUI';
import { HorizDivider } from '../../components/CNXDividers';

import ExpenseTable from './components/ExpenseTable';
import CreateExpense from './components/CreateExpense';

class ExpenseMainScreen extends React.Component {
  state = {
    loader: false,
    expenseCreateOpen: false,
    expenseData: [
      {
        expenseName: 'Paralles 14 License for Mac',
        expenseId: 'E3-1129',
        expenseDate: '12-01-2019',
        expenseAmount: 128,
        expenseStatus: 'Manager Approved',
      },
      {
        expenseName: 'Nov 2018 Expense',
        expenseId: 'E1-1232',
        expenseDate: '15-01-2019',
        expenseAmount: 103,
        expenseStatus: 'Manager Approved',
      },
      {
        expenseName: 'Jan 2019 Expense',
        expenseId: 'E3-1432',
        expenseDate: '1-01-2019',
        expenseAmount: 1023,
        expenseStatus: 'Submitted',
      },
      {
        expenseName: 'VM purchase',
        expenseId: 'E3-1732',
        expenseDate: '13-01-2018',
        expenseAmount: 273,
        expenseStatus: 'Submitted',
      },
      {
        expenseName: 'Macbook rent',
        expenseId: 'E5-1266',
        expenseDate: '20-01-2019',
        expenseAmount: 1400,
        expenseStatus: 'New',
      },
      {
        expenseName: 'Macbook rent',
        expenseId: 'E5-1246',
        expenseDate: '20-01-2019',
        expenseAmount: 1400,
        expenseStatus: 'New',
      },
      {
        expenseName: 'Macbook rent',
        expenseId: 'E5-1216',
        expenseDate: '20-01-2019',
        expenseAmount: 1400,
        expenseStatus: 'New',
      },
      {
        expenseName: 'Macbook rent',
        expenseId: 'E5-1286',
        expenseDate: '10-01-2019',
        expenseAmount: 1400,
        expenseStatus: 'New',
      },
    ],
  };

  getTotalExpense = () => {
    const { expenseData } = this.state;
    let amount = 0;
    expenseData.map(expense => { //eslint-disable-line
      amount += expense.expenseAmount;
    });
    return `$${amount.toLocaleString()}`;
  };

  setModalOpenClose = value => {
    this.setState({ expenseCreateOpen: value });
  };

  render() {
    const { loader, expenseData, expenseCreateOpen } = this.state;
    return loader ? (
      <Container style={[styles.loaderContainer, styles.loaderHorizontal]}>
        <ActivityIndicator size="large" color="#000" />
      </Container>
    ) : (
      <View>
        <View>
          <Header style={styles.headerStyle}>
            <Left>
              <DateTimePickerUI />
            </Left>
          </Header>
        </View>
        <View>
          <Container>
            <Grid>
              <Col size={2}>
                <View style={styles.viewCol1Style}>
                  <Header style={{ height: 50 }}>
                    <Grid style={{ marginLeft: 14 }}>
                      <Col size={2} style={styles.headerColStyle}>
                        <Text style={styles.headerText}>Report</Text>
                      </Col>
                      <Col style={styles.headerColStyle}>
                        <Text style={styles.headerText}>Report date</Text>
                      </Col>
                      <Col style={styles.headerColStyle}>
                        <Text style={styles.headerText}>Status</Text>
                      </Col>
                      <Col style={styles.headerColStyle}>
                        <Text style={styles.headerText}>Amount</Text>
                      </Col>
                      <Col />
                    </Grid>
                  </Header>
                  <ScrollView>
                    <ExpenseTable expenseData={expenseData} />
                  </ScrollView>
                </View>
              </Col>
              <Col size={1}>
                <View style={styles.viewCol2Style}>
                  <Card style={{ height: 400 }}>
                    <CardItem>
                      <Body style={styles.cardContentContainer}>
                        <View
                          style={[
                            styles.iconRoundBackground,
                            { backgroundColor: '#EAFAF1' },
                          ]}
                        >
                          <FontAwesome5
                            name="money-bill-alt"
                            color="#186A3B"
                            size={20}
                            brand
                          />
                        </View>
                        <H1 style={styles.h1Style}>{this.getTotalExpense()}</H1>
                        <Text style={{ color: '#707B7C', marginTop: 7 }}>
                          Total expense amount
                        </Text>
                      </Body>
                    </CardItem>
                    <View style={styles.viewButton}>
                      <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        colors={['#418AF9', '#418AF9', '#418AF9']}
                        style={styles.linearGradientButton}
                      >
                        <TouchableOpacity
                          onPress={() => {
                            this.setModalOpenClose(true);
                          }}
                        >
                          <View
                            style={{
                              margin: 8,
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'space-around',
                              alignContent: 'center',
                            }}
                          >
                            <Text
                              style={{
                                color: '#fff',
                                fontWeight: 'bold',
                                margin: 3,
                              }}
                              numberOfLines={1}
                              ellipsizeMode="tail"
                            >
                              Create Expense
                            </Text>
                            <FontAwesome5
                              style={{ margin: 3 }}
                              name="arrow-right"
                              color="#FFFFFF"
                              size={20}
                              brand
                            />
                          </View>
                        </TouchableOpacity>
                      </LinearGradient>
                    </View>
                    <HorizDivider />
                    <View
                      style={{
                        flexDirection: 'column',
                        alignContent: 'flex-start',
                        justifyContent: 'flex-start',
                        margin: 25,
                      }}
                    >
                      <Text>New: 4</Text>
                      <View
                        style={{
                          marginTop: 10,
                          marginBottom: 20,
                          borderRadius: 20,
                          backgroundColor: '#1ADAC2',
                          width: 200,
                          height: 5,
                        }}
                      />
                      <Text>Submitted: 2</Text>
                      <View
                        style={{
                          marginTop: 10,
                          marginBottom: 20,
                          borderRadius: 20,
                          backgroundColor: '#F39C12',
                          width: 200,
                          height: 5,
                        }}
                      />
                      <Text>Manager Approved: 3</Text>
                      <View
                        style={{
                          marginTop: 10,
                          marginBottom: 20,
                          borderRadius: 20,
                          backgroundColor: '#808B96',
                          width: 200,
                          height: 5,
                        }}
                      />
                      <CreateExpense
                        modalOpen={expenseCreateOpen}
                        setModalOpenClose={this.setModalOpenClose}
                      />
                    </View>
                  </Card>
                </View>
              </Col>
            </Grid>
          </Container>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconRoundBackground: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 45,
    height: 45,
    borderRadius: 100,
  },
  textMargin: {
    marginLeft: 0,
  },
  viewCol2Style: {
    marginTop: 5,
    margin: 20,
  },
  viewCol1Style: {
    margin: 5,
    height: 550,
  },
  cardContentContainerReport: {
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    flex: 1,
    flexGrow: 1,
    margin: 10,
  },
  cardContentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    flex: 1,
    flexGrow: 1,
    margin: 10,
  },
  linearGradientButton: {
    height: 40,
    borderRadius: 20,
  },
  viewButton: {
    margin: 20,
    shadowColor: '#83B3FA',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.46,
    shadowRadius: 11.14,
    elevation: 17,
  },
  headerColStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'space-around',
  },
  headerText: {
    color: 'blue',
  },
  h1Style: {
    marginTop: 7,
  },
  loaderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loaderHorizontal: {
    flexDirection: 'column',
    justifyContent: 'center',
    paddingTop: 20,
  },
});

export default ExpenseMainScreen;
