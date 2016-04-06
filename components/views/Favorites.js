import React from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Loader from '../Loader';
import {connect} from 'redux-nimble';

import {colors} from '../../style';

import Favorite from './Favorites/Favorite';
import Button from '../Button';

const {
   View,
   Text,
   ListView,
   StyleSheet,
   LayoutAnimation,
   UIManager
} = React;

UIManager.setLayoutAnimationEnabledExperimental
   && UIManager.setLayoutAnimationEnabledExperimental(true);

class Favorites extends React.Component {
   constructor() {
      super();
      this.dataSource = new ListView.DataSource({
         rowHasChanged: (r1, r2) => r1 !== r2
      });
      this.state = {};
   }
   componentDidMount() {
      this.props.getFavorites();
   }
   componentWillReceiveProps() {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
   }
   render() {
      const {favorites} = this.props;

      return (
         <View style={styles.container}>
            {favorites ?
            <ListView
               style={styles.favoriteList}
               dataSource={this.dataSource.cloneWithRows(favorites)}
               renderRow={favorite => <Favorite favorite={favorite} />} />
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

export default connect(['favorites'], ['getFavorites'])(Favorites);
