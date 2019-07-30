import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5Pro';
import { Divider, Card, DataTable, IconButton } from 'react-native-paper';
import { Col, Grid } from 'react-native-easy-grid';
import * as Colors from 'cnxapp/src/utils/colorsConstants';

const ReportItems = () => (
  <View style={{ flex: 1, margin: 15 }}>
    <Card elevation={4}>
      <Card.Title
        title="Expense Report Items"
        left={propss => (
          <View
            style={[
              styles.iconRoundBackground,
              { backgroundColor: '#D0FCE2', borderColor: '#21D66C' },
            ]}
            {...propss}
          >
            <FontAwesome5 name="list-ul" color="#1F914E" size={20} light />
          </View>
        )}
        right={props => (
          <IconButton
            {...props}
            icon={() => (
              <FontAwesome5
                name="plus-circle"
                color={Colors.PRIMARY}
                size={25}
                light
              />
            )}
            style={{ height: 50, width: 50 }}
            color={Colors.PRIMARY}
            // onPress={() => console.log('Pressed')}
          />
        )}
      />
      <Divider />
      <Card.Content>
        <Grid>
          <Col>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title>Transaction Id</DataTable.Title>
                <DataTable.Title>Transaction Date</DataTable.Title>
                <DataTable.Title>Expense Type</DataTable.Title>
                <DataTable.Title>Miles</DataTable.Title>
                <DataTable.Title>Payment Type</DataTable.Title>
                <DataTable.Title>Business Purpose</DataTable.Title>
                <DataTable.Title>Amount</DataTable.Title>
                <DataTable.Title>Action</DataTable.Title>
              </DataTable.Header>
              <DataTable.Row>
                <DataTable.Cell>263</DataTable.Cell>
                <DataTable.Cell>7/26/2019</DataTable.Cell>
                <DataTable.Cell>Travel - Fuel</DataTable.Cell>
                <DataTable.Cell>23</DataTable.Cell>
                <DataTable.Cell>Credit Card</DataTable.Cell>
                <DataTable.Cell>test purpose</DataTable.Cell>
                <DataTable.Cell>$500.00</DataTable.Cell>
                <DataTable.Cell>$500.00</DataTable.Cell>
              </DataTable.Row>
              <DataTable.Pagination
                page={1}
                numberOfPages={3}
                // onPageChange={page => {
                //   console.log(page);
                // }}
                label="1-2 of 6"
              />
            </DataTable>
          </Col>
        </Grid>
      </Card.Content>
    </Card>
  </View>
);

ReportItems.propTypes = {
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

export default ReportItems;
