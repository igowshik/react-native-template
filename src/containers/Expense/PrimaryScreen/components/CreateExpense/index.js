import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Button } from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5Pro';
import { reduxForm } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';

// Absolute imports
import FullPageModal from 'cnxapp/src/components/FullPageModal';
import * as colors from 'cnxapp/src/utils/colorsConstants';
import { createStructuredSelector } from 'reselect';
import CreateExpenseForm from './CreateExpenseForm';

class CreateExpense extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onCreateExpense = this.onCreateExpense.bind(this);
  }

  onCreateExpense = () => {
    this._closeModal();
  };

  _closeModal = () => {
    const { setModalOpenClose } = this.props;
    setModalOpenClose(false);
  };

  render() {
    const { modalOpen, pristine, submitting } = this.props;
    return (
      <FullPageModal
        visible={modalOpen}
        handleModalVisible={this._closeModal}
        modalHeaderText="Create Expense"
      >
        <View style={styles.headerContainer}>
          <Button
            raised
            // onPress={handleSubmit(this.onCreateExpense)}
            disabled={pristine || submitting}
            mode="contained"
            color={colors.PURPLE}
            icon={() => (
              <FontAwesome5 name="check" color="#fff" size={18} light />
            )}
          >
            Done
          </Button>
        </View>
        <CreateExpenseForm style={styles.container} />
      </FullPageModal>
    );
  }
}
CreateExpense.propTypes = {
  modalOpen: PropTypes.bool.isRequired,
  setModalOpenClose: PropTypes.func.isRequired,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  // handleSubmit: PropTypes.func.isRequired,
};

const redux = reduxForm({
  form: 'createExpense',
  enableReinitialize: true,
  destroyOnUnmount: true,
  keepDirtyOnReinitialize: false,
});

const styles = StyleSheet.create({
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    margin: 10,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
  container: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    flex: 1,
  },
});
const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = dispatch => ({});//eslint-disable-line
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(
  withConnect,
  redux,
)(CreateExpense);
