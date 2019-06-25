import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import Lo from 'lodash';

// Absolute Imports
import * as colors from 'cnxapp/src/utils/colorsConstants';
import { getFormatedDate } from 'cnxapp/src/utils/DateFormatter';
import { setRootGlobalLoader } from 'cnxapp/src/app/rootActions';
import TimelineView from './TimelineView';
import { selectConexionTimelineData } from '../../../selectors';
const notes = require('cnxapp/src/assets/pastel/notes.png');

class Timeline extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  getTimelineData = () => {
    const { timelineEntries } = this.props;
    const timelineData = [
      {
        time: '',
        title: 'Notes',
        icon: notes,
        circleColor: 'transparent',
      },
    ];
    timelineEntries.map(entry =>
      timelineData.push({
        time: getFormatedDate(entry.CreatedDate),
        title: `${entry.Description}`,
        Entity: entry.Entity,
        EntityLink: entry.EntityLink,
        ConexionTimelineId: entry.ConexionTimelineId,
        userName: 'Selvam K',
      }),
    );
    return timelineData;
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <TimelineView
            style={styles.list}
            data={this.getTimelineData()}
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
            onClickEdit={this.handleNoteEdit}
            onClickDelete={this.handleNoteDelete}
          />
        </View>
      </View>
    );
  }
}

Timeline.propTypes = {
  timelineEntries: PropTypes.array,
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
});

const mapStateToProps = createStructuredSelector({
  timelineEntries: selectConexionTimelineData(),
});

const mapDispatchToProps = dispatch => ({
  dispatchSetGlobalLoaderState: value => dispatch(setRootGlobalLoader(value)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Timeline);
