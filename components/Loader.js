'use strict';

import React from 'react-native';
const {
   Component,
   View
} = React;

import {
   mdl
} from 'react-native-material-kit';

class Loader extends Component {
   render() {
      return (
         <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <mdl.Spinner strokeColor='#fff' />
         </View>
      );
   }
}

export default Loader;
