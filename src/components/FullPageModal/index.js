import {
  Modal,
  TouchableHighlight,
  View,
  Platform,
  StatusBar,
  StyleSheet,
  Dimensions,
} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome5 from 'react-native-vector-icons/EvilIcons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { CNXH1 } from 'cnxapp/src/components/Typography';
import { HorizDivider } from 'cnxapp/src/components/Dividers';
import * as colors from 'cnxapp/src/utils/colorsConstants';

const { height } = Dimensions.get('window');

class FullPageModal extends React.Component {
  state = {
    // We don't know the size of the content initially, and the probably won't instantly try to scroll, so set the initial content height to 0
    screenHeight: 0,
  };

  onContentSizeChange = (contentWidth, contentHeight) => {
    // Save the content height in state
    this.setState({ screenHeight: contentHeight });
  };

  setModalVisible(visible) {
    this.props.handleModalVisible(visible);
  }

  closeModal = () => this.props.handleModalVisible(false);

  getScrollViewContent = () => {
    const scrollEnabled = this.state.screenHeight > height;
    const { children } = this.props;
    if (Platform.OS === 'ios') {
      return (
        <KeyboardAwareScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.scrollview}
          scrollEnabled={scrollEnabled}
          onContentSizeChange={this.onContentSizeChange}
        >
          {children}
        </KeyboardAwareScrollView>
      );
    }
    return children;
  };

  render() {
    const { visible, modalHeaderText } = this.props;
    return (
      <View
        style={{
          paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
        }}
      >
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
            {this.getScrollViewContent()}
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  parentView: { flex: 1, backgroundColor: colors.BGCOLOR },
  icon: {
    color: '#fff',
  },
  titleView: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: colors.HEADER,
    height: 50,
    paddingTop: 10,
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
  scrollview: {
    flexGrow: 1,
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
