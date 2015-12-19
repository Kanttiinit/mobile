'use strict';

import React from 'react-native';
import Material from 'react-native-material-kit';
import Favorite from '../managers/Favorite';
import Modal from 'react-native-modalbox';
import Icon from 'react-native-vector-icons/Ionicons';
import Loader from '../components/Loader';
import Swipeout from 'react-native-swipeout';

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

var removeFavoriteBtn = [
  {
    text: 'Poista',
    backgroundColor: MKColor.Red
  }
]

class Food extends Component {
   render() {
      const {favorite, style} = this.props;
      return (
         <View style={[MKCardStyles.card, style]}>
         <Swipeout style={styles.swipeOut} right={removeFavoriteBtn}>
            <View style={styles.food}>
               <Text style={styles.foodTitle} key={favorite.name}>
                  {favorite.name}
               </Text>
            </View>
         </Swipeout>
         </View>
      );
   }
}

class Favourites extends Component {
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
   closeModal() {
      this.refs.modal.close();
   }
   addFavorite(name) {
      this.closeModal();
      Favorite.addFavorite(name)
      .then(() => this.updateFavorites());
   }
   removeFavorite(name) {
      console.log(name);
   }
   updateFavorites() {
      Favorite.getStoredFavorites()
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
                     return <Food style={{marginBottom: lastRow ? 86 : 2}} favorite={fav} />
                  }}
                  style={styles.favoriteList}
                  scrollsToTop={true} />
               : <Loader color={MKColor.Teal} />}

               <MKButton
                  style={styles.fab}
                  fab={true}
                  onPress={this.openModal.bind(this)}>
                  <Icon name='plus-round' size={22} color={MKColor.Silver} />
               </MKButton>

               <Modal ref="modal" style={styles.modal} swipeToClose={false} onClosed={this.onClose}
                  onOpened={this.onOpen} onClosingState={this.onClosingState}>
                  <Text style={styles.modalTitle}>Uusi suosikki</Text>
                  <MKTextField
                     clearButtonMode='while-editing'
                     ref="favoriteName"
                     tintColor={MKColor.Teal}
                     textInputStyle={{color: MKColor.Black, fontSize: 18}}
                     floatingLabelEnabled={true}
                     onChangeText={(text) => this.setState({text})}
                     style={styles.textField}
                     placeholder="Ruoan nimi">
                  </MKTextField>
                  <MKButton
                     style={styles.addButton}
                     onPress={this.addFavorite.bind(this, this.state.text)}>
                     <Icon name='plus-round' size={22} color={MKColor.Silver} />
                  </MKButton>
               </Modal>
            </View>
         );
      }
   }

   const styles = StyleSheet.create({
      container: {
         flex: 1,
         backgroundColor: MKColor.Silver,
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
         width: 300,
         padding: 4,
         shadowColor: 'black',
         backgroundColor: MKColor.Teal,
         justifyContent: 'center',
         alignItems: 'center'
      },
      foodTitle: {
         fontSize: 20,
         paddingBottom: 4
      },
      food: {
         backgroundColor: '#fff',
         padding: 10
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
         margin: 10,
         color: "black",
         fontSize: 22
      },
      textField: {
         width: 200,
         height: 60
      }
   });

   export default Favourites;
