'use strict';

import React from 'react-native';

const {
   View,
   Platform,
   TouchableOpacity
} = React;

export default class Button extends React.Component {
   render() {
      const {children, onPress, style} = this.props;
      return (
         <TouchableOpacity
            activeOpacity={0.6}
            style={style}
            onPress={() => onPress(...arguments)}>
            {children}
         </TouchableOpacity>
      );
   }
}
