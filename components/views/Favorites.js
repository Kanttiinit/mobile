'use strict';

import React from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Loader from '../Loader';
import {connect} from 'react-redux';

import {showModal, removeFavorite, addFavorite, updateFavorites} from '../../store/actions';
import {colors} from '../../style';

import Favorite from './Favorites/Favorite';
import FavoriteModal from './Favorites/Modal';
import Button from '../Button';

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
   addFavorite(name) {
      if (name && name.length > 2) {
         this.props.addFavorite(name);
      }
   }
   removeFavorite(name) {
      this.props.removeFavorite(name);
   }
   render() {
      const {favorites} = this.props;
      const favoritesCount = favorites.length;
      return (
         <View style={styles.container}>
            {favorites ?
               <ScrollView style={styles.favoriteList} scrollsToTop={true}>
                  {favorites.map(fav => {
                     return <Favorite favorite={fav} key={fav.name} parent={this}/>
                  })}
                  <View style={{height: 100}}></View>
               </ScrollView>
            : <Loader color={colors.accent} />}
            {favorites && !favorites.length ? <Text style={{alignSelf: 'center', textAlign: 'center', width: 260, fontSize: 18, flex: 1, color: colors.grey}}>Lisää avainsana, esimerkiksi 'salaatti' tai 'pizza'.</Text> : null}
            <Button
               style={styles.fab}
               fab={true}
               onPress={() => this.props.showModal(<FavoriteModal onSelect={this.addFavorite.bind(this)} />)}>
               <Icon name='plus-round' size={22} color="white" />
            </Button>
         </View>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: colors.lightGrey
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
      borderRadius: 30,
      shadowRadius: 1,
      shadowOffset: {width: 0, height: .5},
      shadowOpacity: .4,
      shadowColor: 'black',
      backgroundColor: colors.accent,
      justifyContent: 'center',
      alignItems: 'center'
   }
});

export default connect(
   state => ({
      favorites: state.favorites
   }),
   dispatch => ({
      showModal: c => dispatch(showModal(c)),
      removeFavorite: name => dispatch(removeFavorite(name)),
      addFavorite: name => dispatch(addFavorite(name))
   })
)(Favorites);
