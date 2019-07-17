import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import Lo from 'lodash';
import {
  Row,
  CardItem,
  Card,
  Col,
  // ListItem,
  // List,
  Tabs,
  Tab,
  TabHeading,
  Container,
  Text,
} from 'native-base';
import { List } from 'react-native-paper';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5Pro';
import { CNXH4 } from 'cnxapp/src/components/Typography';
import { setRootGlobalLoader } from 'cnxapp/src/app/rootActions';
import { getChannelList } from '../actions';
import { selectGlobalLoader, selectChannelList } from '../selectors';

class EventsQuickView extends React.Component {
  state = {
    channels: [],
    myChannels: [],
    otherChannels: [],
    zoomPhoneNumbers: [],
  };

  componentDidMount() {
    this.props.fetchChannelList();
  }

  fetchChannelList_ = () => {
    const { channelList } = this.props;
    if (!Lo.isEmpty(channelList)) {
      const myChannels = channelList.MyChannels;
      const otherChannels = channelList.OtherChannel;
      const zoomPhoneNumbers = channelList.ZoomPhoneNumbers;
      this.setState({ myChannels, otherChannels, zoomPhoneNumbers });
    }
  };

  render() {
    const { myChannels, otherChannels, zoomPhoneNumbers } = this.state;
    const { channelList } = this.props;
    console.log('this is a channel from render', channelList);
    // this.fetchChannelList_();

    return (
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
                    {/* <List>
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
                </List> */}
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
                    <FontAwesome5
                      name="video"
                      color="#005CD1"
                      size={20}
                      brand
                    />
                  </View>
                  <CNXH4 style={styles.textMargin}>Conference</CNXH4>
                </CardItem>
                <Container>
                  <Tabs tabContainerStyle={{ elevation: 0 }}>
                    <Tab
                      heading={
                        <TabHeading
                          style={{
                            backgroundColor: 'transparent',
                            elevation: 0,
                          }}
                        >
                          <FontAwesome5
                            name="video"
                            color="#fff"
                            size={20}
                            brand
                          />
                        </TabHeading>
                      }
                    >
                      <ScrollView>
                        <View>
                          <List.Item title="video1" description="conference" />
                          {/* <List.Item title = {} /> */}
                          {/* <List>
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
                      </List> */}
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
                      {/* <Text>Tab 2</Text> */}
                      {/* <List.Item
                        title="just called"
                        description="this is not called from API22323"
                      /> */}
                      {/* {channelList
                        ? channelList.MyChannels.map(myChannel => (
                          <View>
                            <List.Item
                              title={myChannel.ChannelName}
                              description="this is a channel Descriptions"
                            />
                          </View>
                        ))
                        : null} */}
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
                      <Text>Tab 3 Descriptions</Text>
                      {otherChannels.map(otherChannel => (
                        <View>
                          <List.Item
                            title={otherChannel.CreatorName}
                            description={
                              otherChannel.ChannelName
                                ? otherChannel.ChannelName
                                : 'not from api '
                            }
                          />
                        </View>
                      ))}
                    </Tab>
                  </Tabs>
                </Container>
              </CardItem>
            </Card>
          </Col>
        </Row>
      </View>
    );
  }
}

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

EventsQuickView.propTypes = {
  channelList: PropTypes.object,
  fetchChannelList: PropTypes.func.isRequired,
};
const mapStateToProps = createStructuredSelector({
  loadState: selectGlobalLoader(),
  channelList: selectChannelList(),
});
const mapDispatchToProps = dispatch => ({
  setGlobalLoaderState: value => dispatch(setRootGlobalLoader(value)),
  fetchChannelList: () => dispatch(getChannelList()),
});
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(EventsQuickView);
// export default EventsQuickView;
