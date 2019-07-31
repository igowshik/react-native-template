import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, ScrollView } from 'react-native';
import { List } from 'react-native-paper';

const MyChannels = ({ myChannelList }) => (
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
MyChannels.propTypes = {
  myChannelList: PropTypes.array,
};
const styles = StyleSheet.create({});
export default MyChannels;
