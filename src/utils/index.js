import { PixelRatio, Dimensions } from 'react-native';
export const Util = {
  ratio: PixelRatio.get(),
  pixel: 1 / PixelRatio.get(),
  size: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
};

export const find75PercentWidthOfView = width => {
  const viewFullWidth = width;
  const width75Percent = (75 * viewFullWidth) / 100;
  const width25Percent = viewFullWidth - width75Percent;
  return { width75Percent, width25Percent };
};
