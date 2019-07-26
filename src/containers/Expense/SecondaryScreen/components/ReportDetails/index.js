import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5Pro';
import { Divider, Card, Text, DataTable } from 'react-native-paper';
import { Col, Grid } from 'react-native-easy-grid';
import * as Colors from 'cnxapp/src/utils/colorsConstants';

const ReportDetails = () => (
  <View style={{ flex: 1, margin: 10 }}>
    <Card elevation={4}>
      <Card.Title
        title="Expense Report Details"
        style={{ fontSize: 24 }}
        left={propss => (
          <View
            style={[
              styles.iconRoundBackground,
              { backgroundColor: '#EDE7F6', borderColor: '#4527A0' },
            ]}
            {...propss}
          >
            <FontAwesome5 name="file-alt" color="#4527A0" size={25} light />
          </View>
        )}
      />
      <Divider />
      <Card.Content>
        <Grid>
          <Col>
            <DataTable>
              <DataTable.Row>
                <DataTable.Cell>Employee Name :</DataTable.Cell>
                <DataTable.Cell>
                  <Text style={styles.linkText}>test</Text>
                </DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Cell>Report Id :</DataTable.Cell>
                <DataTable.Cell>
                  <Text style={styles.linkText}>test</Text>
                </DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Cell>Report Name :</DataTable.Cell>
                <DataTable.Cell>
                  <Text style={styles.linkText}>test</Text>
                </DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Cell>Report Date :</DataTable.Cell>
                <DataTable.Cell>
                  <Text style={styles.linkText}>test </Text>
                </DataTable.Cell>
              </DataTable.Row>
            </DataTable>
          </Col>
          <Col>
            <DataTable>
              <DataTable.Row>
                <DataTable.Cell>Business Unit :</DataTable.Cell>
                <DataTable.Cell>
                  <Text style={styles.linkText}>test</Text>
                </DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Cell>Cost Center :</DataTable.Cell>
                <DataTable.Cell>
                  <Text style={styles.linkText}>test</Text>
                </DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Cell>Business Purpose :</DataTable.Cell>
                <DataTable.Cell>
                  <Text style={styles.linkText}>test</Text>
                </DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Cell>Created On :</DataTable.Cell>
                <DataTable.Cell>
                  <Text style={styles.linkText}>test </Text>
                </DataTable.Cell>
              </DataTable.Row>
            </DataTable>
          </Col>
        </Grid>
      </Card.Content>
    </Card>
  </View>
);

ReportDetails.propTypes = {
  data: PropTypes.object,
};

const styles = StyleSheet.create({
  iconRoundBackground: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 45,
    height: 45,
    borderRadius: 100,
  },
  linkText: {
    color: Colors.LINK,
  },
  propTag: {
    fontWeight: 'bold',
  },
});

export default ReportDetails;
