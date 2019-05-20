import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, TouchableHighlight, Image } from 'react-native';
import { List, ListItem, Left } from 'native-base';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const logo = require('cnxapp/src/assets/images/logo.png');

class SideBarList extends React.Component {
  onClickTab = value => {
    const { handleTabChange } = this.props;
    handleTabChange(value);
  };

  render() {
    const { activeTab, _signOutAsync } = this.props;
    return (
      <View style={{ backgroundColor: '#5F6A6A', height: '100%' }}>
        <List>
          <ListItem style={{ borderBottomWidth: 0 }}>
            <TouchableHighlight style={styles.imageContainer}>
              <Image style={styles.image} source={logo} />
            </TouchableHighlight>
          </ListItem>
          <ListItem
            icon
            onPress={() => {
              this.onClickTab('Dashboard');
            }}
          >
            <Left>
              <FontAwesome5
                name="chart-pie"
                color={activeTab === 'Dashboard' ? '#007aff' : '#707B7C'}
                size={20}
                brand
              />
            </Left>
          </ListItem>
          <ListItem
            icon
            onPress={() => {
              this.onClickTab('ExpenseView');
            }}
          >
            <Left>
              <FontAwesome5
                name="money-bill-alt"
                value="ExpenseView"
                color={activeTab === 'ExpenseView' ? '#007aff' : '#707B7C'}
                size={20}
                brand
              />
            </Left>
          </ListItem>
          <ListItem
            icon
            onPress={() => {
              this.onClickTab('ConexionView');
            }}
          >
            <Left>
              <FontAwesome5
                name="address-book"
                value="ConexionView"
                color={activeTab === 'ConexionView' ? '#007aff' : '#707B7C'}
                size={30}
                brand
              />
            </Left>
          </ListItem>
          <ListItem icon>
            <Left>
              <FontAwesome5 name="comments" color="#707B7C" size={20} brand />
            </Left>
          </ListItem>
          <ListItem icon>
            <Left>
              <FontAwesome5 name="hourglass" color="#707B7C" size={20} brand />
            </Left>
          </ListItem>
          <ListItem icon>
            <Left>
              <FontAwesome5 name="life-ring" color="#707B7C" size={20} brand />
            </Left>
          </ListItem>
          <ListItem icon>
            <Left>
              <FontAwesome5
                name="flag-checkered"
                color="#707B7C"
                size={20}
                brand
              />
            </Left>
          </ListItem>
          <ListItem icon>
            <Left>
              <FontAwesome5
                name="address-card"
                color="#707B7C"
                size={20}
                brand
              />
            </Left>
          </ListItem>
          <ListItem icon>
            <Left>
              <FontAwesome5 name="chart-line" color="#707B7C" size={20} brand />
            </Left>
          </ListItem>
          <ListItem icon>
            <Left>
              <FontAwesome5 name="ellipsis-h" color="#707B7C" size={20} brand />
            </Left>
          </ListItem>
          <ListItem icon>
            <Left>
              <FontAwesome5
                name="sign-out-alt"
                color="#DC0101"
                size={25}
                brand
                onPress={_signOutAsync}
              />
            </Left>
          </ListItem>
        </List>
      </View>
    );
  }
}

SideBarList.propTypes = {
  _signOutAsync: PropTypes.func.isRequired,
  activeTab: PropTypes.string,
  handleTabChange: PropTypes.func,
};

const styles = StyleSheet.create({
  imageContainer: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  image: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
});

export default SideBarList;
