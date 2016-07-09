import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Loader from '../reusable/Loader';
import {connect} from 'react-redux';

import {colors} from '../../style';

import Favorite from './Favorites/Favorite';
import Button from '../reusable/Button';

import {View, Text, ScrollView, StyleSheet, LayoutAnimation, UIManager} from 'react-native';

UIManager.setLayoutAnimationEnabledExperimental
   && UIManager.setLayoutAnimationEnabledExperimental(true);

class Favorites extends React.Component {
   componentWillReceiveProps() {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
   }
   render() {
      const {favorites, loading} = this.props;
      if (loading) {
         return <Loader />;
      }

      return (
         <View style={styles.container}>
            {favorites ?
            <ScrollView
               style={styles.favoriteList}>
               {favorites.map(favorite =>
               <Favorite key={favorite.id} favorite={favorite} />
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

const mapState = state => ({
   favorites: state.favorites.items,
   loading: state.favorites.loading
});

export default connect(mapState)(Favorites);
