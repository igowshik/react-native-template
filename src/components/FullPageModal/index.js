import {
  Modal,
  View,
  Platform,
  StatusBar,
  StyleSheet,
  Dimensions,
} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5Pro';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';

import * as colors from 'cnxapp/src/utils/colorsConstants';
import {
  LINEAR_START,
  LINEAR_END,
  // CARD_BORDER_RADIUS,
} from 'cnxapp/src/utils/valueconstants';
import { IconButton, Headline } from 'react-native-paper';
import { Grid, Col } from 'react-native-easy-grid';

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
    const { visible, modalHeaderText, modalHeaderRightComponent } = this.props;
    return (
      <View
        style={{
          paddingTop: StatusBar.currentHeight,
        }}
      >
        <Modal
          animationType="slide"
          onRequestClose={() => {}}
          transparent={false}
          visible={visible}
        >
          <StatusBar barStyle={visible ? 'light-content' : 'default'} />
          <View style={styles.parentView}>
            <LinearGradient
              start={LINEAR_START}
              end={LINEAR_END}
              colors={colors.DEAFULT_HEADER}
              style={styles.titleView}
            >
              <Grid>
                <Col size={20} style={styles.closeIcon}>
                  <IconButton
                    icon={() => (
                      <FontAwesome5
                        name="times-circle"
                        color="#FFF"
                        size={25}
                        solid
                      />
                    )}
                    color="#FFF"
                    onPress={this.closeModal}
                  />
                </Col>
                <Col size={60} style={styles.headerTitle}>
                  <Headline style={styles.headerText}>
                    {modalHeaderText}
                  </Headline>
                </Col>
                <Col size={20} style={styles.doneIcon}>
                  {modalHeaderRightComponent}
                </Col>
              </Grid>
            </LinearGradient>
            {this.getScrollViewContent()}
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  parentView: {
    flex: 1,
    backgroundColor: colors.BGCOLOR,
  },
  icon: {
    color: '#fff',
  },
  titleView: {
    display: 'flex',
    flexDirection: 'row',
    height: 60,
    // borderTopRightRadius: CARD_BORDER_RADIUS,
    // borderTopLeftRadius: CARD_BORDER_RADIUS,
    paddingTop: Platform.OS === 'ios' ? 10 : 0,
    marginBottom: 10,
  },
  closeIcon: {
    justifyContent: 'flex-start',
    alignContent: 'center',
    marginHorizontal: 10,
  },
  doneIcon: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignContent: 'center',
    marginEnd: 10,
  },
  headerTitle: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
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
  modalHeaderRightComponent: PropTypes.element,
};

export default FullPageModal;
