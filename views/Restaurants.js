'use strict';

import React from 'react-native';
import Material from 'react-native-material-kit';
const {
   Text,
   View,
   StyleSheet
} = React;

const {
   MKColor
} = Material;

class Restaurants extends React.Component {
   render() {
      return (
         <View style={styles.container}>
            <Text>Restaurants</Text>
         </View>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: MKColor.Silver,
      padding: 14
   }
});

export default Restaurants;
