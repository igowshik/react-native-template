import React from 'react';
import { Button, Dialog, Paragraph, Portal } from 'react-native-paper';
import PropTypes from 'prop-types';
import * as Colors from 'cnxapp/src/utils/colorsConstants';

export default class Dialogs extends React.Component {
  state = {};

  render() {
    const { visible, onDismiss, title, message, onConfirm } = this.props;
    return (
      <Portal>
        <Dialog visible={visible} onDismiss={onDismiss}>
          <Dialog.Title style={{ color: Colors.PINK }}>
            {title || 'Message!'}
          </Dialog.Title>
          <Dialog.Content>
            <Paragraph>{message}</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={onDismiss}>Cancel</Button>
            <Button onPress={onConfirm}>Ok</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    );
  }
}

Dialogs.propTypes = {
  visible: PropTypes.bool.isRequired,
  onDismiss: PropTypes.func.isRequired,
  title: PropTypes.string,
  message: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
};
