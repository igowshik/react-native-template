import {
  Modal,
  TouchableHighlight,
  View,
  Platform,
  StatusBar,
  StyleSheet,
} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';

import FontAwesome5 from 'react-native-vector-icons/EvilIcons';
import { CNXH1 } from 'cnxapp/src/components/Typography';
import { HorizDivider } from 'cnxapp/src/components/Dividers';

class FullPageModal extends React.Component {
  setModalVisible(visible) {
    this.props.handleModalVisible(visible);
  }

  closeModal = () => this.props.handleModalVisible(false);

  render() {
    const { visible, children, modalHeaderText } = this.props;
    return (
      <View
        style={{
          paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
        }}
      >
        <StatusBar hidden />
        <Modal
          animationType="slide"
          onRequestClose={() => {}}
          transparent={false}
          visible={visible}
        >
          <View style={styles.parentView}>
            <View style={styles.titleView}>
              <View style={styles.closeIcon}>
                <TouchableHighlight onPress={this.closeModal}>
                  <FontAwesome5
                    style={styles.icon}
                    name="close"
                    size={50}
                    light
                  />
                </TouchableHighlight>
              </View>
              <View style={styles.headerTitle}>
                <CNXH1 style={styles.headerText}>{modalHeaderText}</CNXH1>
              </View>
            </View>
            <HorizDivider />
            <View style={styles.scrollView}>{children}</View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  parentView: {},
  icon: {
    color: '#fff',
  },
  titleView: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'rgba(31,38,103,1)',
    height: 50,
  },
  closeIcon: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
  },
  headerTitle: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    width: '90%',
  },
  scrollView: {
    height: '100%',
  },
  headerText: {
    color: '#fff',
  },
});

FullPageModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  handleModalVisible: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  modalHeaderText: PropTypes.string,
};

export default FullPageModal;
