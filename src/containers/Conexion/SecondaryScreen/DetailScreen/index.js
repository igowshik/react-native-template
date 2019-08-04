import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Package imports
import { View, Dimensions } from 'react-native';
import { Title } from 'react-native-paper';
import { TabView, TabBar } from 'react-native-tab-view';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { withNavigation } from 'react-navigation';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5Pro';
import LinearGradient from 'react-native-linear-gradient';

// Absolute imports
import { setRootGlobalLoader } from 'cnxapp/src/app/rootActions';
import Snackbar from 'cnxapp/src/components/Snackbar';
import { getDateByFormat, getDateBefore } from 'cnxapp/src/utils/DateFormatter';
import * as colors from 'cnxapp/src/utils/colorsConstants';
import { LINEAR_START, LINEAR_END } from 'cnxapp/src/utils/valueconstants';

import {
  INDIVIDUAL,
  ORGANIZATION,
  PROFILE,
  NOTES,
  TIMELINE,
} from '../../constants';
import {
  selectToken,
  selectIndConexion,
  selectOrgConexion,
  selectGlobalLoader,
  selectToastVisibility,
  selectToastData,
} from '../../selectors';

import {
  getConexionsNotesAction,
  getConexionDetails,
  setNoteFilter,
  getConexionTimelineAction,
  setTimelineFilter,
} from '../../actions';
import ProfileView from './ProfileView';
import Notes from './Notes';
import Timeline from './Timeline';

class DetailScreen extends Component {
  state = {
    selected: INDIVIDUAL,
    /* eslint-disable */
      index: 0,
      routes: [
        {
          key: PROFILE,
          title: PROFILE,
        },
        {
          key: NOTES,
          title: NOTES,
        },
        {
          key: TIMELINE,
          title: TIMELINE,
        },
      ],
      /* eslint-enable */
  };

  componentDidMount() {
    const {
      navigation,
      dispatchGetConexionDetails,
      dispatchGetConexionNotes,
      dispatchSetConexionNoteFilter,
      dispatchGetConexionTimeline,
      dispatchSetConexionTimelineFilter,
    } = this.props;
    const selectedValue = navigation.getParam('selectedValue', 'NO-SELECT');
    this.setState({
      selected: selectedValue ? INDIVIDUAL : ORGANIZATION,
    });
    dispatchGetConexionDetails();
    dispatchSetConexionTimelineFilter({
      ConexionId: '',
      StartDate: getDateByFormat(getDateBefore(30), 'L'),
      EndDate: getDateByFormat(new Date(new Date().setHours(24, 0, 0, 0)), 'L'),
    });
    dispatchGetConexionTimeline();
    dispatchSetConexionNoteFilter({
      ConexionId: '',
      StartDate: getDateByFormat(getDateBefore(30), 'L'),
      EndDate: getDateByFormat(new Date(new Date().setHours(24, 0, 0, 0)), 'L'),
    });
    dispatchGetConexionNotes();
  }

  handleRenderIcon = ({ route, focused, color }) => {
    switch (route.key) {
      case PROFILE:
        return (
          <FontAwesome5
            name="id-card"
            style={{ marginRight: 5 }}
            solid={focused}
            color={color}
            size={20}
          />
        );
      case NOTES:
        return (
          <FontAwesome5
            name="sticky-note"
            style={{ marginRight: 5 }}
            solid={focused}
            color={color}
            size={20}
          />
        );
      case TIMELINE:
        return (
          <FontAwesome5
            name="history"
            style={{ marginRight: 5 }}
            solid={focused}
            color={color}
            size={20}
          />
        );
      default:
        return null;
    }
  };

  handleRenderText = ({ route }) => (
    <Title style={{ color: '#FFFFFF' }}>{route.title}</Title>
  );

  handleRenderScene = ({ route }) => {
    const { selected } = this.state;
    switch (route.key) {
      case PROFILE:
        return <ProfileView selectedValue={selected} />;
      case NOTES:
        return <Notes />;
      case TIMELINE:
        return <Timeline />;
      default:
        return null;
    }
  };

  handleTabChange = ({ route }) => {
    const {
      dispatchGetConexionNotes,
      dispatchSetConexionNoteFilter,
      dispatchGetConexionTimeline,
      dispatchSetConexionTimelineFilter,
    } = this.props;
    switch (route.key) {
      case NOTES: {
        dispatchSetConexionNoteFilter({
          ConexionId: '',
          StartDate: getDateByFormat(getDateBefore(30), 'L'),
          EndDate: getDateByFormat(
            new Date(new Date().setHours(24, 0, 0, 0)),
            'L',
          ),
        });
        dispatchGetConexionNotes();
        break;
      }
      case TIMELINE: {
        dispatchSetConexionTimelineFilter({
          ConexionId: '',
          StartDate: getDateByFormat(getDateBefore(30), 'L'),
          EndDate: getDateByFormat(
            new Date(new Date().setHours(24, 0, 0, 0)),
            'L',
          ),
        });
        dispatchGetConexionTimeline();
        break;
      }
      default:
        return null;
    }
    return null;
  };

  render() {
    const { toastVisible, toast } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <TabView
          navigationState={this.state}
          renderScene={this.handleRenderScene}
          onIndexChange={index => this.setState({ index })} //eslint-disable-line
          initialLayout={{ width: Dimensions.get('window').width }}
          renderTabBar={props => (
            <LinearGradient
              start={LINEAR_START}
              end={LINEAR_END}
              colors={colors.DEAFULT_HEADER}
            >
              <TabBar
                {...props}
                indicatorStyle={{ backgroundColor: 'white', height: 2 }}
                tabStyle={{
                  flexDirection: 'row',
                }}
                renderIcon={this.handleRenderIcon}
                renderLabel={this.handleRenderText}
                style={{ backgroundColor: 'transparent' }}
                bounces
              />
            </LinearGradient>
          )}
        />
        <Snackbar toastVisible={toastVisible} toast={toast} />
      </View>
    );
  }
}

DetailScreen.propTypes = {
  navigation: PropTypes.object,
  dispatchSetGlobalLoaderState: PropTypes.func.isRequired,
  dispatchGetConexionNotes: PropTypes.func,
  dispatchGetConexionDetails: PropTypes.func.isRequired,
  loaderState: PropTypes.bool.isRequired,
  toastVisible: PropTypes.bool.isRequired,
  toast: PropTypes.object.isRequired,
  dispatchSetConexionNoteFilter: PropTypes.func.isRequired,
  dispatchGetConexionTimeline: PropTypes.func.isRequired,
  dispatchSetConexionTimelineFilter: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  accessToken: selectToken(),
  loaderState: selectGlobalLoader(),
  indConexions: selectIndConexion(),
  orgConexions: selectOrgConexion(),
  toastVisible: selectToastVisibility(),
  toast: selectToastData(),
});

const mapDispatchToProps = dispatch => ({
  dispatchSetGlobalLoaderState: value => dispatch(setRootGlobalLoader(value)),
  dispatchGetConexionNotes: () => dispatch(getConexionsNotesAction()),
  dispatchGetConexionDetails: () => dispatch(getConexionDetails()),
  dispatchSetConexionNoteFilter: noteFilter =>
    dispatch(setNoteFilter(noteFilter)),
  dispatchGetConexionTimeline: () => dispatch(getConexionTimelineAction()),
  dispatchSetConexionTimelineFilter: timelineFilter =>
    dispatch(setTimelineFilter(timelineFilter)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withNavigation,
  withConnect,
)(DetailScreen);
