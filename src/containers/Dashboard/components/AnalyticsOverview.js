import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Row, CardItem, Card, Col, Body, Text } from 'native-base';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5Pro';
import { CNXH1 } from 'cnxapp/src/components/Typography';

const AnalyticsOverview = props => ( //eslint-disable-line
  <View style={styles.containerContent}>
    <Row>
      <Col style={styles.coloumnCard}>
        {/* <TouchableHighlight > */}
        <Card style={styles.headerColCard}>
          <CardItem>
            <Body style={styles.cardContentContainer}>
              <View
                style={[
                  styles.iconRoundBackground,
                  { backgroundColor: '#EAFAF1', borderColor: '#186A3B' },
                ]}
              >
                <FontAwesome5
                  name="money-bill-alt"
                  color="#186A3B"
                  size={25}
                  light
                />
              </View>
              <CNXH1 style={styles.h1Style}>7</CNXH1>
              <Text>Pending expense</Text>
            </Body>
          </CardItem>
        </Card>
        {/* </TouchableHighlight> */}
      </Col>
      <Col style={styles.coloumnCard}>
        <Card style={styles.headerColCard}>
          <CardItem>
            <Body style={styles.cardContentContainer}>
              <View
                style={[
                  styles.iconRoundBackground,
                  { backgroundColor: '#FEEFDF', borderColor: '#F98406' },
                ]}
              >
                <FontAwesome5
                  name="life-ring"
                  color="#F98406"
                  size={25}
                  light
                />
              </View>
              <CNXH1 style={styles.h1Style}>52</CNXH1>
              <Text>Pending cases</Text>
            </Body>
          </CardItem>
        </Card>
      </Col>
      <Col style={styles.coloumnCard}>
        <Card style={styles.headerColCard}>
          <CardItem>
            <Body style={styles.cardContentContainer}>
              <View
                style={[
                  styles.iconRoundBackground,
                  { backgroundColor: '#FACDD6', borderColor: '#F50938' },
                ]}
              >
                <FontAwesome5
                  name="calendar-check"
                  color="#F50938"
                  size={25}
                  light
                />
              </View>
              <CNXH1 style={styles.h1Style}>23</CNXH1>
              <Text>Pending calls</Text>
            </Body>
          </CardItem>
        </Card>
      </Col>
      <Col style={styles.coloumnCard}>
        <Card style={styles.headerColCard}>
          <CardItem>
            <Body style={styles.cardContentContainer}>
              <View
                style={[
                  styles.iconRoundBackground,
                  { backgroundColor: '#EBDEF0', borderColor: '#4A235A' },
                ]}
              >
                <FontAwesome5 name="comments" color="#4A235A" size={20} light />
              </View>
              <CNXH1 style={styles.h1Style}>14</CNXH1>
              <Text>Unread messages</Text>
            </Body>
          </CardItem>
        </Card>
      </Col>
    </Row>
  </View>
);

const styles = StyleSheet.create({
  containerContent: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 1,
    marginTop: 30,
    marginBottom: 30,
    backgroundColor: 'transparent',
  },
  coloumnCard: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 0,
  },
  headerColCard: {
    minHeight: 180,
  },
  iconRoundBackground: {
    borderWidth: 0.8,
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 100,
  },
  cardContentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    flex: 1,
    flexGrow: 1,
    margin: 10,
  },
  h1Style: {
    paddingTop: 30,
    paddingBottom: 10,
    fontSize: 40,
  },
});

export default AnalyticsOverview;
