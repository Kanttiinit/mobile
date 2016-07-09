import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {View, Text, StyleSheet, Platform} from 'react-native';

import {setIsSelected} from '../store/actions/favorites';
import Button from './reusable/Button';

class Favorite extends React.Component {
   shouldComponentUpdate(props) {
      return props.favorite.name !== this.props.favorite.name
         || props.favorite.selected !== this.props.favorite.selected;
   }
   toggle() {
      const {favorite, setIsSelected} = this.props;
      setIsSelected(favorite.id, !favorite.selected);
   }
   render() {
      const {favorite} = this.props;
      return (
         <Button
            style={styles.favorite}
            onPress={this.toggle.bind(this)}>
            <Icon
               size={24}
               color={favorite.selected ? colors.red : colors.grey}
               name={'md-heart' + (favorite.selected ? '' : '-outline')} />
            <Text style={styles.foodTitle}>{favorite.name}</Text>
         </Button>
      );
   }
}

const mapDispatch = dispatch => bindActionCreators({setIsSelected}, dispatch);

export default connect(null, mapDispatch)(Favorite);

const styles = StyleSheet.create({
   favorite: {
      backgroundColor: '#fff',
      flexDirection: 'row',
      paddingLeft: spaces.big,
      paddingVertical: spaces.medium,
      marginBottom: 2
   },
   foodTitle: {
      fontWeight: '300',
      fontSize: 20,
      marginLeft: spaces.big,
      flex: 1,
      fontFamily: Platform.OS === 'android' ? 'sans-serif-light' : undefined
   }
});
