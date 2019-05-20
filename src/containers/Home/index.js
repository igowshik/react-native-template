import React from 'react';
import PropTypes from 'prop-types';
import { AsyncStorage, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { Container } from 'native-base';
import { compose } from 'redux';
import { withNavigation } from 'react-navigation';

import { Util } from '../../utils';
// import SideBarList from './components/SideBarList';
import DashboardMainScreen from '../Dashboard';
import ExpenseMainScreen from '../Expense';
import ConexionMainScreen from '../Conexion';

import * as Colors from '../../utils/colorsConstants';

// const userImage = require('../../assets/images/user.png');

class HomeScreen extends React.Component {
  state = {
    // sideBarWidth: 50,
    // sideBarHeight: 50,
    activeTab: 'Dashboard',
  };

  findDeviceSideBarWidth = () => {
    const windowWidth = Util.size.width;
    const findMainWidth = (93 * windowWidth) / 100;
    const sideBarWidth = windowWidth - findMainWidth;
    return sideBarWidth;
  };

  findDeviceSideBarHeight = () => {
    const windowHeight = Util.size.height;
    const findMainHeight = (93 * windowHeight) / 100;
    const headerBarHeight = windowHeight - findMainHeight;
    return headerBarHeight;
  };

  componentDidMount() {
    // const width = this.findDeviceSideBarWidth();
    // const height = this.findDeviceSideBarHeight();
    // this.setState({ sideBarWidth: width, sideBarHeight: height });
  }

  handleSideBarTabChange = tabValue => {
    this.setState({ activeTab: tabValue });
  };

  renderMainViewComponent = () => {
    const { activeTab } = this.state;
    switch (activeTab) {
      case 'Dashboard':
        return <DashboardMainScreen />;
      case 'ExpenseView':
        return <ExpenseMainScreen />;
      case 'ConexionView':
        return <ConexionMainScreen />;
      default:
        return <DashboardMainScreen />;
    }
  };

  renderHeaderValue = () => {
    const { activeTab } = this.state;
    switch (activeTab) {
      case 'Dashboard':
        return 'Dashboard';
      case 'ExpenseView':
        return 'Expenses';
      case 'ConexionView':
        return 'Conexion';
      default:
        return 'Dashboard';
    }
  };

  _showMoreApp = () => {
    const { navigation } = this.props;
    navigation.navigate('Other');
  };

  _signOutAsync = async () => {
    const { navigation } = this.props;
    await AsyncStorage.clear();
    navigation.navigate('Auth');
  };

  render() {
    // const { rootState } = this.props;
    // const { sideBarWidth, activeTab, sideBarHeight } = this.state;
    return (
      <Container>
        <View style={styles.mainViewMargin}>
          {this.renderMainViewComponent()}
        </View>
      </Container>
    );
  }
}

HomeScreen.propTypes = {
  // rootState: PropTypes.object.isRequired,
  navigation: PropTypes.any,
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: 20,
    backgroundColor: 'transparent',
    borderBottomColor: 'transparent',
  },
  headerContainer2: {
    backgroundColor: 'transparent',
    borderBottomColor: 'transparent',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    flex: 1,
  },
  linearGradientStyle: {
    paddingBottom: 40,
    borderBottomLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  mainViewMargin: {
    margin: 20,
  },
  textMargin: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 25,
    fontWeight: '500',
    color: Colors.primary,
  },
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
  loaderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
});

/**
 * @method: mapStateToProps()
 * @description: Redux Map method to map all redux state into each individual state value
 * @returns: jobState ans filterState in the State
 */
const mapStateToProps = state => ({
  rootState: state.rootState,
});

/**
 * @method: mapDispatchToProps()
 * @description: Map the Props of this class to the respective Redux dispatch functions
 * @returns: Mapped functions
 */
const mapDispatchToProps = dispatch => ({ //eslint-disable-line
  // onGetTerritoryDescription: () => dispatch(getTerritoryDescription()),
  // onGetCurrentUserData: () => dispatch(getCurrentUserDetails()),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withNavigation,
  withConnect,
)(HomeScreen);
