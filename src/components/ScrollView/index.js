import { Dimensions, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const { height } = Dimensions.get('window');

class Scrollview extends React.Component {
  state = {
    // We don't know the size of the content initially, and the probably won't instantly try to scroll, so set the initial content height to 0
    screenHeight: 0,
  };

  onContentSizeChange = (contentWidth, contentHeight) => {
    // Save the content height in state
    this.setState({ screenHeight: contentHeight });
  };

  render() {
    const { children } = this.props;
    const scrollEnabled = this.state.screenHeight > height;
    return (
      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollview}
        scrollEnabled={scrollEnabled}
        onContentSizeChange={this.onContentSizeChange}
      >
        <ScrollView>{children}</ScrollView>
      </KeyboardAwareScrollView>
    );
  }
}
const styles = StyleSheet.create({
  scrollview: {
    flexGrow: 1,
  },
});

Scrollview.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default ScrollView;
