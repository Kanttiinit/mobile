'use strict';

import React from 'react-native';
import Material from 'react-native-material-kit';
import FavoritesManager from '../managers/Favorites';
import Icon from 'react-native-vector-icons/Ionicons';
import Loader from '../components/Loader';
import {connect} from 'react-redux';

import {showModal} from '../store/actions';

import FavoriteModal from './Favorites/Modal';

const {
   View,
   Text,
   ScrollView,
   StyleSheet,
   Component,
   Platform
} = React;

const {
   MKButton,
   MKColor
} = Material;

class Favorite extends Component {
   shouldComponentUpdate(props) {
      return props.favorite.name !== this.props.favorite.name;
   }
   render() {
      const {favorite, parent, style} = this.props;
      return (
         <View style={[styles.favorite, style]}>
            <Icon style={styles.heartIcon} color='#fc5151' name='android-favorite' />
            <Text style={styles.foodTitle}>{favorite.name}</Text>
            <MKButton
               style={styles.removeButton}
               rippleColor='rgba(0, 0, 0, 0.25)'
               onPress={parent.removeFavorite.bind(parent, favorite.name)}>
               <Icon style={{fontSize: 26}} color='#8a8a8a' name='ios-close-empty' />
            </MKButton>
         </View>
      );
   }
}

class Favorites extends Component {
   constructor() {
      super();
      this.state = {};
   }
   componentDidMount() {
      if (!this.state.favorites)
         this.updateFavorites();
   }
   addFavorite(name) {
      if (name && name.length > 2) {
         FavoritesManager.addFavorite(name)
         .then(() => this.updateFavorites());
      }
   }
   removeFavorite(name) {
      FavoritesManager.removeFavorite(name)
      .then(() => this.updateFavorites())
      .catch(e => console.error(e));
   }
   updateFavorites() {
      FavoritesManager.getStoredFavorites()
      .then(favorites => {
         this.setState({
            favorites: favorites,
            favoritesCount: favorites.length
         });
      })
      .catch(err => console.error(err));
   }
   render() {
      const {favorites, favoritesCount, keyboard} = this.state;
      return (
         <View style={styles.container}>
            {favorites ?
               <ScrollView style={styles.favoriteList} scrollsToTop={true}>
                  {favorites.map(fav => {
                     return <Favorite favorite={fav} key={fav.name} parent={this}/>
                  })}
                  <View style={{height: 100}}></View>
               </ScrollView>
            : <Loader color={MKColor.Teal} />}
            {favorites && !favorites.length ? <Text style={{alignSelf: 'center', textAlign: 'center', width: 260, fontSize: 18, flex: 1, color: MKColor.Grey}}>Lisää avainsana, esimerkiksi 'salaatti' tai 'pizza'.</Text> : null}
            <MKButton
               style={styles.fab}
               fab={true}
               onPress={() => this.props.showModal(<FavoriteModal onSelect={this.addFavorite.bind(this)} />)}>
               <Icon name='plus-round' size={22} color="white" />
            </MKButton>
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
      flexDirection: 'row'
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
   favorite: {
      backgroundColor: '#fff',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingRight: 10,
      paddingLeft: 15,
      paddingVertical: 10,
      marginBottom: 2
   },
   heartIcon: {
      fontSize: 26
   },
   foodTitle: {
      fontWeight: '300',
      fontSize: 20,
      textAlign: 'center',
      flex: 1,
      fontFamily: Platform.OS === 'android' ? 'sans-serif-light' : undefined
   },
   removeButton: {
      width: 32,
      height: 32,
      alignItems: 'center',
      justifyContent: 'center'
   },
   foodContainer: {
      backgroundColor: '#fff'
   },
   modal: {
      borderRadius: 2,
      margin: 20,
      padding: 14,
      backgroundColor: MKColor.Silver
   }
});

export default connect(
   undefined,
   dispatch => ({
      showModal: c => dispatch(showModal(c))
   })
)(Favorites);
