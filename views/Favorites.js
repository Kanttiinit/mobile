'use strict';

import React from 'react-native';
import Material from 'react-native-material-kit';
import FavoritesManager from '../managers/Favorites';
import Modal from '../components/Modal';
import Icon from 'react-native-vector-icons/Ionicons';
import Loader from '../components/Loader';

const {
   View,
   Text,
   ListView,
   StyleSheet,
   Component,
   DeviceEventEmitter
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
               <Icon style={styles.heartIcon} color='#fc5151' name='android-favorite' />
               <Text style={styles.foodTitle}>{favorite.name}</Text>
               <MKButton
                  style={styles.removeButton}
                  rippleColor='rgba(0, 0, 0, 0.25)'
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

      DeviceEventEmitter.addListener('keyboardDidShow', () => {
         this.refs.modal.animateOffset(-100);
      });
      DeviceEventEmitter.addListener('keyboardDidHide', () => {
         this.refs.modal.animateOffset(0);
      });
   }
   openModal() {
      this.refs.modal.open();
   }
   addFavorite() {
      const name = this.state.text;
      if (name && name.length > 2) {
         FavoritesManager.addFavorite(name)
         .then(() => this.updateFavorites());
         this.refs.modal.close();
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
      const {favorites, keyboard} = this.state;
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
               modalDidClose={this.addFavorite.bind(this)}
               style={styles.modal}>
               <View style={styles.modalTitle}><Text style={styles.modalTitleText}>Uusi suosikki</Text></View>
               <MKTextField
                  value={this.state.text}
                  clearButtonMode='while-editing'
                  highlightColor={MKColor.Teal}
                  textInputStyle={{color: MKColor.Black, fontSize: 18}}
                  floatingLabelEnabled={true}
                  onChangeText={text => this.setState({text})}
                  style={styles.textField}
                  placeholder="Ruoan nimi" />
               <MKButton
                  style={styles.addButton}
                  onPress={() => this.refs.modal.close()}>
                  <Text style={styles.addText}> LISÄÄ </Text>
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
      food: {
         backgroundColor: '#fff',
         flexDirection: 'row',
         justifyContent: 'center',
         alignItems: 'center',
         paddingRight: 10,
         paddingLeft: 15,
         paddingVertical: 10
      },
      heartIcon: {
         fontSize: 26
      },
      foodTitle: {
         fontWeight: '300',
         fontSize: 20,
         textAlign: 'center',
         flex: 1
      },
      removeButton: {
         width: 32,
         height: 32,
         alignItems: 'center',
         justifyContent: 'center'
      },
      foodContainer: {
         backgroundColor: '#fff'
      },
      modal: {
         borderRadius: 2,
         margin: 20,
         backgroundColor: MKColor.Silver
      },
      modalTitle: {
         borderRadius: 2,
         padding: 12
      },
      modalTitleText: {
         marginTop: 8,
         marginLeft: 8,
         color: 'black',
         fontSize: 18
      },
      textField: {
         height: 40,
         margin: 20,
         marginBottom: 40
      },
      addButton: {
         backgroundColor: MKColor.Teal,
         alignSelf: 'flex-end',
         borderRadius: 2,
         padding: 6,
         marginRight: 16,
         marginBottom: 16
      },
      addText: {
         color: 'white',
         fontWeight: 'bold',
         fontSize: 14
      }
   });

   export default Favorites;
