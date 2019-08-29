import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import FullPageModal from 'cnxapp/src/components/FullPageModal';
import { View } from 'native-base';
import WebView from 'react-native-webview';
import { ActivityIndicator } from 'react-native-paper';
import { setReceiptPdfViewerVisibility } from '../../actions';
import { selectGlobalLoader, selectPdfViewerVisible } from '../../selectors';

class PdfViewer extends PureComponent {
  _closeModal = () => {
    const { dispatchModalStateVisibility } = this.props;
    dispatchModalStateVisibility(false);
  };

  showLoadingIndicator = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  );

  render() {
    const { modalOpen, loader, receipt } = this.props;

    return (
      <FullPageModal
        visible={modalOpen}
        handleModalVisible={this._closeModal}
        modalHeaderText={receipt.ReceiptName}
        loader={loader}
      >
        <View style={{ flex: 1, overflow: 'hidden' }}>
          <WebView
            source={{ uri: receipt.BlobUrl }}
            startInLoadingState
            renderLoading={this.showLoadingIndicator}
          />
        </View>
      </FullPageModal>
    );
  }
}
PdfViewer.propTypes = {
  modalOpen: PropTypes.bool.isRequired,
  dispatchModalStateVisibility: PropTypes.func.isRequired,
  loader: PropTypes.bool.isRequired,
  receipt: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loader: selectGlobalLoader(),
  modalOpen: selectPdfViewerVisible(),
});

const mapDispatchToProps = dispatch => ({
  dispatchModalStateVisibility: visibility =>
    dispatch(setReceiptPdfViewerVisibility(visibility)),
});
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(PdfViewer);
