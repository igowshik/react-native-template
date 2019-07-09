import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, StyleSheet, View } from 'react-native';
import Modal from 'react-native-modal';

export default class ActionSheet extends Component {
  state = {};

  handleOnScroll = event => {
    this.setState({
      scrollOffset: event.nativeEvent.contentOffset.y,
    });
  };

  handleScrollTo = p => {
    if (this.scrollViewRef) {
      this.scrollViewRef.scrollTo(p);
    }
  };

  render() {
    const { visible, hideSheet, children, horizontal } = this.props;

    return (
      <View style={styles.container}>
        <Modal
          isVisible={visible}
          onSwipeComplete={hideSheet}
          onBackdropPress={hideSheet}
          swipeDirection="down"
          scrollTo={this.handleScrollTo}
          scrollOffset={this.state.scrollOffset}
          scrollOffsetMax={400 - 300} // content height - ScrollView height
          style={styles.bottomModal}
        >
          <View style={styles.scrollableModal}>
            <ScrollView
              ref={ref => {
                this.scrollViewRef = ref;
              }}
              horizontal={horizontal || false}
              // onScroll={this.handleOnScroll}
              // scrollEventThrottle={16}
            >
              {children}
            </ScrollView>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  content: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  contentTitle: {
    fontSize: 20,
    marginBottom: 12,
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  scrollableModal: {
    height: 300,
    backgroundColor: 'white',
  },
  customBackdrop: {
    flex: 1,
    backgroundColor: '#87BBE0',
    alignItems: 'center',
  },
  customBackdropText: {
    marginTop: 10,
    fontSize: 17,
  },
});

ActionSheet.propTypes = {
  visible: PropTypes.bool.isRequired,
  hideSheet: PropTypes.func.isRequired,
  children: PropTypes.node,
  horizontal: PropTypes.bool,
};
