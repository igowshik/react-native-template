import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withNavigation } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import { Button, Card } from 'react-native-paper';

// import DashboardMainScreen from '../Dashboard';
import ActionSheet from '../../components/ActionSheet';

class HomeScreen extends React.Component {
  state = {
    visible: false,
  };

  _showModal = () => this.setState({ visible: true });

  _hideModal = () => this.setState({ visible: false });

  _signOutAsync = async () => {
    const { navigation } = this.props;
    await AsyncStorage.clear();
    navigation.navigate('Auth');
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        {/* <DashboardMainScreen /> */}
        <Button style={{ marginTop: 80 }} onPress={this._showModal}>
          Show
        </Button>
        <ActionSheet visible={this.state.visible} hideSheet={this._hideModal}>
          {/* <View style={{ flexDirection: 'row', width: 'auto' }}> */}
          <Card style={{ width: 200, height: 100 }}>
            <Card.Title title="Card Title" subtitle="Card Subtitle" />
          </Card>
          <Card style={{ width: 200, height: 100 }}>
            <Card.Title title="Card Title" subtitle="Card Subtitle" />
          </Card>
          <Card style={{ width: 200, height: 100 }}>
            <Card.Title title="Card Title" subtitle="Card Subtitle" />
          </Card>
          <Card style={{ width: 200, height: 100 }}>
            <Card.Title title="Card Title" subtitle="Card Subtitle" />
          </Card>
          <Card style={{ width: 200, height: 100 }}>
            <Card.Title title="Card Title" subtitle="Card Subtitle" />
          </Card>
          <Card style={{ width: 200, height: 100 }}>
            <Card.Title title="Card Title" subtitle="Card Subtitle" />
          </Card>
          {/* </View> */}
        </ActionSheet>
      </View>
    );
  }
}

HomeScreen.propTypes = {
  navigation: PropTypes.any,
};

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

});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withNavigation,
  withConnect,
)(HomeScreen);
