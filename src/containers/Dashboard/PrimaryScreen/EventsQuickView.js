import React from 'react';
import { StyleSheet, View, ScrollView, Dimensions } from 'react-native';
import PropTypes from 'prop-types';

import {
  Row,
  CardItem,
  Card,
  Col,
  // ListItem,
  // List,
  // Tabs,
  // Tab,
  // TabHeading,
  Container,
} from 'native-base';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { List } from 'react-native-paper';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5Pro';
import { CNXH4 } from 'cnxapp/src/components/Typography';
import * as colors from 'cnxapp/src/utils/colorsConstants';

class EventsQuickView extends React.Component {
  state = {
    /* eslint-disable */
    index: 1,
    routes: [
      { key: 'first', title: '' },
      { key: 'second', title: '' },
      { key: 'third', title: '' },
    ],
  };
  handleRenderIcon = ({route}) =>{
    switch(route.key){
      case 'first' :
        return(
          <FontAwesome5 name="video" color="#fff" size={20} brand />
        );
      case 'second':
        return(
          <FontAwesome5
          name="bullhorn"
          color="#fff"
          size={20}
          brand
        />
        );
      case 'third':
        return(
          <FontAwesome5
          name="hashtag"
          color="#fff"
          size={20}
          brand
        />
      );
      default :
        return null;
    }
  }

  render() {
    const { myChannelList, otherChannelList, getInteractions } = this.props;
    const FirstRoute = () => (
      <View style={[styles.scene, { backgroundColor: '#fff' }]}>
        <ScrollView>
          {getInteractions.map(interaction => (
            <List.Item
              title={interaction.CreatedBy.Name}
              description={interaction.ZoomStartUrl}
              key={interaction.ZoomOccurrenceId}
            />
          ))}
        </ScrollView>
      </View>
    );
    const SecondRoute = () => (
      <View style={[styles.scene, { backgroundColor: '#fff' }]}>
        <ScrollView>
          {myChannelList.map(myChannel => (
            <List.Item
              title={myChannel.ChannelName}
              description={myChannel.JoinUrl}
              key={myChannel.ZoomMeetingId}
            />
          ))}
        </ScrollView>
      </View>
    );
    const ThirdRoute = () => (
      <View style={[styles.scene, { backgroundColor: '#fff' }]}>
        <ScrollView>
          {otherChannelList.map(otherChannel => (
            <List.Item
              title={otherChannel.ChannelName}
              description={otherChannel.JoinUrl}
              key={otherChannel.ZoomMeetingId}
            />
          ))}
        </ScrollView>
      </View>
    );

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
                  {/* <Tabs tabContainerStyle={{ elevation: 0 }}>
                <Tab
                  heading={
                    <TabHeading
                      style={{
                        backgroundColor: 'transparent',
                        elevation: 0,
                      }}
                    >
                      <FontAwesome5 name="video" color="#fff" size={20} brand />
                    </TabHeading>
                  }
                >
                  <ScrollView>
                    {getInteractions.map(interaction => (
                      <List.Item
                        title={interaction.CreatedBy.Name}
                        description={interaction.ZoomStartUrl}
                        key={interaction.ZoomOccurrenceId}
                      />
                    ))}
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
                  <ScrollView>
                    {myChannelList.map(myChannel => (
                      <List.Item
                        title={myChannel.ChannelName}
                        description={myChannel.JoinUrl}
                        key={myChannel.ZoomMeetingId}
                      />
                    ))}
                  </ScrollView>
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
                  <ScrollView>
                    {otherChannelList.map(otherChannel => (
                      <List.Item
                        title={otherChannel.ChannelName}
                        description={otherChannel.JoinUrl}
                        key={otherChannel.ZoomMeetingId}
                      />
                    ))}
                  </ScrollView>
                </Tab>
              </Tabs> */}
                  <TabView
                    navigationState={this.state}
                    renderScene={SceneMap({
                      first: FirstRoute,
                      second: SecondRoute,
                      third: ThirdRoute,
                    })}
                    onIndexChange={index => this.setState({ index })} //eslint-disable-line
                    initialLayout={{ width: Dimensions.get('window').width }}
                    renderTabBar={props => (
                      <TabBar
                        {...props}
                        indicatorStyle={{ backgroundColor: 'white', height: 2 }}
                        tabStyle={{
                          flexDirection: 'row',
                        }}
                        renderIcon={this.handleRenderIcon}
                        // renderLabel={this.handleRenderText}
                        style={{ backgroundColor: colors.PRIMARY }}
                        bounces
                      />
                    )}
                  />
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
  myChannelList: PropTypes.array,
  otherChannelList: PropTypes.array,
  getInteractions: PropTypes.array,
};
export default EventsQuickView;
