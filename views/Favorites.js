'use strict';

import React from 'react-native';
import Material from 'react-native-material-kit';
import FavoritesManager from '../managers/Favorites';
import Modal from 'react-native-modalbox';
import Icon from 'react-native-vector-icons/Ionicons';
import Loader from '../components/Loader';

const {
   View,
   Text,
   ListView,
   StyleSheet,
   Component
} = React;

const {
   MKCardStyles,
   MKButton,
   MKTextField,
   MKColor
} = Material;

class Favorite extends Component {
   render() {
      const {favorite, parent, style} = this.props;
      return (
         <View style={[MKCardStyles.card, style]}>
            <View style={styles.food}>
               <Text style={styles.foodTitle}>
                  {favorite.name}
               </Text>
               <Icon style={styles.heartIcon} color='#fc5151' name='android-favorite' />
               <MKButton
                  style={styles.removeButton}
                  rippleColor='#fff'
                  onPress={parent.removeFavorite.bind(parent, favorite.name)}>
                  <Icon style={{fontSize: 26}} color='#8a8a8a' name='ios-close-empty' />
               </MKButton>
            </View>
         </View>
      );
   }
}

class Favorites extends Component {
   constructor() {
      super();
      this.state = {};
   }
   componentDidMount() {
      this.props.events.on('SUOSIKIT', () => {
         if (!this.state.favorites)
            this.updateFavorites();
      });
   }
   openModal() {
      this.refs.modal.open();
   }
   addFavorite(name) {
      if (name && name.length > 2) {
         this.refs.modal.close();
         FavoritesManager.addFavorite(name)
         .then(() => this.updateFavorites());
         this.setState({text: undefined});
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
         const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
         this.setState({favorites: dataSource.cloneWithRows(favorites)});
      })
      .catch(err => console.error(err));
   }
   render() {
      const {favorites} = this.state;
      return (
         <View style={styles.container}>
            {favorites ?
            <ListView
               dataSource={favorites}
               renderRow={(fav, sectionId, rowId) => {
                  const lastRow = rowId == favorites._cachedRowCount - 1;
                  return <Favorite style={{marginBottom: lastRow ? 96 : 2}} favorite={fav} parent={this}/>
               }}
               style={styles.favoriteList}
               scrollsToTop={true} />
            : <Loader color={MKColor.Teal} />}
            {favorites && !favorites._cachedRowCount ? <Text style={{alignSelf: 'center', flex: 1}}>Ei suosikkeja.</Text> : null}
            <MKButton
               style={styles.fab}
               fab={true}
               onPress={this.openModal.bind(this)}>
               <Icon name='plus-round' size={22} color={MKColor.Silver} />
            </MKButton>

            <Modal
               ref="modal"
               animationDuration={300}
               style={styles.modal}
               swipeToClose={false}>
               <View style={styles.modalTitle}><Text style={{fontSize: 18, textAlign: 'center'}}>Uusi suosikki</Text></View>
               <MKTextField
                  clearButtonMode='while-editing'
                  ref="favoriteName"
                  tintColor={MKColor.Teal}
                  textInputStyle={{color: MKColor.Black, fontSize: 18}}
                  floatingLabelEnabled={true}
                  onChangeText={text => this.setState({text})}
                  style={styles.textField}
                  placeholder="Ruoan nimi" />
               <MKButton
                  style={styles.addButton}
                  onPress={this.addFavorite.bind(this, this.state.text)}>
                  <Icon name='plus-round' size={22} color='#fff' />
               </MKButton>
            </Modal>
         </View>
      );
      }
   }

   const styles = StyleSheet.create({
      container: {
         flex: 1,
         backgroundColor: MKColor.Silver
      },
      newFood: {
         flexDirection: 'row'
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
      },
      addButton: {
         position: 'absolute',
         bottom: 0,
         left: 0,
         width: 300,
         height: 40,
         shadowColor: 'black',
         backgroundColor: MKColor.Teal,
         justifyContent: 'center',
         alignItems: 'center'
      },
      food: {
         backgroundColor: '#fff',
         padding: 14,
         position: 'relative'
      },
      heartIcon: {
         fontSize: 26,
         position: 'absolute',
         left: 14,
         top: 14
      },
      removeButton: {
         position: 'absolute',
         right: 14,
         top: 14
      },
      foodTitle: {
         fontSize: 20,
         textAlign: 'center'
      },
      foodContainer: {
         backgroundColor: '#fff'
      },
      modal: {
         alignItems: 'center',
         width: 300,
         height: 200
      },
      modalTitle: {
         marginBottom: 20,
         width: 300,
         padding: 8,
         backgroundColor: MKColor.Silver
      },
      textField: {
         width: 200
      }
   });

   export default Favorites;
