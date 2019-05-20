import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { Row, Item, Input, Icon, View, Col } from 'native-base';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const HeaderBar = props => {
  const { headerHeight } = props;
  return (
    <Row
      style={{
        backgroundColor: '#fff',
        height: headerHeight,
        borderBottomColor: '#DDDCDC',
        borderBottomWidth: 1,
      }}
    >
      <Col>
        <Item style={styles.listItemStyle}>
          <Icon name="search" color="#707B7C" />
          <Input placeholder="Search" />
        </Item>
      </Col>
      <Col />
      <Col style={styles.colStyle}>
        <View style={styles.container}>
          <FontAwesome5 name="cog" color="#707B7C" size={20} brand />
        </View>
      </Col>
    </Row>
  );
};

HeaderBar.propTypes = {
  headerHeight: PropTypes.number,
};

const styles = StyleSheet.create({
  listItemStyle: {
    borderBottomColor: '#fff',
    paddingLeft: 30,
  },
  colStyle: {
    width: 60,
    borderLeftColor: '#DDDCDC',
    borderLeftWidth: 1,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    flex: 1,
  },
});

export default HeaderBar;
