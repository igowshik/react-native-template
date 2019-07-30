import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5Pro';

import { Button, Text, Icon } from 'native-base';

// Absolute imports
import { CNXText } from 'cnxapp/src/components/Texts';
import * as colors from 'cnxapp/src/utils/colorsConstants';

// Relative imports
import { primaryButtonGradientStyle, primaryRounded } from './styles';

export const PrimaryButton = props => {
  const { handleButtonClick, buttonText, icon, disabled } = props;
  return (
    <View>
      <Button
        iconRight
        primary
        disabled={disabled}
        onPress={handleButtonClick}
        style={{ margin: 5 }}
      >
        <Text style={{ fontWeight: 'bold' }}>{buttonText || null}</Text>
        <Icon>
          {icon ? (
            <FontAwesome5
              style={{ fontWeight: 'bold' }}
              size={20}
              name={icon}
              light
            />
          ) : null}
        </Icon>
      </Button>
    </View>
  );
};

PrimaryButton.propTypes = {
  handleButtonClick: PropTypes.func,
  buttonText: PropTypes.string,
  icon: PropTypes.string,
  disabled: PropTypes.bool,
};

export const PrimaryButtonGradient = props => {
  const { handleButtonClick, buttonText, icon, disabled } = props;
  return (
    <View>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={colors.primaryColorSet}
        style={primaryButtonGradientStyle.linearGradientButton}
      >
        <TouchableOpacity onPress={handleButtonClick} disabled={disabled}>
          <View style={primaryButtonGradientStyle.touchViewStyle}>
            {buttonText ? (
              <CNXText
                style={primaryButtonGradientStyle.buttonTextStyle}
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
                color="#FFFFFF"
                size={20}
                brand
              />
            ) : null}
          </View>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

PrimaryButtonGradient.propTypes = {
  handleButtonClick: PropTypes.func,
  buttonText: PropTypes.string,
  icon: PropTypes.string,
  disabled: PropTypes.bool,
};

export const PrimaryRoundButton = props => {
  const { handleButtonClick, buttonText, icon, disabled, color } = props;
  return (
    <View>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={color.length > 0 ? color : colors.primaryColorSet}
        style={primaryRounded.linearGradientButton}
      >
        <TouchableOpacity onPress={handleButtonClick} disabled={disabled}>
          <View style={primaryRounded.touchViewStyle}>
            {buttonText ? (
              <CNXText
                style={primaryRounded.buttonTextStyle}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {buttonText}
              </CNXText>
            ) : null}
            {icon ? (
              <FontAwesome5
                style={{ margin: 2 }}
                name={icon}
                color="#FFFFFF"
                size={18}
                brand
              />
            ) : null}
          </View>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

PrimaryRoundButton.propTypes = {
  handleButtonClick: PropTypes.func,
  buttonText: PropTypes.string,
  icon: PropTypes.string,
  disabled: PropTypes.bool,
  color: PropTypes.array,
};
