'use strict';

import React from 'react-native';
import Material from 'react-native-material-kit';
import Favorite from '../managers/Favorite';

const {
   View,
   Text,
   ScrollView,
   StyleSheet
} = React;

const {
   MKCardStyles,
   MKButton,
   MKTextField,
   MKColor
} = Material;

class Food extends React.Component {
   render() {
      const {favorite} = this.props;
      return (
         <View style={[MKCardStyles.card, styles.food]} >
            <Text style={styles.foodTitle} key={favorite.name}>
               {favorite.name}
            </Text>
         </View>
      );
   }
}

class Favourites extends React.Component {
   constructor() {
      super();
      this.state = {favorites: []};
   }
   componentDidMount() {
      this.setState({
         favorites: Favorite.getFavorites()
      });
   }
   render() {
      return(
            <View style={styles.container}>
               <View style={styles.newFood}>
                  <MKTextField
                     tintColor={MKColor.Teal}
                     textInputStyle={{color: MKColor.Black, fontSize: 18}}
                     floatingLabelEnabled={true}
                     style={{flex: 3}}
                     placeholder="New favourite food" />
                  <MKButton
                     onPress={Favorite.addFavorite.bind(this, "sun mutsi")}
                     style={styles.addButton}
                     backgroundColor={MKColor.Teal}>
                     <Text style={{color: MKColor.Silver, fontSize: 18}}>Add</Text>
                  </MKButton>
               </View>
               <ScrollView style={{flex: 1}}>
                  {this.state.favorites.map(fav => <Food key={fav.name} favorite={fav} />)}
               </ScrollView>
            </View>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: MKColor.Silver
   },
   newFood: {
      flexDirection: 'row',
      height: 60,
      padding: 14
  },
   addButton: {
       padding: 8,
       marginLeft: 8,
       flex: 1,
       alignItems: 'center',
       justifyContent: 'center'
   },
   foodTitle: {
      fontSize: 20,
      paddingBottom: 4
   },
   food: {
      height: 60,
      marginLeft: 14,
      marginRight: 14,
      marginBottom: 8,
      padding: 8
   }
});

export default Favourites;
