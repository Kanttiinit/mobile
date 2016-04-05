'use strict';

import React from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'redux-nimble';

import Button from '../../Button';

const {
   View,
   Text,
   StyleSheet,
   Platform
} = React;

class Favorite extends React.Component {
   shouldComponentUpdate(props) {
      return props.favorite.name !== this.props.favorite.name || props.selected !== this.props.selected;
   }
   render() {
      const {favorite, selected, addFavorite, removeFavorite} = this.props;
      return (
         <Button style={styles.favorite} onPress={() => selected ? removeFavorite(favorite.id) : addFavorite(favorite.id)}>
            <Icon style={styles.heartIcon} color={selected ? '#fc5151' : '#999'} name={'android-favorite' + (selected ? '' : '-outline')} />
            <Text style={styles.foodTitle}>{favorite.name}</Text>
         </Button>
      );
   }
}

export default connect(undefined, ['addFavorite', 'removeFavorite'])(Favorite);

const styles = StyleSheet.create({
   favorite: {
      backgroundColor: '#fff',
      flexDirection: 'row',
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
      marginLeft: 15,
      flex: 1,
      fontFamily: Platform.OS === 'android' ? 'sans-serif-light' : undefined
   }
});
