import React from 'react';

import {View, ProgressBarAndroid, ActivityIndicatorIOS, Platform} from 'react-native';

const Loader = props => {
   return (
      <View style={{flex: 1, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
         <View style={{transform: [{scale: 0.7}]}}>
            {Platform.OS === 'android'
            ? <ProgressBarAndroid color={props.color || '#fff'} />
            : <ActivityIndicatorIOS size="large" color={props.color || '#fff'} />
            }
         </View>
      </View>
   );
}

export default Loader;
