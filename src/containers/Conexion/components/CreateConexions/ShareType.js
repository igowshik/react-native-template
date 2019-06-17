import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Headline, Divider } from 'react-native-paper';

import * as colors from 'cnxapp/src/utils/colorsConstants';
import RadioButtonGroup from 'cnxapp/src/components/RadioButtonGroup';

import { shareTypes } from '../../constants';

class ShareType extends React.Component {
  conexionShareForm = () => (
    <View style={styles.parentView}>
      <Card elevation={4} style={styles.card}>
        <Card.Content>
          <View>
            <Headline>Sharing</Headline>
            <Divider />
            <RadioButtonGroup
              defaultValue="Public"
              data={shareTypes}
              name="shared_type"
            />
          </View>
        </Card.Content>
      </Card>
    </View>
  );

  render() {
    return this.conexionShareForm();
  }
}

const styles = StyleSheet.create({
  parentView: {
    margin: 10,
  },
  card: {
    borderTopColor: colors.ORANGE,
    borderTopWidth: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
});

export { ShareType };
