import React, { PureComponent } from 'react';
import { View, Image, StyleSheet, ImageBackground } from 'react-native';
import { Card, Text, Headline, Subheading } from 'react-native-paper';
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
const { ExpenseColors } = Colors;

const profileBG = require('cnxapp/src/assets/images/cardbg3.png');

class ExpenseCard extends PureComponent {
  statusColor = status => {
    const _status = status.toUpperCase();
    if (_status.includes('ALL')) return ExpenseColors.ALL;
    if (_status.includes('NEW')) return ExpenseColors.SAVED;
    if (_status.includes('SUBMITED')) return ExpenseColors.SUBMITED;
    if (_status.includes('APPROVED')) return ExpenseColors.APPROVED;
    if (_status.includes('REJECTED')) return ExpenseColors.REJECTED;
    return ExpenseColors.ALL;
  };

  render() {
    const { expenseDetailsData } = this.props;
    const { ExpenseDetail } = expenseDetailsData;

    return (
      <Card elevation={5} style={styles.cardRoot}>
        <LinearGradient
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
          // colors={['#4E9753', '#67AA70', '#4E9753']}
          colors={['#FFF', '#FFF']}
          style={styles.linearGradient}
        >
          <ImageBackground source={profileBG} style={styles.imageBG}>
            <Grid style={styles.grid}>
              <Row size={30} style={{ alignItems: 'center' }}>
                <Col style={styles.status}>
                  <FontAwesome5
                    name="circle"
                    color={this.statusColor(ExpenseDetail.CurrentStatus)}
                    size={13}
                    solid
                    style={{ paddingRight: 5 }}
                  />
                  <Text style={{ color: '#34495E' }}>
                    {ExpenseDetail.CurrentStatus}
                  </Text>
                </Col>
                <Col style={styles.amountCol}>
                  <View style={styles.amountView}>
                    <FontAwesome5
                      name="dollar-sign"
                      color="#34495E" // "#34495E"
                      size={25}
                      light
                    />
                    <Text style={styles.amountText}>
                      {ExpenseDetail.TotalAmount}
                    </Text>
                  </View>
                  <Text style={styles.total}>Total amount</Text>
                </Col>
              </Row>
              <Row size={50}>
                <Col style={styles.numberCol}>
                  <Image
                    style={{ width: 56, height: 56 }}
                    source={{
                      uri:
                        'https://img.icons8.com/officel/2x/sim-card-chip.png',
                    }}
                  />
                  <View style={styles.numberColView}>
                    <Headline style={styles.cardNumber}>XXXX</Headline>
                    <Headline style={styles.cardNumber}>XXXX</Headline>
                    <Headline style={styles.cardNumber}>
                      {`${
                        ExpenseDetail.ExpenseKey
                          ? ExpenseDetail.ExpenseKey.split('-')[0]
                          : 'XXX'
                      }`}
                    </Headline>
                    <View style={{ flexDirection: 'row' }}>
                      <Headline style={styles.cardNumber}>
                        {ExpenseDetail.ExpenseKey
                          ? ExpenseDetail.ExpenseKey.split('-')[1]
                          : 'XXXX'}
                      </Headline>
                      <Text style={{ fontSize: 10 }}>Report Id</Text>
                    </View>
                  </View>
                </Col>
              </Row>
              <Row size={50} style={styles.detailsRow}>
                <Col>
                  <Text style={{ fontSize: 10 }}>Created by</Text>
                  <Subheading style={{ color: '#fff' }}>
                    {ExpenseDetail.CreatedBy
                      ? ExpenseDetail.CreatedBy.Name
                      : ''}
                  </Subheading>
                </Col>
                <Col style={styles.createdDate}>
                  <Text style={{ fontSize: 10 }}>Report date</Text>
                  <Subheading style={{ color: '#fff' }}>
                    {getDateByFormat(ExpenseDetail.ReportDate, 'L')}
                  </Subheading>
                </Col>
              </Row>
            </Grid>
          </ImageBackground>
        </LinearGradient>
      </Card>
    );
  }
}

ExpenseCard.propTypes = {
  expenseDetailsData: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  cardRoot: {
    flex: 1,
    borderRadius: 20,
    marginRight: 15,
    alignItems: 'center',
    flexDirection: 'row',
  },
  linearGradient: {
    flex: 1,
    borderRadius: 20,
  },
  imageBG: {
    width: '100%',
    height: '100%',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'center',
  },
  status: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  grid: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  amountCol: {
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'flex-end',
  },
  amountView: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  amountText: {
    color: '#34495E', // '#34495E',
    fontSize: 25,
    fontWeight: 'bold',
    paddingLeft: 5,
  },
  total: {
    marginTop: 5,
    color: '#34495E',
    fontSize: 10,
    fontWeight: 'bold',
  },
  numberCol: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignContent: 'center',
  },
  numberColView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginLeft: 10,
  },
  createdDate: {
    alignContent: 'center',
    alignItems: 'flex-end',
  },
  detailsRow: { alignItems: 'center', marginTop: 10 },
  cardNumber: { color: '#34495E', fontWeight: 'bold' },
});
const mapStateToProps = createStructuredSelector({
  expenseDetailsData: selectExpenseDetails(),
});

const withConnect = connect(
  mapStateToProps,
  null,
);

export default compose(withConnect)(ExpenseCard);
