'use strict';

import React from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Loader from '../Loader';
import {connect} from 'react-redux';

import {getFavorites} from '../../store/actions';
import {colors} from '../../style';

import Favorite from './Favorites/Favorite';
import Button from '../Button';

const {
   View,
   Text,
   ScrollView,
   StyleSheet,
   LayoutAnimation,
   UIManager
} = React;

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

class Favorites extends React.Component {
   constructor() {
      super();
      this.state = {};
   }
   componentDidMount() {
      this.props.getFavorites();
   }
   componentWillReceiveProps() {
      LayoutAnimation.configureNext({
         duration: 500,
         create: {
            type: 'linear',
            property: 'opacity',
         },
         update: {
            type: 'spring',
            springDamping: 1,
         }
      });
   }
   getFormattedFavorites() {
      return this.props.favorites.map(f => ({
         ...f,
         selected: this.props.selectedFavorites.some(x => x === f.id)
      }))
      .sort((a, b) => {
         if (a.selected && !b.selected)
            return -1;
         else if (!a.selected && b.selected)
            return 1;

         return a.name > b.name ? 1 : -1;
      });
   }
   render() {
      const {favorites, selectedFavorites} = this.props;
      return (
         <View style={styles.container}>
            {favorites && selectedFavorites ?
               <ScrollView style={styles.favoriteList} scrollsToTop={true}>
                  {this.getFormattedFavorites().map(_ =>
                  <Favorite
                     selected={_.selected}
                     favorite={_}
                     key={_.id} />
                  )}
               </ScrollView>
            : <Loader color={colors.accent} />}
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
   }
});

export default connect(
   state => ({
      favorites: state.favorites,
      selectedFavorites: state.selectedFavorites
   }),
   dispatch => ({
      getFavorites: _ => dispatch(getFavorites())
   })
)(Favorites);
