'use strict';

import React from 'react-native';
import Material from 'react-native-material-kit';
const {
   View,
   Text,
   StyleSheet
} = React;

const {
   MKButton,
   MKTextField,
   MKColor
} = Material;

class Favourites extends React.Component {
   render() {
      return(
         <View style={styles.container}>
            <View style={styles.newFood}>
               <MKTextField
                  tintColor={MKColor.Cyan}
                  textInputStyle={{color: MKColor.Black, fontSize: 18}}
                  floatingLabelEnabled={true}
                  style={{flex: 3}}
                  placeholder="New favourite food" />
               <MKButton
                  style={{padding: 8, marginLeft: 8, flex: 1, alignItems: 'center', justifyContent: 'center'}}
                  backgroundColor={MKColor.Cyan}>
                  <Text style={{color: MKColor.Silver, fontSize: 18}}>Add</Text>
               </MKButton>
            </View>
            <View style={{flex: 1}}></View>
         </View>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      padding: 14,
      backgroundColor: MKColor.Silver
   },
   newFood: {
      flexDirection: 'row',
      height: 48
   }
});

export default Favourites;
