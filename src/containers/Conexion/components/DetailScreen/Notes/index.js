import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { FAB } from 'react-native-paper';
import FullPageModal from 'cnxapp/src/components/FullPageModal';
import moment from 'moment';
import Lo from 'lodash';
import * as colors from 'cnxapp/src/utils/colorsConstants';
import Timeline from './Timeline';
import RichTextExample from './RichTextEditor';

const notes = require('cnxapp/src/assets/pastel/notes.png');

export default class Notes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      modalOpen: false,
      editNoteObject: {},
    };
  }

  componentDidMount() {
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
        time: moment(note.LastUpdatedDate).format('DD-MM-YY HH:MM'),
        title: `${note.Title}`,
        description: note.Note,
        privateNote: note.PrivateNote,
        noteId: note.ConexionNoteId,
      }),
    );
    this.setState({ data: notesData });
  }

  handleNoteEdit = noteId => {
    const { conexionNotes } = this.props;
    const filterNote = Lo.filter(conexionNotes, { ConexionNoteId: noteId });
    this.setState({ editNoteObject: filterNote[0], modalOpen: true });
  };

  _closeModal = () => {
    this.setState({ modalOpen: false });
  };

  _openModal = () => {
    this.setState({ modalOpen: true });
  };

  render() {
    const { modalOpen, editNoteObject } = this.state;

    return (
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <Timeline
            style={styles.list}
            data={this.state.data}
            circleSize={20}
            circleColor={colors.ORANGE}
            lineColor="rgba(0,0,0,0.6)"
            timeContainerStyle={{ minWidth: 150, marginTop: -5 }}
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
          <RichTextExample note={editNoteObject} />
        </FullPageModal>
      </View>
    );
  }
}

Notes.propTypes = {
  conexionNotes: PropTypes.array,
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
