import React, { PureComponent } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import {
  Card,
  Text,
  Subheading,
  DataTable,
  IconButton,
} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5Pro';
import { Grid, Col, Row } from 'react-native-easy-grid';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';

import * as Colors from 'cnxapp/src/utils/colorsConstants';
import { getDateByFormat } from 'cnxapp/src/utils/DateFormatter';
import { createStructuredSelector } from 'reselect';
import { selectExpenseDetails } from '../../selectors';

class ReportDetails extends PureComponent {
  render() {
    const { expenseDetails } = this.props;
    return (
      <Card elevation={3} style={styles.rootCard}>
        <LinearGradient
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
          colors={['#6a11cb', '#2575fc']}
          style={{
            flex: 1,
            borderRadius: 20,
          }}
        >
          <Card.Title
            title={
              <Subheading style={{ color: '#FFF' }}>Report Details</Subheading>
            }
            left={propss => (
              <View
                style={[
                  styles.iconRoundBackground,
                  {
                    backgroundColor: '#FFFFFF',
                  },
                ]}
                {...propss}
              >
                <FontAwesome5
                  name="file-invoice-dollar"
                  color="#4527A0"
                  size={20}
                  light
                />
              </View>
            )}
            right={rightProp => (
              <View {...rightProp} style={styles.cardRight}>
                <IconButton
                  icon={() => (
                    <FontAwesome5 name="marker" color="#FFF" size={16} solid />
                  )}
                  color="#FFF"
                  size={20}
                />
                <IconButton
                  icon={() => (
                    <FontAwesome5
                      name="paper-plane"
                      color="#FFF"
                      size={16}
                      solid
                    />
                  )}
                  color="#FFF"
                  size={20}
                  // onPress={() => console.log('Pressed')}
                />
                <IconButton
                  icon={() => (
                    <FontAwesome5 name="trash" color="#FFF" size={16} solid />
                  )}
                  color="#FFF"
                  size={20}
                  // onPress={() => console.log('Pressed')}
                />
                <IconButton
                  icon={() => (
                    <FontAwesome5
                      name="file-archive"
                      color="#FFF"
                      size={16}
                      solid
                    />
                  )}
                  color="#FFF"
                  size={20}
                  // onPress={() => console.log('Pressed')}
                />
              </View>
            )}
          />
          <View style={styles.cardContent}>
            <Grid style={styles.contentGrid}>
              <Row>
                <Col>
                  <ScrollView>
                    <DataTable>
                      <DataTable.Row>
                        <View style={styles.rowView}>
                          <Text>Report Name :</Text>
                          <Text style={styles.linkText}>
                            {expenseDetails.ReportName}
                          </Text>
                        </View>
                      </DataTable.Row>
                      <DataTable.Row>
                        <View style={styles.rowView}>
                          <Text>Business Unit :</Text>
                          <Text style={styles.linkText}>
                            {expenseDetails.BusinessUnit}
                          </Text>
                        </View>
                      </DataTable.Row>
                      <DataTable.Row>
                        <View style={styles.rowView}>
                          <Text>Cost Center :</Text>
                          <Text style={styles.linkText}>
                            {expenseDetails.CostCenter}
                          </Text>
                        </View>
                      </DataTable.Row>
                      <DataTable.Row>
                        <View style={styles.rowView}>
                          <Text>Business Purpose :</Text>
                          <Text style={styles.linkText}>
                            {expenseDetails.BusinessPurpose}
                          </Text>
                        </View>
                      </DataTable.Row>
                      <DataTable.Row>
                        <View style={styles.rowView}>
                          <Text>Created On :</Text>
                          <Text style={styles.linkText}>
                            {getDateByFormat(expenseDetails.CreatedDate, 'L')}
                          </Text>
                        </View>
                      </DataTable.Row>
                    </DataTable>
                  </ScrollView>
                </Col>
              </Row>
            </Grid>
          </View>
        </LinearGradient>
      </Card>
    );
  }
}

ReportDetails.propTypes = {
  openActionSheet: PropTypes.func,
  expenseDetails: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  expenseDetails: selectExpenseDetails(),
});

const styles = StyleSheet.create({
  rootCard: {
    flex: 1,
    borderRadius: 20,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#2C3E50',
  },
  cardRight: {
    alignContent: 'center',
    flexDirection: 'row',
    marginRight: 5,
  },
  iconRoundBackground: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 100,
  },
  linkText: {
    color: Colors.LINK,
  },
  propTag: {
    fontWeight: 'bold',
  },
  cardContent: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: '#FFF',
  },
  contentGrid: {
    margin: 5,
    marginTop: 0,
    alignItems: 'center',
  },
  rowView: {
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
});

const withConnect = connect(
  mapStateToProps,
  null,
);

export default compose(withConnect)(ReportDetails);
