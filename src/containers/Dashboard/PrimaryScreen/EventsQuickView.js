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
import { TabView, TabBar } from 'react-native-tab-view';
import { List } from 'react-native-paper';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5Pro';
import { CNXH4 } from 'cnxapp/src/components/Typography';
import * as colors from 'cnxapp/src/utils/colorsConstants';
import { INTERACTIONS, MY_CHANNEL, SHARED_CHANNEL } from '../constants';
import Interactions from './EventsQuickView/Interactions';
import MyChannels from './EventsQuickView/MyChannels';
import SharedChannels from './EventsQuickView/SharedChannels';

class EventsQuickView extends React.Component {
  state = {
    /* eslint-disable */
    index: 0,
    routes: [
      { key: INTERACTIONS, title: ''},
      { key: MY_CHANNEL, title: '' },
      { key: SHARED_CHANNEL, title: '' },
    ],
  };
  handleRenderIcon = ({route,focused}) =>{
    switch(route.key){
      case INTERACTIONS :
        return(
          <FontAwesome5 name="video" color="#fff"  solid={focused} size={20} brand />
        );
      case MY_CHANNEL:
        return(
          <FontAwesome5
          name="bullhorn"
          color="#fff"
          size={20}
          solid={focused}
          brand
        />
        );
      case SHARED_CHANNEL:
        return(
          <FontAwesome5
          name="hashtag"
          color="#fff"
          solid={focused}
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
    const handleRenderScene = ({ route }) => {
      // const { myChannelList, otherChannelList, getInteractions } = this.props;
      const { selected } = this.state;
      switch (route.key) {
        case INTERACTIONS:
          return <Interactions getInteractions = {getInteractions} selectedValue={selected} />;
        case MY_CHANNEL:
          return <MyChannels myChannelList = {myChannelList} />;
        case SHARED_CHANNEL:
          return <SharedChannels otherChannelList = {otherChannelList} />;
        default:
          return null;
      }
    };

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
          {/* </Row> */}
          {/* <Row style={{ height: 270 }}> */}
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
                    renderScene = { handleRenderScene }
                    onIndexChange={index => this.setState({ index })} //eslint-disable-line
                    initialLayout={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height}}
                    renderTabBar={props => (
                      <TabBar
                        {...props}
                        indicatorStyle={{ backgroundColor: 'white', height: 2 }}
                        tabStyle={{
                          flexDirection: 'row',
                        }}
                        renderIcon={this.handleRenderIcon}
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
        <Row>
          <Card style = {{height: 600, width: 1200, marginTop: 120, borderRadius: 20}}>
            <View
              style={[
                styles.iconRoundBackground,
                { backgroundColor: '#D1E5FF', borderColor: '#005CD1' , margin: 20},
              ]}
              >
              <FontAwesome5
                name="video"
                color="#005CD1"
                size={20}
                brand
              />
            </View>
            <CNXH4 style = {{marginLeft : 90, marginTop : -60 }}>Conference</CNXH4>
            <CardItem>
              <Container>
                {/* <View> */}
                  <TabView
                    navigationState={this.state}
                    renderScene = { handleRenderScene }
                    onIndexChange={index => this.setState({ index })} //eslint-disable-line
                    initialLayout={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height}}
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
                {/* </View> */}
                </Container>
            </CardItem>
          </Card>
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
