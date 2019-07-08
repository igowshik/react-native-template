import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Row, Col } from 'native-base';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5Pro';

import {
  Searchbar,
  Text,
  IconButton,
  TouchableRipple,
  Title,
  Surface,
  Divider,
} from 'react-native-paper';
import {
  getDateByFormat,
  getFormatedDate,
} from 'cnxapp/src/utils/DateFormatter';
import Lo from 'lodash';

// Absolute Imports
import * as colors from 'cnxapp/src/utils/colorsConstants';

import { setRootGlobalLoader } from 'cnxapp/src/app/rootActions';
import DateTimePicker from 'cnxapp/src/components/DateTimePicker';
import { getConexionTimelineAction, setTimelineFilter } from '../../../actions';
import {
  selectConexionTimelineFilter,
  selectConexionTimelineData,
} from '../../../selectors';
import TimelineView from './TimelineView';
const timeline = require('cnxapp/src/assets/pastel/timeline.jpg');

class Timeline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timelineList: [],
      searchText: '',
      fromDateVisible: false,
      toDateVisible: false,
    };
  }

  componentDidMount() {}

  searchTimeline = value => {
    const { conexionTimeline } = this.props;
    const filterData = [];
    conexionTimeline
      .filter(entry =>
        entry.Description.toLowerCase()
          .trim()
          .includes(value.toLowerCase().trim()),
      )
      .map(entry =>
        filterData.push({
          time: getFormatedDate(entry.CreatedDate),
          title: entry.Description,
          entity: entry.Entity,
          entityLink: entry.EntityLink,
          conexionTimelineId: entry.ConexionTimelineId,
          userName: entry.CreatedBy.Name,
          avatar: entry.CreatedBy.Avatar,
        }),
      );
    this.setState({
      timelineList: filterData,
      searchText: value,
    });
  };

  showFromDatePicker = () => this.setState({ fromDateVisible: true });

  showToDatePicker = () => this.setState({ toDateVisible: true });

  handleDatePicked = date => {
    const { fromDateVisible, toDateVisible } = this.state;
    const { dispatchSetConexionTimelineFilter, timelineFilters } = this.props;
    if (fromDateVisible) {
      dispatchSetConexionTimelineFilter({
        ...timelineFilters,
        StartDate: getDateByFormat(date, 'L'),
      });
    }
    if (toDateVisible) {
      dispatchSetConexionTimelineFilter({
        ...timelineFilters,
        EndDate: getDateByFormat(date, 'L'),
      });
    }
    this.hideDateTimePicker();
  };

  hideDateTimePicker = () => {
    const { fromDateVisible, toDateVisible } = this.state;
    if (fromDateVisible) this.setState({ fromDateVisible: false });
    if (toDateVisible) this.setState({ toDateVisible: false });
  };

  getSelectedDate = () => {
    const { fromDateVisible, toDateVisible } = this.state;
    const { timelineFilters } = this.props;
    if (fromDateVisible) return new Date(timelineFilters.StartDate);
    if (toDateVisible) return new Date(timelineFilters.EndDate);
    return new Date();
  };

  applyDateFilter = () => {
    const { dispatchGetConexionTimeline } = this.props;
    this.setState({ timelineList: [] });
    dispatchGetConexionTimeline();
  };

  getRenderingTimeline = () => {
    const { timelineList } = this.state;
    const { conexionTimeline } = this.props;
    const _timeline = [
      {
        time: '',
        title: 'Timeline',
        icon: timeline,
        circleColor: 'transparent',
      },
    ];
    if (Lo.isEmpty(timelineList)) {
      conexionTimeline.map(entry =>
        _timeline.push({
          time: getFormatedDate(entry.CreatedDate),
          title: entry.Description,
          entity: entry.Entity,
          entityLink: entry.EntityLink,
          conexionTimelineId: entry.ConexionTimelineId,
          userName: entry.CreatedBy.Name,
          avatar: entry.CreatedBy.Avatar,
        }),
      );
      return _timeline;
    }
    timelineList.map(t => _timeline.push(t));
    return _timeline;
  };

  render() {
    const { searchText } = this.state;
    const { timelineFilters, conexionTimeline } = this.props;

    return (
      <View style={{ flex: 1 }}>
        <Surface style={{ elevation: 4 }}>
          <Row style={{ height: 'auto' }}>
            <Col>
              <TouchableRipple onPress={this.showFromDatePicker}>
                <View style={styles.dateView}>
                  <IconButton
                    icon={() => (
                      <FontAwesome5
                        name="calendar-plus"
                        color={colors.SECONDARY}
                        size={20}
                        light
                      />
                    )}
                    color={colors.SECONDARY}
                    mode="outlined"
                    onPress={this.showFromDatePicker}
                  />
                  <Title>From: </Title>
                  <Text style={styles.dateText}>
                    {` ${getDateByFormat(timelineFilters.StartDate, 'L')}`}
                  </Text>
                </View>
              </TouchableRipple>
            </Col>
            <Col>
              <TouchableRipple onPress={this.showToDatePicker}>
                <View style={styles.dateView}>
                  <IconButton
                    icon={() => (
                      <FontAwesome5
                        name="calendar-plus"
                        color={colors.SECONDARY}
                        size={20}
                        light
                      />
                    )}
                    color={colors.SECONDARY}
                    mode="outlined"
                    onPress={this.showToDatePicker}
                  />
                  <Title>To: </Title>
                  <Text style={styles.dateText}>{` ${getDateByFormat(
                    timelineFilters.EndDate,
                    'L',
                  )}`}</Text>
                </View>
              </TouchableRipple>
            </Col>
            <Col style={styles.filterView}>
              <IconButton
                icon={() => (
                  <FontAwesome5
                    color={colors.PURPLE}
                    name="filter"
                    size={20}
                    solid
                  />
                )}
                mode="outlined"
                color={colors.PURPLE}
                onPress={this.applyDateFilter}
              />
            </Col>
          </Row>
          <Divider />
          <Row style={{ height: 'auto' }}>
            <Col>
              <Searchbar
                placeholder="Search timeline"
                onChangeText={query => this.searchTimeline(query)}
                value={searchText}
                style={styles.searchbar}
              />
            </Col>
          </Row>
        </Surface>
        <View style={styles.container}>
          {Lo.isEmpty(conexionTimeline) ? (
            <View style={styles.noDataContainer}>
              <FontAwesome5
                name="exclamation-triangle"
                color={colors.GREY}
                size={35}
                light
              />
              <Text style={styles.noDataText}>No Data</Text>
            </View>
          ) : (
            <TimelineView
              style={styles.list}
              data={this.getRenderingTimeline()}
              circleSize={20}
              circleColor={colors.ORANGE}
              lineColor="rgba(0,0,0,0.6)"
              timeContainerStyle={{ minWidth: 170, marginTop: -5 }}
              timeStyle={{
                textAlign: 'center',
                color: colors.PURPLE,
                padding: 5,
                borderRadius: 13,
              }}
              descriptionStyle={{ color: 'black' }} // color was set 'gray'
              options={{
                style: { paddingTop: 5 },
              }}
              innerCircle="icon"
            />
          )}
          <DateTimePicker
            value={this.getSelectedDate()}
            mode="date"
            visible={this.state.fromDateVisible || this.state.toDateVisible}
            onDateSelect={this.handleDatePicked}
            onCancel={this.hideDateTimePicker}
          />
        </View>
      </View>
    );
  }
}

Timeline.propTypes = {
  conexionTimeline: PropTypes.array,
  timelineFilters: PropTypes.object.isRequired,
  dispatchGetConexionTimeline: PropTypes.func,
  dispatchSetConexionTimelineFilter: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    paddingTop: 0,
    backgroundColor: 'white',
  },
  list: {
    flex: 1,
    paddingTop: 25,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: colors.PRIMARY,
  },
  searchbar: {
    marginBottom: 2,
  },
  dateView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // marginLeft: 10,
  },
  dateText: {
    color: colors.PRIMARY,
    margin: 3,
  },
  noDataText: { fontSize: 20, color: colors.GREY },
  noDataContainer: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

const mapStateToProps = createStructuredSelector({
  timelineFilters: selectConexionTimelineFilter(),
  conexionTimeline: selectConexionTimelineData(),
});

const mapDispatchToProps = dispatch => ({
  dispatchSetGlobalLoaderState: value => dispatch(setRootGlobalLoader(value)),
  dispatchGetConexionTimeline: () => dispatch(getConexionTimelineAction()),
  dispatchSetConexionTimelineFilter: timelineFilter =>
    dispatch(setTimelineFilter(timelineFilter)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Timeline);
