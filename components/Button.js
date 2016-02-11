'use strict';

import React from 'react-native';

const {
   View,
   Platform,
   TouchableOpacity
} = React;

export default class Button extends React.Component {
   render() {
      const {children, onPress, style, containerStyle, pointerEvents} = this.props;
      return (
         <TouchableOpacity
            activeOpacity={0.6}
            onPress={onPress}
            style={containerStyle}
            pointerEvents={pointerEvents || 'auto'}>
            <View style={style}>
            {children}
            </View>
         </TouchableOpacity>
      );
   }
}
