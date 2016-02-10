'use strict';

import React from 'react-native';
import {
   MKButton
} from 'react-native-material-kit';
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';

const {
   View,
   Text,
   StyleSheet,
   Platform
} = React;

export default class Favorite extends React.Component {
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

const styles = StyleSheet.create({
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
   }
});
