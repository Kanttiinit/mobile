// @flow
import React from 'react';
import {View} from 'react-native';

import {colors, spaces} from '../../utils/style';

export default ({width, height}: {width: number, height: number}) => (
  <View
    style={{
      height,
      width,
      backgroundColor: colors.lightGrey,
      margin: spaces.small
    }} />
);
