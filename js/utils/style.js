import {StyleSheet} from 'react-native';
import Color from 'color-js';

const accent = Color('#009688');
const red = Color('#B71C1C');
const white = Color('#fff');
const black = Color('#000');
const yellow = Color('#FDD835');

const colors = {
  accent, white, black, red, yellow,
  accentLight: accent.lightenByRatio(0.1),
  accentDark: accent.darkenByRatio(0.3),
  grey: white.darkenByRatio(0.3),
  lightGrey: white.darkenByRatio(0.03),
  mediumGrey: white.darkenByRatio(0.1),
  darkGrey: white.darkenByRatio(0.8),
  almostBlack: black.lightenByRatio(0.1),
  lightRed: red.setLightness(0.97).desaturateByRatio(0.2)
};

const spaces = {
  big: 20,
  medium: 10,
  small: 6,
  mini: 3
};

const roundedElevated = {
  elevation: 1,
  shadowColor: colors.black,
  shadowOpacity: 0.2,
  shadowOffset: {width: 0, height: 1},
  shadowRadius: 1,
  backgroundColor: colors.white,
  margin: 4,
  borderRadius: 2
};

const defaultStyles = StyleSheet.create({
  card: {
    ...roundedElevated,
    backgroundColor: colors.white,
    margin: spaces.medium,
    marginTop: 0
  },
  lightBorderTop: {
    borderTopWidth: 1,
    borderTopColor: colors.lightGrey
  },
  button: {
    ...roundedElevated,
    backgroundColor: colors.accent
  },
  lightButtonText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.accent
  },
  bigText: {
    fontSize: 20
  },
  smallText: {
    fontSize: 12,
    color: colors.grey
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
});

global.colors = Object.keys(colors).reduce((acc, colorName) => {
  acc[colorName] = colors[colorName].toString();
  return acc;
}, {});
global.defaultStyles = defaultStyles;
global.spaces = spaces;
