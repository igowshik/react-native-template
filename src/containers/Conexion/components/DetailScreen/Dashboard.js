/**
 * Details Dashboard component
 * Added by Selvam K
 */
// Native imports
import React from 'react';
import { View } from 'react-native';
// Package imports

// Absolute imports
import { CNXTextM } from 'cnxapp/src/components/CNXTexts';

// Relative imports
import { Styles } from './styles';

class Dashboard extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <View style={Styles.mainViewContainer}>
        <CNXTextM style={{ fontSize: 20 }}>Module Dashboard</CNXTextM>
      </View>
    );
  }
}

export default Dashboard;
