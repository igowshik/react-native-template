import { DefaultTheme } from 'react-native-paper';

import * as colors from 'cnxapp/src/utils/colorsConstants';

const paperTheme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.PRIMARY,
    accent: colors.SECONDARY,
    background: 'transparent',
  },
  fonts: {
    ...DefaultTheme.fonts,
    regular: 'Montserrat',
    medium: 'Montserrat',
    light: 'Proxima Nova',
    thin: 'Proxima Nova',
  },
};
export default paperTheme;
