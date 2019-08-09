import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { CNXH1 } from 'cnxapp/src/components/Typography';
import PropTypes from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  statusColorMapper,
  gradientColorMapper,
} from 'cnxapp/src/containers/Expense/mappers';
import {
  getExpenseList,
  setExpenseSearchQuery,
  setExpenseStatusQuery,
  saveExpenseList,
} from '../../actions';
import {
  selectCurrentExpenseStatus,
  selectExpenseFilterQuery,
} from '../../selectors';

class AnalyticsCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedColor: '#fff',
      linearColor: ['#fff'],
      defaultColor: ['#ffffff00', '#ffffff00'],
    };
    this.cardClicked = this.cardClicked.bind(this);
  }

  componentDidMount() {
    const { fetchExpenseList, status } = this.props;
    this.setState({
      selectedColor: statusColorMapper(status),
      linearColor: gradientColorMapper(status),
    });
    fetchExpenseList();
  }

  cardClicked = () => {
    const {
      status,
      dispatchSetExpenseStatus,
      fetchExpenseList,
      value,
      setExpenseList,
      dispatchSetExpenseSearchQuery,
      expenseQuery,
    } = this.props;
    dispatchSetExpenseSearchQuery({
      searchString: '',
      searchResult: [],
    });
    dispatchSetExpenseStatus({
      ...expenseQuery,
      Status: status,
      PageNumber: 1,
    });
    if (value === 0) {
      setExpenseList([]);
      return;
    }
    fetchExpenseList();
  };

  isSelected = () => {
    const { currentStatus, status } = this.props;
    return currentStatus === status;
  };

  render() {
    const { selectedColor, linearColor, defaultColor } = this.state;
    return (
      <Card
        elevation={3}
        onPress={this.cardClicked}
        style={{
          borderTopColor: selectedColor,
          borderTopWidth: this.isSelected() ? 0 : 3,
          borderRadius: 10,
          marginRight: 15,
          alignItems: 'center',
          flexDirection: 'row',
          height: 100,
        }}
      >
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          colors={this.isSelected() ? linearColor : defaultColor}
          style={{
            flex: 1,
            borderRadius: 10,
            paddingLeft: 15,
            paddingRight: 15,
          }}
        >
          <View style={styles.cardContentContainer}>
            <Text
              style={{
                color: this.isSelected() ? '#fff' : selectedColor,
                fontSize: 52,
                fontWeight: 'bold',
              }}
            >
              {this.props.value}
            </Text>
            <View style={{ paddingLeft: 15 }}>
              <CNXH1
                style={{ color: this.isSelected() ? '#fff' : selectedColor }}
              >
                {this.props.title}
              </CNXH1>
              {this.props.subTitle ? (
                <Text
                  style={{
                    fontStyle: 'italic',
                    color: this.isSelected() ? '#fff' : '#909497',
                  }}
                >
                  {this.props.subTitle}
                </Text>
              ) : null}
            </View>
          </View>
        </LinearGradient>
      </Card>
    );
  }
}
AnalyticsCard.propTypes = {
  status: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string,
  value: PropTypes.number.isRequired,
  dispatchSetExpenseStatus: PropTypes.func.isRequired,
  fetchExpenseList: PropTypes.func.isRequired,
  currentStatus: PropTypes.string.isRequired,
  setExpenseList: PropTypes.func,
  dispatchSetExpenseSearchQuery: PropTypes.func.isRequired,
  expenseQuery: PropTypes.object.isRequired,
};
const styles = StyleSheet.create({
  cardContentContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flex: 1,
    flexGrow: 1,
    margin: 5,
    backgroundColor: 'transparent',
  },
});
const mapStateToProps = createStructuredSelector({
  currentStatus: selectCurrentExpenseStatus(),
  expenseQuery: selectExpenseFilterQuery(),
});
const mapDispatchToProps = dispatch => ({
  dispatchSetExpenseStatus: status => dispatch(setExpenseStatusQuery(status)),
  fetchExpenseList: () => dispatch(getExpenseList()),
  setExpenseList: value => dispatch(saveExpenseList(value)),
  dispatchSetExpenseSearchQuery: query =>
    dispatch(setExpenseSearchQuery(query)),
});
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(AnalyticsCard);
