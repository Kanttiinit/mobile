'use strict';

import {StyleSheet} from 'react-native';

export const colors = {
   accent: '#009688',
   accentLight: '#4DB6AC',
   accentDark: '#00796B',
   grey: '#BDBDBD',
   lightGrey: '#EEEEEE',
   white: '#FFFFFF',
   black: '#000000',
   darkGrey: '#424242',
   red: '#B71C1C'
};

export const defaultStyles = StyleSheet.create({
   card: {
      backgroundColor: 'white',
      elevation: 1,
      shadowColor: 'black',
      shadowOpacity: 0.2,
      shadowOffset: {width: 0, height: 1},
      shadowRadius: 1,
      marginBottom: 18,
      borderRadius: 4
   },
   lightBorderTop: {
      borderTopWidth: 1,
      borderTopColor: colors.lightGrey
   }
});
