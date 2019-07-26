import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { Card } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5Pro';

import ReportDetails from './ReportDetails';

class ExpenseReport extends React.Component {
  state = {};

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ margin: 10, flexDirection: 'row' }}>
          <Card
            elevation={1}
            style={{
              borderRadius: 10,
              marginRight: 15,
              alignItems: 'center',
              flexDirection: 'row',
              height: 100,
              width: 200,
            }}
          >
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              colors={[
                'rgba(84,92,241,1) 0%',
                'rgba(245,28,152,1) 50%',
                'rgba(120,92,242,1) 100%',
              ]}
              style={{
                flex: 1,
                borderRadius: 10,
                paddingLeft: 15,
                paddingRight: 15,
              }}
            >
              <View style={styles.cardContentContainer}>
                <View
                  style={{
                    marginTop: 5,
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
              </View>
            </LinearGradient>
          </Card>
          <Card
            elevation={1}
            style={{
              borderRadius: 10,
              marginRight: 15,
              alignItems: 'center',
              flexDirection: 'row',
              height: 100,
              width: 200,
            }}
          >
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              colors={[
                'rgba(12,148,10,1) 0%',
                'rgba(26,196,13,1) 50%',
                'rgba(52,218,77,1) 100%',
              ]}
              style={{
                flex: 1,
                borderRadius: 10,
                paddingLeft: 15,
                paddingRight: 15,
              }}
            >
              <View style={styles.cardContentContainer}>
                <View
                  style={{
                    marginTop: 5,
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
                  style={{ color: 'white', fontWeight: 'bold', marginTop: 5 }}
                >
                  CURRENT STATUS
                </Text>
              </View>
            </LinearGradient>
          </Card>
        </View>
        <ScrollView>
          <ReportDetails />
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  cardContentContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    flex: 1,
    flexGrow: 1,
    margin: 5,
    backgroundColor: 'transparent',
  },
});
export default ExpenseReport;
