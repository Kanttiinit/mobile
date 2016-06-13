import React from 'react';

import {
   View,
   Platform,
   TouchableOpacity,
   TouchableNativeFeedback,
   TouchableHighlight
} from 'react-native';

const renderChildren = props => {
   return <View style={props.style}>{props.children}</View>;
}

const Button = props => {
   const {onPress, containerStyle, pointerEvents, highlightColor, style} = props;
   const children = renderChildren({children: props.children, style});

   const touchableProps = {
      onPress,
      style: containerStyle,
      pointerEvents: pointerEvents || 'auto'
   };

   if (highlightColor) {
      return (
         <TouchableHighlight
            underlayColor={highlightColor}
            activeOpacity={0.6}
            {...touchableProps}>
            {children}
         </TouchableHighlight>
      );
   }

   return (
      <TouchableOpacity
         activeOpacity={0.6}
         {...touchableProps}>
         {children}
      </TouchableOpacity>
   );
}

export default Button;
