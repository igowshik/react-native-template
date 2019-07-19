import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5Pro';
import { Divider, Card, DataTable, Text } from 'react-native-paper';
import { Grid, Col } from 'native-base';

import * as Colors from 'cnxapp/src/utils/colorsConstants';

const Communication = props => {
  const { data } = props;
  if (data) {
    return (
      <View style={{ flex: 1, margin: 15 }}>
        <Card elevation={4}>
          <Card.Title
            title="Communications"
            style={{ fontSize: 24 }}
            left={propss => (
              <View
                style={[
                  styles.iconRoundBackground,
                  { backgroundColor: '#EDE7F6', borderColor: '#4527A0' },
                ]}
                {...propss}
              >
                <FontAwesome5
                  name="paper-plane"
                  color="#4527A0"
                  size={25}
                  light
                />
              </View>
            )}
          />
          <Divider />
          <Card.Content>
            <Grid>
              <Col>
                <DataTable>
                  <DataTable.Row>
                    <DataTable.Cell>Business Home Page:</DataTable.Cell>
                    <DataTable.Cell>
                      <Text style={styles.linkText}>
                        {data.BusinessHomePage ? data.BusinessHomePage : null}
                      </Text>
                    </DataTable.Cell>
                  </DataTable.Row>
                  <DataTable.Row>
                    <DataTable.Cell>Primary Phone Number:</DataTable.Cell>
                    <DataTable.Cell>
                      <Text style={styles.linkText}>
                        {data.BusinessTelephoneNumber
                          ? data.BusinessTelephoneNumber
                          : null}
                      </Text>
                    </DataTable.Cell>
                  </DataTable.Row>
                  <DataTable.Row>
                    <DataTable.Cell>Secondary Phone Number:</DataTable.Cell>
                    <DataTable.Cell>
                      <Text style={styles.linkText}>
                        {data.Business2TelephoneNumber
                          ? data.Business2TelephoneNumber
                          : null}
                      </Text>
                    </DataTable.Cell>
                  </DataTable.Row>
                  <DataTable.Row>
                    <DataTable.Cell>Business Fax Number:</DataTable.Cell>
                    <DataTable.Cell>
                      <Text style={styles.linkText}>
                        {data.BusinessFaxNumber ? data.BusinessFaxNumber : null}
                      </Text>
                    </DataTable.Cell>
                  </DataTable.Row>
                </DataTable>
              </Col>
            </Grid>
          </Card.Content>
        </Card>
      </View>
    );
  }

  return null;
};

Communication.propTypes = {
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
});

export default Communication;
