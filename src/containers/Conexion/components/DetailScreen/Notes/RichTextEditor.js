import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  TouchableRipple,
  Avatar,
  Card,
  Checkbox,
  Button,
  TextInput,
  HelperText,
  Title,
} from 'react-native-paper';
import { Text } from 'native-base';
import PropTypes from 'prop-types';
import Lo from 'lodash';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5Pro';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import WebViewQuillEditor from 'cnxapp/src/components/QuillEditor/WebViewQuillEditor';
import * as colors from 'cnxapp/src/utils/colorsConstants';
import {
  setNoteData,
  createConexionNote,
  editConexionNote,
} from '../../../actions';

class RichTextEditor extends React.Component {
  constructor() {
    super();
    this.state = {
      editorMessageDelta: '',
      privateNote: true,
      titleText: null,
      noteRequied: false,
    };
    this.webQuillRef = React.createRef();
  }

  handleNoteCreationandEdit = () => {
    const {
      dispatchSaveNoteData,
      closeModal,
      dispatchCreateNote,
      isEditNote,
      note,
      dispatchEditNote,
    } = this.props;
    const { titleText, privateNote } = this.state;
    const quillData = this.webQuillRef.current.getDelta();
    const noteData = {
      ConexionId: '',
      Note: quillData.replace(/^"(.*)"$/, '$1'),
      PrivateNote: privateNote,
      Title: titleText,
    };
    if (quillData && !isEditNote) {
      this.setState({ noteRequied: false });
      dispatchSaveNoteData(noteData);
      dispatchCreateNote();
      closeModal(false);
    } else if (quillData && isEditNote) {
      this.setState({ noteRequied: false });
      noteData.ConexionNoteId = note.ConexionNoteId;
      dispatchSaveNoteData(noteData);
      dispatchEditNote();
      closeModal(false);
    } else {
      this.setState({ noteRequied: true });
    }
  };

  componentDidMount() {
    const { note, isEditNote } = this.props;
    if (isEditNote && !Lo.isEmpty(note)) {
      this.setState({
        editorMessageDelta: note.Note,
        titleText: note.Title,
        privateNote: note.PrivateNote,
      });
    }
  }

  render() {
    const { privateNote, titleText } = this.state;
    const { isEditNote } = this.props;
    return (
      <View
        style={{
          ...StyleSheet.absoluteFillObject,
        }}
      >
        <View style={{ padding: 10 }}>
          <Card elevation={2} style={styles.card}>
            <View style={styles.headerView}>
              <Avatar.Icon
                style={styles.avatar}
                size={40}
                icon="description"
                color={colors.WHITE}
              />
              <Title style={{ paddingLeft: 10 }}>NOTE DETAILS</Title>
            </View>
            <Card.Content>
              <View style={styles.form}>
                <View style={{ width: '60%', flexDirection: 'column' }}>
                  <TextInput
                    style={{ width: '100%' }}
                    label="Title"
                    value={titleText}
                    onChangeText={text => this.setState({ titleText: text })}
                    error={titleText === ''}
                  />
                  <HelperText type="error" visible={titleText === ''}>
                    Title is required
                  </HelperText>
                </View>
                <TouchableRipple
                  onPress={() => {
                    this.setState({ privateNote: !privateNote });
                  }}
                >
                  <View style={styles.row}>
                    <Text style={{ paddingTop: 15 }}>Private Note</Text>
                    <View pointerEvents="none" style={{ paddingTop: 15 }}>
                      <Checkbox
                        color={colors.SECONDARY}
                        status={privateNote ? 'checked' : 'unchecked'}
                      />
                    </View>
                  </View>
                </TouchableRipple>
                <View style={{ paddingLeft: 20, paddingTop: 10 }}>
                  <Button
                    raised
                    color={colors.PURPLE}
                    icon={() => (
                      <FontAwesome5
                        name="sticky-note"
                        color="#FFF"
                        size={18}
                        light
                      />
                    )}
                    mode="contained"
                    onPress={this.handleNoteCreationandEdit}
                    disabled={titleText === ''}
                  >
                    {!isEditNote ? 'Add Note' : 'Update Note'}
                  </Button>
                </View>
              </View>
            </Card.Content>
          </Card>
        </View>
        <View style={styles.webView}>
          <HelperText
            type="error"
            style={{ fontSize: 24 }}
            visible={this.state.noteRequied}
          >
            Notes field is required
          </HelperText>
          <WebViewQuillEditor
            contentToDisplay={this.state.editorMessageDelta}
            ref={this.webQuillRef}
          />
        </View>
      </View>
    );
  }
}

RichTextEditor.propTypes = {
  note: PropTypes.object,
  isEditNote: PropTypes.bool.isRequired,
  dispatchSaveNoteData: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  dispatchCreateNote: PropTypes.func.isRequired,
  dispatchEditNote: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: colors.PURPLE,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'flex-end',
    justifyContent: 'space-around',
    paddingLeft: 20,
  },
  card: {
    borderTopColor: colors.YELLOW,
    borderTopWidth: 4,
  },
  headerView: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: { backgroundColor: colors.PURPLE },
  form: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  webView: { flex: 1 },
  label: {
    color: colors.PRIMARY,
    fontFamily: 'Montserrat',
  },
});

/**
 * @method: mapStateToProps()
 * @description: Redux Map method to map all redux state into each individual state value
 * @returns: jobState ans filterState in the State
 */
const mapStateToProps = createStructuredSelector({});

/**
 * @method: mapDispatchToProps()
 * @description: Map the Props of this class to the respective Redux dispatch functions
 * @returns: Mapped functions
 */
const mapDispatchToProps = dispatch => ({
  dispatchSaveNoteData: data => dispatch(setNoteData(data)),
  dispatchCreateNote: () => dispatch(createConexionNote()),
  dispatchEditNote: () => dispatch(editConexionNote()),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(RichTextEditor);
