import React from 'react';

import {View, ActivityIndicator} from 'react-native';

const Loader = props => {
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
