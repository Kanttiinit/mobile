import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Loader from './reusable/Loader';
import {connect} from 'react-redux';
import {View, Text, ScrollView, LayoutAnimation, UIManager} from 'react-native';

import Favorite from './Favorite';
import Button from './reusable/Button';

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
         <View style={{flex: 1, backgroundColor: colors.lightGrey}}>
            {favorites ?
            <ScrollView
               style={{flex: 1}}>
               {favorites.map(favorite =>
               <Favorite key={favorite.id} favorite={favorite} />
               )}
            </ScrollView>
            : <Loader color={colors.accent} />}
         </View>
      );
   }
}

const mapState = state => ({
   favorites: state.favorites.items,
   loading: state.favorites.loading
});

export default connect(mapState)(Favorites);
