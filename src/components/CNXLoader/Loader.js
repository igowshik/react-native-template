import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, Modal } from 'react-native';

import CNXLottieLoader from '../CNXLotties/CNXLottieLoader';

const transparent = 'transparent';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: transparent,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  background: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  textContent: {
    top: 80,
    height: 50,
    fontSize: 20,
    fontWeight: '300',
  },
  activityIndicator: {
    flex: 1,
  },
});

const ANIMATION = ['none', 'slide', 'fade'];

export default class Spinner extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visible: this.props.visible, //eslint-disable-line
      textContent: this.props.textContent, //eslint-disable-line
    };
  }

  static propTypes = {
    cancelable: PropTypes.bool,
    animation: PropTypes.oneOf(ANIMATION),
    overlayColor: PropTypes.string,
    textContent: PropTypes.string,
    textStyle: PropTypes.object,
    visible: PropTypes.bool,
    indicatorStyle: PropTypes.object,
    customIndicator: PropTypes.element,
    children: PropTypes.element,
  };

  static defaultProps = {
    visible: false,
    cancelable: false,
    textContent: '',
    animation: 'none',
    overlayColor: 'rgba(0, 0, 0, 0.25)',
  };

  close() {
    this.setState({ visible: false });
  }

  static getDerivedStateFromProps(props, state) {
    const newState = {};
    if (state.visible !== props.visible) newState.visible = props.visible;
    if (state.textContent !== props.textContent)
      newState.textContent = props.textContent;
    return newState;
  }

  _handleOnRequestClose() {
    const { cancelable } = this.props;

    if (cancelable) {
      this.close();
    }
  }

  _renderDefaultContent() {
    const {
      customIndicator,
      // color,
      // size,
      indicatorStyle,
      textStyle,
    } = this.props;
    const { textContent } = this.state;
    return (
      <View style={styles.background}>
        {customIndicator || (
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              alignContent: 'center',
            }}
          >
            <CNXLottieLoader />
          </View>
        )}
        <View style={[styles.textContainer, { ...indicatorStyle }]}>
          <Text style={[styles.textContent, textStyle]}>{textContent}</Text>
        </View>
      </View>
    );
  }

  _renderSpinner() {
    const { visible } = this.state;

    const { children, overlayColor, animation } = this.props;

    if (!visible) return null;

    const spinner = (
      <View
        style={[styles.container, { backgroundColor: overlayColor }]}
        key={`spinner_${Date.now()}`}
      >
        {children || this._renderDefaultContent()}
      </View>
    );

    return (
      <Modal
        animationType={animation}
        onRequestClose={() => this._handleOnRequestClose()}
        supportedOrientations={['landscape', 'portrait']}
        transparent
        visible={visible}
      >
        {spinner}
      </Modal>
    );
  }

  render() {
    return this._renderSpinner();
  }
}
