import * as React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5Pro';
import { Title } from 'react-native-paper';
import * as colors from 'cnxapp/src/utils/colorsConstants';

const FirstRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#ff4081' }]} />
);

const SecondRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#ff4021' }]} />
);

export default class TabViewExample extends React.Component {
  /* eslint-disable */
  state = {
    index: 0,
    routes: [
      {
        key: 'dove',
        title: 'Dove',
      },
      {
        key: 'animal',
        title: 'Animal',
      },
    ],
  };
  /* eslint-enable */

  handleRenderIcon = ({ route, focused, color }) => {
    switch (route.key) {
      case 'dove':
        return (
          <FontAwesome5
            name="dove"
            style={{ marginRight: 5 }}
            solid={focused}
            color={color}
            size={20}
          />
        );
      case 'animal':
        return (
          <FontAwesome5
            name="paw"
            style={{ marginRight: 5 }}
            solid={focused}
            color={color}
            size={20}
          />
        );
      default:
        return null;
    }
  };

  handleRenderText = ({ route }) => (
    <Title style={{ color: '#FFFFFF' }}>{route.title}</Title>
  );

  render() {
    return (
      <TabView
        navigationState={this.state}
        renderScene={SceneMap({
          dove: FirstRoute,
          animal: SecondRoute,
        })}
        onIndexChange={index => this.setState({ index })} //eslint-disable-line
        initialLayout={{ width: Dimensions.get('window').width }}
        renderTabBar={props => (
          <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: 'white', height: 2 }}
            tabStyle={{
              flexDirection: 'row',
            }}
            renderIcon={this.handleRenderIcon}
            renderLabel={this.handleRenderText}
            style={{ backgroundColor: colors.PRIMARY }}
            bounces
          />
        )}
      />
    );
  }
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
});
