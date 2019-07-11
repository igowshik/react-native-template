import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5Pro';
import { Divider, Card, Chip } from 'react-native-paper';

import Lo from 'lodash';

// import * as Colors from 'cnxapp/src/utils/colorsConstants';
import { getShareUser } from '../util';

const Sharing = props => {
  const { data } = props;
  if (!Lo.isEmpty(data)) {
    return (
      <View style={{ flex: 1, margin: 15 }}>
        <Card elevation={4}>
          <Card.Title
            title="Shared Users"
            left={propss => (
              <View
                style={[
                  styles.iconRoundBackground,
                  { backgroundColor: '#F3E5F5', borderColor: '#880E4F' },
                ]}
                {...propss}
              >
                <FontAwesome5
                  name="share-alt"
                  color="#880E4F"
                  size={25}
                  light
                />
              </View>
            )}
          />
          <Divider />
          <Card.Content>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                margin: 10,
                flexWrap: 'wrap',
              }}
            >
              {data.Users.map(user => (
                <Chip
                  icon={() => (
                    <FontAwesome5
                      name="user"
                      color={getShareUser(user.Role)}
                      size={15}
                      solid
                    />
                  )}
                  key={user.ConexionUserId}
                  style={{ margin: 2 }}
                >
                  {user.UserName}
                </Chip>
              ))}
            </View>
          </Card.Content>
        </Card>
      </View>
    );
  }

  return null;
};

Sharing.propTypes = {
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

export default Sharing;
