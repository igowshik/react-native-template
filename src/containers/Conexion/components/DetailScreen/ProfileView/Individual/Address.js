import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5Pro';
import {
  Divider,
  Card,
  Paragraph,
  IconButton,
  Avatar,
} from 'react-native-paper';
import Lo from 'lodash';

import * as Colors from 'cnxapp/src/utils/colorsConstants';

const Address = props => {
  const { data } = props;
  if (!Lo.isEmpty(data)) {
    return (
      <View style={styles.parentView}>
        <Card elevation={4}>
          <Card.Title
            title="Address"
            left={propss => (
              <View
                style={[styles.iconRoundBackground, styles.iconsColor]}
                {...propss}
              >
                <FontAwesome5
                  name="address-card"
                  color="#1B5E20"
                  size={25}
                  light
                />
              </View>
            )}
          />
          <Divider />
          <Card.Content>
            {data.Addresses.map(add => (
              <View style={{ margin: 10 }} key={add.ConexionAddressId}>
                <Card>
                  <Card.Title
                    title={add.AddressType}
                    left={prope => (
                      <Avatar.Icon
                        {...prope}
                        icon="place"
                        style={styles.avatar}
                        color={Colors.YELLOW}
                      />
                    )}
                  />
                  <Card.Content>
                    <Paragraph>{add.DisplayAddress}</Paragraph>
                  </Card.Content>
                  <Card.Actions>
                    <IconButton
                      icon={() => (
                        <FontAwesome5
                          name="pen-alt"
                          color={Colors.PRIMARY}
                          size={18}
                          solid
                        />
                      )}
                      size={25}
                      onPress={() => {}}
                    />
                    <IconButton
                      icon={() => (
                        <FontAwesome5
                          name="trash"
                          color={Colors.SECONDARY}
                          size={18}
                          solid
                        />
                      )}
                      color={Colors.SECONDARY}
                      size={25}
                      onPress={() => {}}
                    />
                    <IconButton
                      icon={() => (
                        <FontAwesome5
                          name="map-marked-alt"
                          color={Colors.GREEN}
                          size={18}
                          solid
                        />
                      )}
                      color={Colors.GREEN}
                      size={25}
                      onPress={() => {}}
                    />
                  </Card.Actions>
                </Card>
              </View>
            ))}
          </Card.Content>
        </Card>
      </View>
    );
  }
  return null;
};

Address.propTypes = {
  data: PropTypes.object,
};

const styles = StyleSheet.create({
  iconRoundBackground: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 45,
    height: 45,
    borderRadius: 100,
  },
  avatar: {
    backgroundColor: '#FFF',
    borderColor: '#FCBB0D',
    borderWidth: 1,
  },
  parentView: {
    flex: 1,
    margin: 15,
  },
  iconsColor: { backgroundColor: '#E8F5E9', borderColor: '#1B5E20' },
});

export default Address;
