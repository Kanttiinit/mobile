import React from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from '../../../store/actions/favorites';

import Button from '../../Button';

const {
   View,
   Text,
   StyleSheet,
   Platform
} = React;

class Favorite extends React.Component {
   shouldComponentUpdate(props) {
      return props.favorite.name !== this.props.favorite.name
         || props.favorite.selected !== this.props.favorite.selected;
   }
   toggle() {
      const {favorite, addFavorite, removeFavorite} = this.props;

      if (favorite.selected)
         removeFavorite(favorite.id);
      else
         addFavorite(favorite.id);
   }
   render() {
      const {favorite, addFavorite, removeFavorite} = this.props;
      return (
         <Button
            style={styles.favorite}
            onPress={this.toggle.bind(this)}>
            <Icon
               style={styles.heartIcon}
               color={favorite.selected ? '#fc5151' : '#999'}
               name={'android-favorite' + (favorite.selected ? '' : '-outline')} />
            <Text style={styles.foodTitle}>{favorite.name}</Text>
         </Button>
      );
   }
}

const mapDispatchToProps = bindActionCreators(actions);

export default connect(undefined, bindActionCreators)(Favorite);

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
