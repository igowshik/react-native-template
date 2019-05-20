import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import LinearGradient from 'react-native-linear-gradient';
import { Header, Right, Left } from 'native-base';

// Absolute imports
import * as colors from 'cnxapp/src/utils/colorsConstants';

// Relative imports
import styles from './styles';
import { CNXText } from '../CNXTexts';
import { PrimaryButton } from '../CNXButtons/Primary';
import { CNXH2 } from '../CNXTypography';

const CNXModal = props => {
  const {
    modalVisible,
    children,
    finsihButtonClick,
    closeModalClick,
    finshButtontext,
    title,
    headerView,
    disabled,
  } = props;

  return (
    <Modal isVisible={modalVisible}>
      <View style={styles.mainView}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={colors.primaryColorSet}
          style={styles.modalContent}
        >
          <View>
            <TouchableOpacity
              style={styles.headerCloseButton}
              onPress={closeModalClick}
            >
              <CNXText style={styles.closeButton}>Close</CNXText>
            </TouchableOpacity>
          </View>
          <View style={{ backgroundColor: 'white' }}>
            <Header style={styles.contentHeader}>
              <Left>
                <CNXH2 style={{ color: colors.primary }}>{title}</CNXH2>
              </Left>
              <Right>
                <View style={styles.headerRight}>{headerView}</View>
              </Right>
            </Header>
            <View style={styles.modalMiddleView}>{children}</View>
            <View style={styles.modalBottomView}>
              <PrimaryButton
                handleButtonClick={finsihButtonClick}
                buttonText={finshButtontext || 'Done'}
                disabled={disabled}
              />
            </View>
          </View>
        </LinearGradient>
      </View>
    </Modal>
  );
};

CNXModal.propTypes = {
  modalVisible: PropTypes.bool.isRequired,
  children: PropTypes.any,
  finsihButtonClick: PropTypes.func,
  closeModalClick: PropTypes.func.isRequired,
  finshButtontext: PropTypes.string,
  title: PropTypes.string,
  headerView: PropTypes.element,
  disabled: PropTypes.bool,
};

export default CNXModal;
