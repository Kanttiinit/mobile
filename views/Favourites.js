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
      this.setState({
         favorites: Favorite.getFavorites()
      });
   }
   openModal() {
      this.refs.modal.open();
   }
   render() {
      return(
         <View style={styles.container}>
            <ScrollView style={styles.favoriteList} scrollsToTop={true} contentInset={{x: 0, y: 0}} contentInset={{top: 10, left: 0, right: 0, bottom: 80}}>
               {this.state.favorites.map(fav => <Food key={fav.name} favorite={fav} />)}
            </ScrollView>
            <MKButton
               style={styles.fab}
               fab={true}
               onPress={this.openModal.bind(this)}>
               <Icon name={'plus-round'} size={22} color={MKColor.Silver} />
            </MKButton>
            <Modal style={styles.modal} ref={"modal"} onClosed={this.onClose} onOpened={this.onOpen}
               onClosingState={this.onClosingState}>
               <Text style={styles.text}>New Favorite</Text>
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
      justifyContent: 'center',
      alignItems: 'center'
   },
   text: {
      color: "black",
      fontSize: 22
   }
});

export default Favourites;
