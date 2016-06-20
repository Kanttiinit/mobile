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
  //  borderWidth: 1,
  //  borderColor: '#f0f0f0',
  //  borderRadius: 1,
  //  borderTopWidth: 0,
   margin: 4,
   borderRadius: 2
};

export const defaultStyles = StyleSheet.create({
   card: {
      ...roundedElevated,
      backgroundColor: 'white',
      marginBottom: 4,
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
