import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { FAB } from 'react-native-paper';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import Lo from 'lodash';

// Absolute Imports
import * as colors from 'cnxapp/src/utils/colorsConstants';
import { getFormatedDate } from 'cnxapp/src/utils/DateFormatter';
import FullPageModal from 'cnxapp/src/components/FullPageModal';
import { setRootGlobalLoader } from 'cnxapp/src/app/rootActions';
import Dialog from 'cnxapp/src/components/Dialog';
import { DELETE_NOTE_MESSAGE } from 'cnxapp/src/containers/Conexion/constants';

import Timeline from './Timeline';
import RichTextExample from './RichTextEditor';
import { selectConexionNotesData } from '../../../selectors';
import { deleteConexionNote } from '../../../actions';

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
    };
  }

  componentDidMount() {}

  getNotsData = () => {
    const { conexionNotes } = this.props;
    const notesData = [
      {
        time: '',
        title: 'Notes',
        icon: notes,
        circleColor: 'transparent',
      },
    ];

    conexionNotes.map(note =>
      notesData.push({
        time: getFormatedDate(note.LastUpdatedDate),
        title: `${note.Title}`,
        icon: note.UpdatedBy.Avatar,
        description: note.Note,
        privateNote: note.PrivateNote,
        noteId: note.ConexionNoteId,
        userName: 'Selvam K',
      }),
    );
    return notesData;
  };

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

  render() {
    const { modalOpen, editNoteObject, isEditNote, dialogVisible } = this.state;

    return (
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <Timeline
            style={styles.list}
            data={this.getNotsData()}
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
          <Dialog
            visible={dialogVisible}
            title="Delete!"
            message={DELETE_NOTE_MESSAGE}
            onDismiss={this.onDialogDismiss}
            onConfirm={this.onDialogConfirm}
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
          modalHeaderText="New note"
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
  conexionNotes: selectConexionNotesData(),
});

const mapDispatchToProps = dispatch => ({
  dispatchSetGlobalLoaderState: value => dispatch(setRootGlobalLoader(value)),
  dispatchDeleteNote: id => dispatch(deleteConexionNote(id)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Notes);
