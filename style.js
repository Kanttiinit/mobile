'use strict';

import {StyleSheet} from 'react-native';

export const colors = {
   accent: '#3eab79',
   accentLight: '#40bf85',
   accentDark: '#339568',
   grey: '#BDBDBD',
   lightGrey: '#f8f8f8',
   white: '#FFFFFF',
   black: '#000000',
   darkGrey: '#424242',
   red: '#B71C1C'
};

const roundedElevated = {
   elevation: 1,
   shadowColor: 'black',
   shadowOpacity: 0.2,
   shadowOffset: {width: 0, height: 1},
   shadowRadius: 1,
   backgroundColor: 'white',
   margin: 4,
   borderRadius: 2
};

export const defaultStyles = StyleSheet.create({
   card: {
      ...roundedElevated,
      backgroundColor: 'white',
      margin: 10,
      marginTop: 0
   },
   lightBorderTop: {
      borderTopWidth: 1,
      borderTopColor: colors.lightGrey
   },
   button: {
      ...roundedElevated,
      backgroundColor: colors.accent
   }
});
