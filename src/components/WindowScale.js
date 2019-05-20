import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const guidLineBaseWidth = 350;
const guidLineBaseHeight = 680;

const scale = size => (width / guidLineBaseWidth) * size;
const verticalScale = size => (height / guidLineBaseHeight) * size;
const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;

export { scale, verticalScale, moderateScale };
