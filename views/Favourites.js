'use strict';

import React from 'react-native';
import Material from 'react-native-material-kit';
import Favorite from '../managers/Favorite';
import Modal from 'react-native-modalbox';
import Icon from 'react-native-vector-icons/Ionicons';

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
      // this.setState({
      //    favorites: Favorite.getFavorites()
      // });
   }
   openModal() {
      this.refs.modal.open();
   }
   render() {
      return(
         <View style={styles.container}>
            <ScrollView style={styles.favoriteList} scrollsToTop={true} contentInset={{top: 10, left: 0, right: 0, bottom: 80}}>
               {this.state.favorites.map(fav => <Food key={fav.name} favorite={fav} />)}
            </ScrollView>
            <MKButton
               style={styles.fab}
               fab={true}
               onPress={this.openModal.bind(this)}>
               <Icon name='plus-round' size={22} color={MKColor.Silver} />
            </MKButton>

            <Modal ref="modal" style={styles.modal} swipeToClose={false} onClosed={this.onClose}
               onOpened={this.onOpen} onClosingState={this.onClosingState}>
               <Text style={styles.modalTitle}>Uusi suosikki</Text>
               <MKTextField
                  clearButtonMode='while-editing'
                  ref="favoriteName"
                  tintColor={MKColor.Teal}
                  textInputStyle={{color: MKColor.Black, fontSize: 18}}
                  floatingLabelEnabled={true}
                  onChangeText={(text) => this.setState({text})}
                  style={styles.textField}
                  placeholder="Ruoan nimi">
               </MKTextField>
               <MKButton
                  style={styles.addButton}>
                  <Icon name='plus-round' size={22} color={MKColor.Silver} />
               </MKButton>
            </Modal>

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
   favoriteList: {
      flex: 1
   },
   fab: {
      right: 20,
      bottom: 20,
      position: 'absolute',
      width: 60,
      height: 60,
      shadowRadius: 1,
      shadowOffset: {width: 0, height: .5},
      shadowOpacity: .4,
      shadowColor: 'black',
      backgroundColor: MKColor.Teal,
      justifyContent: 'center',
      alignItems: 'center'
   },
   addButton: {
      position: 'absolute',
      bottom: 0,
      width: 300,
      padding: 4,
      shadowColor: 'black',
      backgroundColor: MKColor.Teal,
      justifyContent: 'center',
      alignItems: 'center'
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
   },
   modal: {
      alignItems: 'center',
      width: 300,
      height: 200
   },
   modalTitle: {
      margin: 10,
      color: "black",
      fontSize: 22
   },
   textField: {
      width: 200,
      height: 60
   }
});

export default Favourites;
