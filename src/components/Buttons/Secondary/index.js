import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

// Absolute imports
import * as Colors from 'cnxapp/src/utils/colorsConstants';
import { CNXText } from 'cnxapp/src/components/Texts';

// Relative imports
import { secondaryButtonGradientStyle, secondaryButtonStyle } from './styles';
import { secondaryColorSet } from '../constants';

export const SecondaryButton = props => {
  const { handleButtonClick, buttonText, icon } = props;
  return (
    <View>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={secondaryColorSet}
        style={secondaryButtonStyle.linearGradientButton}
      >
        <TouchableOpacity onPress={handleButtonClick}>
          <View style={secondaryButtonStyle.touchViewStyle}>
            {buttonText ? (
              <CNXText
                style={secondaryButtonStyle.buttonTextStyle}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {buttonText}
              </CNXText>
            ) : null}
            {icon ? (
              <FontAwesome5
                style={{ marginLeft: 10 }}
                name={icon}
                color={Colors.white}
                size={14}
                brand
              />
            ) : null}
          </View>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

SecondaryButton.propTypes = {
  handleButtonClick: PropTypes.func,
  buttonText: PropTypes.string,
  icon: PropTypes.string,
};

export const SecondaryButtonGradient = props => {
  const { handleButtonClick, buttonText, icon } = props;
  return (
    <View style={secondaryButtonGradientStyle.viewButton}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={secondaryColorSet}
        style={secondaryButtonGradientStyle.linearGradientButton}
      >
        <TouchableOpacity onPress={handleButtonClick}>
          <View style={secondaryButtonGradientStyle.touchViewStyle}>
            {buttonText ? (
              <CNXText
                style={secondaryButtonGradientStyle.buttonTextStyle}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {buttonText}
              </CNXText>
            ) : null}
            {icon ? (
              <FontAwesome5
                style={{ marginLeft: 10 }}
                name={icon}
                color={Colors.white}
                size={14}
                brand
              />
            ) : null}
          </View>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

SecondaryButtonGradient.propTypes = {
  handleButtonClick: PropTypes.func,
  buttonText: PropTypes.string,
  icon: PropTypes.string,
};
