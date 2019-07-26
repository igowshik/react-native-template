import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { Card } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5Pro';
import { Grid, Col } from 'react-native-easy-grid';

import ReportDetails from '../ReportDetails';
import ReportItem from '../ReportItem';

class ExpenseReportDashboard extends React.Component {
  state = {};

  render() {
    return (
      <View style={{ flex: 1 }}>
        {/* <View style={{ margin: 10, flexDirection: 'row' }}> */}
        <Grid style={{ margin: 10 }}>
          <Col size={80}>
            <Card
              elevation={3}
              style={{
                flex: 1,
                borderRadius: 10,
                flexDirection: 'column',
                height: 100,
              }}
            >
              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                colors={['rgba(84,92,241,1) 0%', 'rgba(120,92,242,1) 100%']}
                style={{
                  flex: 1,
                  borderRadius: 10,
                }}
              >
                <Grid>
                  <Col
                    size={50}
                    style={{
                      borderRightColor: 'white',
                      borderRightWidth: 0.5,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}
                    >
                      <FontAwesome5
                        name="dollar-sign"
                        color="#fff"
                        size={25}
                        light
                        style={{ paddingTop: 10 }}
                      />
                      <Text
                        style={{
                          color: 'white',
                          fontSize: 46,
                          fontWeight: 'bold',
                          paddingLeft: 5,
                        }}
                      >
                        948
                      </Text>
                    </View>
                    <View style={{ marginTop: 5 }}>
                      <Text style={{ color: 'white', fontWeight: 'bold' }}>
                        TOTAL AMOUNT
                      </Text>
                    </View>
                  </Col>
                  <Col
                    size={50}
                    style={{ alignItems: 'center', justifyContent: 'center' }}
                  >
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}
                    >
                      <Text
                        style={{
                          color: 'white',
                          fontSize: 46,
                          fontWeight: 'bold',
                          paddingLeft: 5,
                        }}
                      >
                        New
                      </Text>
                    </View>
                    <Text
                      style={{
                        color: 'white',
                        fontWeight: 'bold',
                        marginTop: 5,
                      }}
                    >
                      CURRENT STATUS
                    </Text>
                  </Col>
                </Grid>

                {/* <View /> */}
              </LinearGradient>
            </Card>
          </Col>
          <Col size={20}>
            <Card
              elevation={3}
              style={{
                marginLeft: 10,
                backgroundColor: 'white',
                flex: 1,
                flexDirection: 'row',
                alignSelf: 'stretch',
                borderRadius: 10,
                height: 100,
              }}
            >
              <View
                style={[
                  styles.iconRoundBackground,
                  {
                    backgroundColor: '#EC6762',
                    borderColor: '#EC6762',
                    margin: 5,
                  },
                ]}
              >
                <FontAwesome5 name="trash-alt" color="#fff" size={25} light />
              </View>

              <View
                style={[
                  styles.iconRoundBackground,
                  {
                    backgroundColor: '#EC6762',
                    borderColor: '#EC6762',
                    margin: 5,
                  },
                ]}
              >
                <FontAwesome5 name="paper-plane" color="#fff" size={25} light />
              </View>
            </Card>
          </Col>
        </Grid>
        {/* </View> */}
        <ScrollView>
          <ReportDetails />
          <ReportItem />
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  cardContentContainer: {
    alignItems: 'center',
    // justifyContent: 'space-evenly',
    flexDirection: 'row',
    flex: 1,
    flexGrow: 1,
    // margin: 5,
    backgroundColor: 'transparent',
  },
  iconRoundBackground: {
    borderWidth: 0.8,
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 100,
  },
});
export default ExpenseReportDashboard;
