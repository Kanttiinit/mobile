'use strict';

import {StyleSheet} from 'react-native';

export const colors = {
   accent: '#009688',
   accentLight: '#4DB6AC',
   accentDark: '#00796B',
   grey: '#BDBDBD',
   lightGrey: '#f8f8f8',
   white: '#FFFFFF',
   black: '#000000',
   darkGrey: '#424242',
   red: '#B71C1C',
   lightRed: '#fff9f9'
};

export const spaces = {
   big: 20,
   medium: 10,
   small: 6,
   mini: 3
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
   }
});
