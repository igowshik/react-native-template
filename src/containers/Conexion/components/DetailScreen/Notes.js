/**
 * Notes tab component
 * Added by Selvam K
 */
// Native imports
import React from 'react';
import { View, ScrollView } from 'react-native';
import PropTypes from 'prop-types';

// Package imports
import { Card, CardItem, Text, Body } from 'native-base';
import HTMLView from 'react-native-htmlview';

// Absolute imports
// import { CNXText } from 'cnxapp/src/components/CNXTexts';

// Relative imports
import { Styles } from './styles';

class Notes extends React.Component {
  componentDidMount() {}

  notesCards = () => {
    const { conexionNotes } = this.props;

    return conexionNotes.map(note => (
      <Card key={note.ConexionNoteId}>
        <CardItem header>
          <Text>{note.ConexionNoteId}</Text>
        </CardItem>
        <CardItem>
          <Body>
            <HTMLView value={note.Note} />
          </Body>
        </CardItem>
        <CardItem footer>
          <Text>Edit</Text>
        </CardItem>
      </Card>
    ));
  };

  render() {
    return (
      <View style={Styles.mainViewContainer}>
        <ScrollView>{this.notesCards()}</ScrollView>
      </View>
    );
  }
}

Notes.propTypes = {
  conexionNotes: PropTypes.array,
};

export default Notes;
