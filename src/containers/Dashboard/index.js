import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Header, Left, Right, Button } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5Pro';
import { Card } from 'react-native-paper';

import FullPageModal from 'cnxapp/src/components/FullPageModal';
import { CNXH4, CNXH3, CNXH2 } from 'cnxapp/src/components/Typography';

// import ReportQuickView from './components/ReportQuickView';
import AnalyticsOverview from './components/AnalyticsOverview';
import EventsQuickView from './components/EventsQuickView';
// import ReportQuickView from './components/ReportQuickView';

class DashboardMainView extends React.Component {
  state = {
    modalVisible: false,
  };

  modalVisibilityChange = value => {
    this.setState({ modalVisible: value });
  };

  showModal = () => this.setState({ modalVisible: true });

  render() {
    return (
      <View style={{ height: '100%' }}>
        <ScrollView style={{ padding: 20, paddingBottom: 0 }}>
          <Card elevation={5}>
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={['rgba(17,111,255,1) 11.2%', 'rgba(112,226,226,1) 91.1%']}
              style={styles.linearGradientStyle}
            >
              <Header style={styles.headerContainer}>
                <Left>
                  <CNXH3 style={{ color: '#FFF' }}>Analytics Overview</CNXH3>
                </Left>
                <Right>
                  <Button iconRight bordered dark onPress={this.showModal}>
                    <CNXH4>Last 30 days</CNXH4>
                    <FontAwesome5
                      style={{ margin: 5 }}
                      name="arrow-down"
                      size={20}
                      brand
                    />
                  </Button>
                </Right>
              </Header>
              <AnalyticsOverview />
            </LinearGradient>
          </Card>
          <FullPageModal
            visible={this.state.modalVisible}
            handleModalVisible={this.modalVisibilityChange}
            modalHeaderText="Testing modal header"
          >
            <View style={{ paddingBottom: 40 }}>
              <Header style={styles.header}>
                <CNXH2 style={{ color: 'black' }}>Events view</CNXH2>
              </Header>
              <EventsQuickView />
            </View>
          </FullPageModal>

          <View style={{ paddingBottom: 40 }}>
            <Header style={styles.header}>
              <CNXH2 style={{ color: 'black' }}>Events view</CNXH2>
            </Header>
            <EventsQuickView />
          </View>
          <View style={{ paddingBottom: 40, paddingTop: 10 }}>
            {/* <Header style={styles.header}>
              <CNXH2 style={{ color: 'black' }}>Quick report</CNXH2>
            </Header>
            <ReportQuickView /> */}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listItemPadding: {
    paddingTop: 25,
    paddingBottom: 25,
  },
  headerContainer: {
    paddingTop: 20,
    backgroundColor: 'transparent',
    borderBottomColor: 'transparent',
    elevation: 0, // remove shadow on Android
    shadowOpacity: 0,
  },
  header: {
    paddingTop: 20,
    height: 45,
    justifyContent: 'flex-start',
    elevation: 0, // remove shadow on Android
    shadowOpacity: 0,
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
    borderRadius: 3,
    // borderWidth: 1,
    // borderColor: 'rgba(0,0, 0,0.3)',
  },
});

export default DashboardMainView;
