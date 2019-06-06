import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5Pro';
import { Divider, Card, Title, Paragraph, Text } from 'react-native-paper';
import Lo from 'lodash';

import * as Colors from 'cnxapp/src/utils/colorsConstants';

const Address = props => {
  const { data } = props;
  if (!Lo.isEmpty(data)) {
    return (
      <View style={{ flex: 1, margin: 15 }}>
        <Card elevation={4}>
          <Card.Title
            title="Address"
            left={propss => (
              <View
                style={[
                  styles.iconRoundBackground,
                  { backgroundColor: '#E8F5E9', borderColor: '#1B5E20' },
                ]}
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
                <Title>
                  <FontAwesome5
                    name="map-marker-plus"
                    color={Colors.YELLOW}
                    size={20}
                    light
                  />
                  <Text style={{ marginLeft: 3 }}>{add.AddressType}</Text>
                </Title>
                <Divider />
                <Paragraph>{add.DisplayAddress}</Paragraph>
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
});

export default Address;
