import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  TouchableRipple,
  Avatar,
  Card,
  Checkbox,
  Button,
  TextInput,
} from 'react-native-paper';
import { Text, H3 } from 'native-base';
import PropTypes from 'prop-types';
import Lo from 'lodash';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5Pro';

import WebViewQuillEditor from 'cnxapp/src/components/QuillEditor/WebViewQuillEditor';
import * as colors from 'cnxapp/src/utils/colorsConstants';

class RichTextEditor extends React.Component {
  constructor() {
    super();
    this.state = {
      editorMessageDelta: '',
      checked: true,
      text: '',
    };
    this.webQuillRef = React.createRef();
  }

  getEditorDelta = () => {
    console.log(this.webQuillRef.current.getDelta());
  };

  componentDidMount() {
    const { note } = this.props;
    if (!Lo.isEmpty(note)) {
      this.setState({
        editorMessageDelta: note.Note,
        text: note.Title,
        checked: note.PrivateNote,
      });
    }
  }

  render() {
    const { checked } = this.state;

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
              <H3 style={{ paddingLeft: 10 }}>Note details</H3>
            </View>
            <Card.Content>
              <View style={styles.form}>
                <TextInput
                  style={{ width: '50%' }}
                  label="Title"
                  value={this.state.text}
                  onChangeText={text => this.setState({ text })}
                  // mode="outlined"
                />
                <TouchableRipple
                  onPress={() => {
                    this.setState({ checked: !checked });
                  }}
                >
                  <View style={styles.row}>
                    <Text style={{ paddingTop: 15 }}>Private Note</Text>
                    <View pointerEvents="none" style={{ paddingTop: 15 }}>
                      <Checkbox
                        color={colors.SECONDARY}
                        status={this.state.checked ? 'checked' : 'unchecked'}
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
                    onPress={this.setModalOpen}
                  >
                    Add Note
                  </Button>
                </View>
              </View>
            </Card.Content>
          </Card>
        </View>
        <View style={styles.webView}>
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
  avatar: { backgroundColor: colors.SECONDARY },
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

export default RichTextEditor;
