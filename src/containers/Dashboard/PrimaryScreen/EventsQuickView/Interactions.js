import React from 'react';
import { StyleSheet, View, Linking, Text, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import { List } from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5Pro';
import * as colors from 'cnxapp/src/utils/colorsConstants';

const Interactions = ({ getInteractions }) => (
  <View style={[styles.scene, { backgroundColor: '#fff' }]}>
    {getInteractions.map(interaction => (
      <ScrollView key={interaction.ZoomOccurrenceId}>
        <View
          style={[
            styles.iconRoundBackground,
            {
              margin: 30,
              borderColor: colors.ORANGE,
              backgroundColor: '#fad991',
            },
          ]}
        >
          <FontAwesome5 name="video" color={colors.ORANGE} size={20} brand />
        </View>
        <View style={{ marginLeft: 90, marginTop: -80 }}>
          <List.Item
            title={interaction.CreatedBy.Name}
            description={
              <Text
                style={{ color: colors.BLUE }}
                onPress={() => Linking.openURL(interaction.ZoomStartUrl)}
              >
                {interaction.ZoomStartUrl}
              </Text>
            }
            // {interaction.ZoomStartUrl}
            key={interaction.ZoomOccurrenceId}
          />
        </View>
        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: 1,
          }}
        />
      </ScrollView>
    ))}
  </View>
);

Interactions.propTypes = {
  getInteractions: PropTypes.array,
};

const styles = StyleSheet.create({
  iconRoundBackground: {
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 45,
    height: 45,
    borderRadius: 100,
    borderColor: 'orange',
    // backgroundColor: 'orange',
  },
});

export default Interactions;
