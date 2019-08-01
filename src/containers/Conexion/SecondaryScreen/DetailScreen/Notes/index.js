import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import {
  FAB,
  Searchbar,
  Text,
  IconButton,
  TouchableRipple,
  Surface,
  Divider,
  Button,
} from 'react-native-paper';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import Lo from 'lodash';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5Pro';
import { Row, Col } from 'native-base';

// Absolute Imports
import * as colors from 'cnxapp/src/utils/colorsConstants';
import {
  getFormatedDate,
  getDateByFormat,
} from 'cnxapp/src/utils/DateFormatter';
import FullPageModal from 'cnxapp/src/components/FullPageModal';
import { setRootGlobalLoader } from 'cnxapp/src/app/rootActions';
import Dialog from 'cnxapp/src/components/Dialog';
import { DELETE_NOTE_MESSAGE } from 'cnxapp/src/containers/Conexion/constants';
import DateTimePicker from 'cnxapp/src/components/DateTimePicker';

import NotesView from './NotesView';
import RichTextExample from './RichTextEditor';
import {
  selectConexionNoteFilter,
  selectConexionNotesData,
} from '../../../selectors';
import {
  deleteConexionNote,
  getConexionsNotesAction,
  setNoteFilter,
} from '../../../actions';

const notes = require('cnxapp/src/assets/pastel/notes.png');

class Notes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      editNoteObject: {},
      isEditNote: false,
      noteId: null,
      dialogVisible: false,
      notesList: [],
      searchText: '',
      fromDateVisible: false,
      toDateVisible: false,
    };
  }

  handleNoteEdit = noteId => {
    const { conexionNotes } = this.props;
    const filterNote = Lo.filter(conexionNotes, { ConexionNoteId: noteId });
    this.setState({
      editNoteObject: filterNote[0],
      modalOpen: true,
      isEditNote: true,
    });
  };

  handleNoteDelete = id => {
    this.setState({ noteId: id, dialogVisible: true });
  };

  onDialogDismiss = () => this.setState({ dialogVisible: false });

  onDialogConfirm = () => {
    this.props.dispatchDeleteNote(this.state.noteId);
    this.setState({ dialogVisible: false });
  };

  _closeModal = () => {
    this.setState({ modalOpen: false, isEditNote: false, editNoteObject: {} });
  };

  _openModal = () => {
    this.setState({ modalOpen: true, isEditNote: false, editNoteObject: {} });
  };

  searchConexions = value => {
    const { conexionNotes } = this.props;
    const filterData = [];
    conexionNotes
      .filter(
        note =>
          note.Title.toLowerCase()
            .trim()
            .includes(value.toLowerCase().trim()) ||
          note.Note.toLowerCase()
            .trim()
            .includes(value.toLowerCase().trim()),
      )
      .map(note =>
        filterData.push({
          time: getFormatedDate(note.LastUpdatedDate),
          title: `${note.Title}`,
          description: note.Note,
          avatar: note.UpdatedBy.Avatar,
          privateNote: note.PrivateNote,
          noteId: note.ConexionNoteId,
          userName: note.UpdatedBy.Name,
        }),
      );
    this.setState({
      notesList: filterData,
      searchText: value,
    });
  };

  showFromDatePicker = () => this.setState({ fromDateVisible: true });

  showToDatePicker = () => this.setState({ toDateVisible: true });

  handleDatePicked = date => {
    const { fromDateVisible, toDateVisible } = this.state;
    const { dispatchSetConexionNoteFilter, noteFilters } = this.props;
    if (fromDateVisible) {
      dispatchSetConexionNoteFilter({
        ...noteFilters,
        StartDate: getDateByFormat(date, 'L'),
      });
    }
    if (toDateVisible) {
      dispatchSetConexionNoteFilter({
        ...noteFilters,
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
    const { noteFilters } = this.props;
    if (fromDateVisible) return new Date(noteFilters.StartDate);
    if (toDateVisible) return new Date(noteFilters.EndDate);
    return new Date();
  };

  applyDateFilter = () => {
    const { dispatchGetConexionNotes } = this.props;
    this.setState({ notesList: [] });
    dispatchGetConexionNotes();
  };

  getRenderingNoteList = () => {
    const { notesList, searchText } = this.state;
    const { conexionNotes } = this.props;
    const _notes = [
      {
        time: '',
        title: 'Notes',
        icon: notes,
        circleColor: 'transparent',
      },
    ];

    if (!searchText && Lo.isEmpty(notesList)) {
      conexionNotes.map(note =>
        _notes.push({
          time: getFormatedDate(note.LastUpdatedDate),
          title: note.Title,
          avatar: note.UpdatedBy.Avatar,
          description: note.Note,
          privateNote: note.PrivateNote,
          noteId: note.ConexionNoteId,
          userName: note.UpdatedBy.Name,
        }),
      );
      return _notes;
    }
    notesList.map(note => _notes.push(note));
    return _notes;
  };

  renderNotes = () => {
    const { conexionNotes } = this.props;
    if (this.getRenderingNoteList().length === 1 || Lo.isEmpty(conexionNotes))
      return (
        <View style={styles.noDataContainer}>
          <FontAwesome5
            name="info-circle"
            color={colors.GREY}
            size={35}
            light
          />
          <Text style={styles.noDataText}>No Data</Text>
        </View>
      );

    return (
      <NotesView
        style={styles.list}
        data={this.getRenderingNoteList()}
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
    );
  };

  render() {
    const {
      modalOpen,
      editNoteObject,
      isEditNote,
      dialogVisible,
      searchText,
    } = this.state;

    const { noteFilters } = this.props;

    return (
      <View style={{ flex: 1, backgroundColor: colors.BGCOLOR }}>
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
                  <Text>From: </Text>
                  <Text style={styles.dateText}>
                    {` ${getDateByFormat(noteFilters.StartDate, 'L')}`}
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
                  <Text>To: </Text>
                  <Text style={styles.dateText}>{` ${getDateByFormat(
                    noteFilters.EndDate,
                    'L',
                  )}`}</Text>
                </View>
              </TouchableRipple>
            </Col>
            <Col style={styles.filterView}>
              <Button
                icon={() => (
                  <FontAwesome5 color="#fff" name="filter" size={15} />
                )}
                mode="contained"
                color={colors.PURPLE}
                onPress={this.applyDateFilter}
                uppercase
                solid
              >
                Filter
              </Button>
            </Col>
          </Row>
          <Divider />
          <Row style={{ height: 'auto' }}>
            <Col>
              <Searchbar
                placeholder="Search notes"
                onChangeText={query => this.searchConexions(query)}
                value={searchText}
                style={styles.searchbar}
              />
            </Col>
          </Row>
        </Surface>
        <View style={styles.container}>
          {this.renderNotes()}
          <Dialog
            visible={dialogVisible}
            title="Delete!"
            message={DELETE_NOTE_MESSAGE}
            onDismiss={this.onDialogDismiss}
            onConfirm={this.onDialogConfirm}
          />
          <DateTimePicker
            value={this.getSelectedDate()}
            mode="date"
            visible={this.state.fromDateVisible || this.state.toDateVisible}
            onDateSelect={this.handleDatePicked}
            onCancel={this.hideDateTimePicker}
          />
        </View>
        <FAB
          style={styles.fab}
          icon="add"
          color="white"
          onPress={this._openModal}
        />
        <FullPageModal
          visible={modalOpen}
          handleModalVisible={this._closeModal}
          modalHeaderText="Create new note"
        >
          <RichTextExample
            note={editNoteObject}
            isEditNote={isEditNote}
            closeModal={this._closeModal}
          />
        </FullPageModal>
      </View>
    );
  }
}

Notes.propTypes = {
  conexionNotes: PropTypes.array,
  dispatchDeleteNote: PropTypes.func.isRequired,
  noteFilters: PropTypes.object.isRequired,
  dispatchGetConexionNotes: PropTypes.func,
  dispatchSetConexionNoteFilter: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    backgroundColor: 'white',
  },
  list: {
    flex: 1,
    paddingTop: 25,
    backgroundColor: colors.BGCOLOR,
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
  noteFilters: selectConexionNoteFilter(),
  conexionNotes: selectConexionNotesData(),
});

const mapDispatchToProps = dispatch => ({
  dispatchSetGlobalLoaderState: value => dispatch(setRootGlobalLoader(value)),
  dispatchDeleteNote: id => dispatch(deleteConexionNote(id)),
  dispatchGetConexionNotes: () => dispatch(getConexionsNotesAction()),
  dispatchSetConexionNoteFilter: noteFilter =>
    dispatch(setNoteFilter(noteFilter)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Notes);
