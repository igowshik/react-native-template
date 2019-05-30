import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

// import Modal from 'react-native-modal';
// import { Button, Text } from 'native-base';

export default class CreateExpense extends Component {
  _closeModal = () => {
    const { setModalOpenClose } = this.props;
    setModalOpenClose(false);
  };

  render() {
    // const { modalOpen } = this.props;
    return (
      <View style={styles.container}>
        {/* <Modal isVisible={modalOpen}>
          <View style={styles.modalContent}>
            <Text>Hello!</Text>
            <Button onPress={this._closeModal}>
              <Text>Close</Text>
            </Button>
          </View>
        </Modal> */}
      </View>
    );
  }
}

CreateExpense.propTypes = {
  setModalOpenClose: PropTypes.func.isRequired,
  // modalOpen: PropTypes.bool,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'lightblue',
    padding: 12,
    margin: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
});
