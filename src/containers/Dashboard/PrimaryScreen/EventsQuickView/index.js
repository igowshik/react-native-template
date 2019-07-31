import React from 'react';

import { TabView, TabBar } from 'react-native-tab-view';
import { List } from 'react-native-paper';
import PropTypes from 'prop-types';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5Pro';
// import { CNXH4 } from 'cnxapp/src/components/Typography';
// import * as colors from 'cnxapp/src/utils/colorsConstants';
import { INTERACTIONS, MY_CHANNEL, SHARED_CHANNEL } from '../constants';
import Interactions from './EventsQuickView/Interactions';
import MyChannels from './EventsQuickView/MyChannels';
import SharedChannels from './EventsQuickView/SharedChannels';
class EventsQuickView extends React.Component {
  state = {
    /* eslint-disable */
    index: 0,
    routes: [
      { key: INTERACTIONS, title: '' },
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
  render(){
    const handleRenderScene = ({ route }) => {
      const { getInteractions, myChannelList, otherChannelList } = this.props;
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
    return(
      <TabView
        navigationState={this.state}
        renderScene={handleRenderScene}
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
    );
  }
}
EventsQuickView.propTypes = {
  myChannelList: PropTypes.array,
  otherChannelList: PropTypes.array,
  getInteractions: PropTypes.array,
};

export default EventsQuickView;

