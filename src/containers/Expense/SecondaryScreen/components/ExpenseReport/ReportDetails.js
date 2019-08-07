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
import { withNavigation, withNavigationFocus } from 'react-navigation';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';

import * as Colors from 'cnxapp/src/utils/colorsConstants';
import { getDateByFormat } from 'cnxapp/src/utils/DateFormatter';
import { editExpenseMapper } from 'cnxapp/src/containers/Expense/mappers';
import { DELETE_EXPENSE_MESSAGE } from 'cnxapp/src/containers/Expense/constants';

import Dialog from 'cnxapp/src/components/Dialog';
import { createStructuredSelector } from 'reselect';

import EditExpense from '../EditExpense';
import {
  setEditExpenseModalVisibility,
  setDeleteExpense,
  setTriggerExpenseDelete,
} from '../../actions';
import {
  selectExpenseDetails,
  selectTriggerExpenseDelete,
} from '../../selectors';

class ReportDetails extends PureComponent {
  state = { dialogVisible: false };

  componentDidUpdate() {
    const {
      dispatchTriggerExpenseDelete,
      triggerExpenseDelete,
      onBack,
    } = this.props;
    if (triggerExpenseDelete) {
      dispatchTriggerExpenseDelete(false);
      onBack();
    }
  }

  deleteExpenseConfirmation = () => this.setState({ dialogVisible: true });

  onDialogDismiss = () => this.setState({ dialogVisible: false });

  onDialogConfirm = () => {
    this.props.dispatchDeleteExpense();
    this.setState({ dialogVisible: false });
  };

  render() {
    const { expenseDetailsData, dispatchEditExpenseModalState } = this.props;
    const { ExpenseDetail, ExpenseUIActions } = expenseDetailsData;
    const mappedValues = editExpenseMapper(ExpenseDetail);

    return (
      <Card elevation={4} style={styles.rootCard}>
        <LinearGradient
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
          colors={['#6a11cb', '#2575fc']}
          style={{
            flex: 1,
            borderRadius: 15,
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
                  onPress={() => dispatchEditExpenseModalState(true)}
                />
                {ExpenseUIActions.EnableSubmit ? (
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
                ) : null}
                {ExpenseUIActions.EnableDelete ? (
                  <IconButton
                    icon={() => (
                      <FontAwesome5 name="trash" color="#FFF" size={16} solid />
                    )}
                    color="#FFF"
                    size={20}
                    onPress={this.deleteExpenseConfirmation}
                  />
                ) : null}
                {ExpenseUIActions.EnableArchive ? (
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
                ) : null}
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
                            {ExpenseDetail.ReportName}
                          </Text>
                        </View>
                      </DataTable.Row>
                      <DataTable.Row>
                        <View style={styles.rowView}>
                          <Text>Business Unit :</Text>
                          <Text style={styles.linkText}>
                            {ExpenseDetail.BusinessUnit.Value}
                          </Text>
                        </View>
                      </DataTable.Row>
                      <DataTable.Row>
                        <View style={styles.rowView}>
                          <Text>Cost Center :</Text>
                          <Text style={styles.linkText}>
                            {ExpenseDetail.CostCenter.Value}
                          </Text>
                        </View>
                      </DataTable.Row>
                      <DataTable.Row>
                        <View style={styles.rowView}>
                          <Text>Business Purpose :</Text>
                          <Text style={styles.linkText}>
                            {ExpenseDetail.BusinessPurpose}
                          </Text>
                        </View>
                      </DataTable.Row>
                      <DataTable.Row>
                        <View style={styles.rowView}>
                          <Text>Created On :</Text>
                          <Text style={styles.linkText}>
                            {getDateByFormat(ExpenseDetail.CreatedDate, 'L')}
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
        <EditExpense initialValues={mappedValues} />
        <Dialog
          visible={this.state.dialogVisible}
          title="Delete!"
          message={DELETE_EXPENSE_MESSAGE}
          onDismiss={this.onDialogDismiss}
          onConfirm={this.onDialogConfirm}
        />
      </Card>
    );
  }
}

ReportDetails.propTypes = {
  openActionSheet: PropTypes.func,
  expenseDetailsData: PropTypes.object,
  dispatchEditExpenseModalState: PropTypes.func.isRequired,
  dispatchDeleteExpense: PropTypes.func.isRequired,
  triggerExpenseDelete: PropTypes.bool,
  navigation: PropTypes.any,
  onBack: PropTypes.func,
  dispatchTriggerExpenseDelete: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  expenseDetailsData: selectExpenseDetails(),
  triggerExpenseDelete: selectTriggerExpenseDelete(),
});

const styles = StyleSheet.create({
  rootCard: {
    flex: 1,
    borderRadius: 15,
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

const mapDispatchToProps = dispatch => ({
  dispatchEditExpenseModalState: visibility =>
    dispatch(setEditExpenseModalVisibility(visibility)),
  dispatchDeleteExpense: () => dispatch(setDeleteExpense()),
  dispatchTriggerExpenseDelete: value =>
    dispatch(setTriggerExpenseDelete(value)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withNavigation,
  withNavigationFocus,
)(ReportDetails);
