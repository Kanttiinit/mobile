'use strict';

import React from 'react-native';
const {
   View,
   ProgressBarAndroid,
   ActivityIndicatorIOS,
   Platform
} = React;

export default class Loader extends React.Component {
   render() {
      return (
         <View style={{flex: 1, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
            <View style={{transform: [{scale: 0.7}]}}>
               {Platform.OS === 'android' ?
               <ProgressBarAndroid color={this.props.color || '#fff'} />
               :
               <ActivityIndicatorIOS size="large" color={this.props.color || '#fff'} />
               }
            </View>
         </View>
      );
   }
}
