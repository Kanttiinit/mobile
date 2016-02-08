'use strict';

import React from 'react-native';
import {
   MKButton,
   MKColor
} from 'react-native-material-kit';
import FavoritesManager from '../managers/Favorites';
import Icon from 'react-native-vector-icons/Ionicons';
import Loader from '../components/Loader';
import {connect} from 'react-redux';

import {showModal} from '../store/actions';

import Favorite from './Favorites/Favorite';
import FavoriteModal from './Favorites/Modal';

const {
   View,
   Text,
   ScrollView,
   StyleSheet
} = React;

class Favorites extends React.Component {
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
   }
});

export default connect(
   undefined,
   dispatch => ({
      showModal: c => dispatch(showModal(c))
   })
)(Favorites);
