import React from 'react';

import {
  View,
  TouchableOpacity,
  TouchableHighlight
} from 'react-native';

const Button = props => {
  const {onPress, containerStyle, pointerEvents, highlightColor, style} = props;
  const children = <View style={style}>{props.children}</View>;

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
};

export default Button;
