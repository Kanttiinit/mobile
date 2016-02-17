'use strict';

import React from 'react-native';

const {
   View,
   Platform,
   TouchableOpacity,
   TouchableNativeFeedback,
   TouchableHighlight
} = React;

export default class Button extends React.Component {
   renderChildren() {
      return <View style={this.props.style}>{this.props.children}</View>
   }
   render() {
      const {onPress, containerStyle, pointerEvents, highlightColor} = this.props;
      const children = this.renderChildren();

      const touchableProps = {
         onPress,
         style: containerStyle,
         pointerEvents: pointerEvents || 'auto'
      };

      if (highlightColor)
         return (
            <TouchableHighlight
               underlayColor={highlightColor}
               activeOpacity={0.6}
               {...touchableProps}>
               {children}
            </TouchableHighlight>
         );

      return (
         <TouchableOpacity
            activeOpacity={0.6}
            {...touchableProps}>
            {children}
         </TouchableOpacity>
      );
   }
}
