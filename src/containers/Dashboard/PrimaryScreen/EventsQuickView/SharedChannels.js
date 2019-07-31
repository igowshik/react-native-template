import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, ScrollView } from 'react-native';
import { List } from 'react-native-paper';

const SharedChannels = ({ otherChannelList }) => (
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
SharedChannels.propTypes = {
  otherChannelList: PropTypes.array,
};
const styles = StyleSheet.create({});
export default SharedChannels;
