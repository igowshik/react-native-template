import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import {
  Row,
  CardItem,
  Card,
  Col,
  ListItem,
  List,
  Tabs,
  Tab,
  TabHeading,
  Container,
  Text,
} from 'native-base';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5Pro';
import { CNXH4 } from 'cnxapp/src/components/Typography';

const EventsQuickView = () => (
  <View style={styles.containerContent}>
    <Row style={{ height: 270 }}>
      <Col style={styles.coloumnCard}>
        <Card style={{ height: 300 }}>
          <CardItem style={styles.cardContentContainerReport}>
            <CardItem header style={styles.headerStyle}>
              <View
                style={[
                  styles.iconRoundBackground,
                  { backgroundColor: '#F9DFF1', borderColor: '#B60580' },
                ]}
              >
                <FontAwesome5
                  name="envelope-open-text"
                  color="#B60580"
                  size={20}
                  brand
                />
              </View>
              <CNXH4 style={styles.textMargin}>Notifications</CNXH4>
            </CardItem>
            <ScrollView>
              <View>
                <List>
                  <ListItem>
                    <Text style={{ color: '#3498DB' }}>
                      Platform Practice - Academy Course
                    </Text>
                  </ListItem>
                  <ListItem>
                    <Text style={{ color: '#3498DB' }}>
                      Payroll System Implementation - Activity assigned
                    </Text>
                  </ListItem>
                  <ListItem>
                    <Text style={{ color: '#3498DB' }}>
                      Monthly Expense Report - November - Manager Approved
                    </Text>
                  </ListItem>
                  <ListItem>
                    <Text style={{ color: '#3498DB' }}>
                      Monthly Expense Report - December - Auto Approved
                    </Text>
                  </ListItem>
                  <ListItem>
                    <Text style={{ color: '#3498DB' }}>
                      Timesheet not submitted for last period
                    </Text>
                  </ListItem>
                </List>
              </View>
            </ScrollView>
          </CardItem>
        </Card>
      </Col>
      <Col style={styles.coloumnCard}>
        <Card style={{ height: 300 }}>
          <CardItem style={styles.cardContentContainerReport}>
            <CardItem header style={styles.headerStyle}>
              <View
                style={[
                  styles.iconRoundBackground,
                  { backgroundColor: '#D1E5FF', borderColor: '#005CD1' },
                ]}
              >
                <FontAwesome5 name="video" color="#005CD1" size={20} brand />
              </View>
              <CNXH4 style={styles.textMargin}>Conference</CNXH4>
            </CardItem>
            <Container>
              <Tabs>
                <Tab
                  heading={
                    <TabHeading style={{ backgroundColor: 'transparent' }}>
                      <FontAwesome5 name="video" color="#fff" size={20} brand />
                    </TabHeading>
                  }
                >
                  <ScrollView>
                    <View>
                      <List>
                        <ListItem>
                          <Text
                            style={{
                              color: '#3498DB',
                              textDecorationLine: 'underline',
                            }}
                          >
                            ISMS Audit preparation meeting
                          </Text>
                          <Text style={{ fontSize: 15, color: 'grey' }}>
                            - 02/01/2019 10:30 PM 20 mins.
                          </Text>
                        </ListItem>
                        <ListItem>
                          <Text
                            style={{
                              color: '#3498DB',
                              textDecorationLine: 'underline',
                            }}
                          >
                            New Client Discussion
                          </Text>
                          <Text style={{ fontSize: 15, color: 'grey' }}>
                            {' '}
                            - 02/04/2019 10:30 PM 60 mins.
                          </Text>
                        </ListItem>
                        <ListItem>
                          <Text
                            style={{
                              color: '#3498DB',
                              textDecorationLine: 'underline',
                            }}
                          >
                            Follow up conference with Smith
                          </Text>
                          <Text style={{ fontSize: 15, color: 'grey' }}>
                            {' '}
                            - 02/05/2019 10:30 PM 60 mins.
                          </Text>
                        </ListItem>
                      </List>
                    </View>
                  </ScrollView>
                </Tab>
                <Tab
                  heading={
                    <TabHeading style={{ backgroundColor: 'transparent' }}>
                      <FontAwesome5
                        name="bullhorn"
                        color="#fff"
                        size={20}
                        brand
                      />
                    </TabHeading>
                  }
                >
                  <Text>Tab 2</Text>
                </Tab>
                <Tab
                  heading={
                    <TabHeading style={{ backgroundColor: 'transparent' }}>
                      <FontAwesome5
                        name="hashtag"
                        color="#fff"
                        size={20}
                        brand
                      />
                    </TabHeading>
                  }
                >
                  <Text>Tab 3</Text>
                </Tab>
              </Tabs>
            </Container>
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
    justifyContent: 'flex-start',
    backgroundColor: 'transparent',
    alignSelf: 'flex-start',
  },
  coloumnCard: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 0,
  },
  cardContentContainerReport: {
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    flex: 1,
    flexGrow: 1,
    // margin: 5
  },
  iconRoundBackground: {
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 45,
    height: 45,
    borderRadius: 100,
  },
  headerStyle: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
  },
  textMargin: {
    marginLeft: 8,
  },
});

export default EventsQuickView;
