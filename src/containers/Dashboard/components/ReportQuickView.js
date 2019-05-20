import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Row, CardItem, Card, Col, Body } from 'native-base';

import { BarChart, ProgressChart } from 'react-native-chart-kit';
import { CNXH4 } from 'cnxapp/src/components/CNXTypography';

const data = [0.3, 0.6, 0.8];

const ReportQuickView = () => (
  <View style={styles.containerContent}>
    <Row style={{ height: 270 }}>
      <Col style={styles.coloumnCard}>
        <Card style={{ height: 250 }}>
          <CardItem>
            <Body style={styles.cardContentContainerReport}>
              <CNXH4 style={{ color: '#000' }}>Call plan</CNXH4>
              <ProgressChart
                data={data}
                width={300}
                height={200}
                chartConfig={{
                  labels: ['January', 'February', 'March'],
                  backgroundGradientFrom: '#FFFFFF',
                  backgroundGradientTo: '#FFFFFF',
                  decimalPlaces: 2, // optional, defaults to 2dp
                  color: (opacity = 1) => `rgba(139, 8, 224, ${opacity})`,
                  style: {
                    borderRadius: 5,
                  },
                }}
              />
            </Body>
          </CardItem>
        </Card>
      </Col>
      <Col style={styles.coloumnCard}>
        <Card style={{ height: 250 }}>
          <CardItem>
            <Body style={styles.cardContentContainerReport}>
              <CNXH4 style={{ color: '#000' }}>Activity plan</CNXH4>
              <BarChart
                data={{
                  labels: ['March', 'April', 'May', 'June'],
                  datasets: [
                    {
                      data: [28, 80, 99, 43],
                    },
                  ],
                }}
                width={300}
                height={200}
                chartConfig={{
                  backgroundGradientFrom: '#FFFFFF',
                  backgroundGradientTo: '#FFFFFF',
                  decimalPlaces: 2, // optional, defaults to 2dp
                  color: (opacity = 1) => `rgba(0,0,0, ${opacity})`,
                  style: {
                    borderRadius: 5,
                  },
                }}
              />
            </Body>
          </CardItem>
        </Card>
      </Col>
    </Row>
  </View>
);

const styles = StyleSheet.create({
  containerContent: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    alignSelf: 'flex-start',
  },
  coloumnCard: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 0,
  },
  cardContentContainerReport: {
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    flex: 1,
    flexGrow: 1,
    margin: 10,
  },
});

export default ReportQuickView;
