'use strict';

import React from 'react-native';
const {
   ScrollView,
   View,
   Text,
   Dimensions
} = React;

class Base extends React.Component {
   render() {
      return(
         <ScrollView style={{width: Dimensions.get('window').width}}>
            {this.props.children}
         </ScrollView>
      );
   }
}

export default Base;
