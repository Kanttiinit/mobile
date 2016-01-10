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
         <View style={{flex: 1, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
            <mdl.Spinner strokeColor={this.props.color || '#fff'} />
         </View>
      );
   }
}

export default Loader;
