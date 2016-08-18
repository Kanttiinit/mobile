// @flow
import React from 'react';

import {View, ActivityIndicator} from 'react-native';

type Props = {
  color?: string
};

const Loader = (props: Props) => {
  return (
    <View style={{flex: 1, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator
        animating={true}
        size="large"
        color={props.color || '#fff'} />
    </View>
  );
};

export default Loader;
