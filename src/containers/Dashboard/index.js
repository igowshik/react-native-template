import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Header, Left, Right, Button } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5Pro';

import CNXFullPageModal from 'cnxapp/src/components/CNXFullPageModal';
import { CNXH4, CNXH3, CNXH2 } from 'cnxapp/src/components/CNXTypography';

// import ReportQuickView from './components/ReportQuickView';
import AnalyticsOverview from './components/AnalyticsOverview';
import EventsQuickView from './components/EventsQuickView';

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
        <ScrollView>
          <View>
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={[
                'rgba(255, 149, 0,0.3)',
                'rgba(255, 149, 0,0.5)',
                'rgba(255, 149, 0,1)',
              ]}
              style={styles.linearGradientStyle}
            >
              <Header style={styles.headerContainer}>
                <Left>
                  <CNXH3 style={{ color: '#000' }}>Analytics Overview</CNXH3>
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

            <CNXFullPageModal
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
            </CNXFullPageModal>

            <View style={{ paddingBottom: 40 }}>
              <Header style={styles.header}>
                <CNXH2 style={{ color: 'black' }}>Events view</CNXH2>
              </Header>
              <EventsQuickView />
            </View>
            {/* <View style={{ paddingBottom: 40, paddingTop: 10 }}>
            <Header style={styles.header}>
              <CNXH2 style={{ color: 'black' }}>Quick report</CNXH2>
            </Header>
            <ReportQuickView />
          </View> */}
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
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'rgba(255, 149, 0,0.9)',
  },
});

export default DashboardMainView;
