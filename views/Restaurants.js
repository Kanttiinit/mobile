'use strict';

import React from 'react-native';
import Material from 'react-native-material-kit';
import RestaurantsManager from '../managers/Restaurants';
import Service from '../managers/Service';
import Loader from '../components/Loader';
import HttpCache from '../managers/HttpCache';
import Checkbox from '../components/Checkbox';
const {
   Component,
   Text,
   ListView,
   View,
   StyleSheet,
   Platform
} = React;

const {
   MKColor,
   MKCardStyles,
   MKButton
} = Material;

class Area extends Component {
   constructor() {
      super();
      this.state = {};
   }
   componentDidMount() {
      this.update();
   }
   update() {
      return RestaurantsManager.getSelectedRestaurants()
      .then(selected => this.setState({selected}))
      .catch(err => console.error(err));
   }
   checkedChange(restaurant, checked) {
      RestaurantsManager.setSelected(restaurant, checked)
      .then(() => this.update()).catch(e => console.error(e));

      HttpCache.reset('menus');
   }
   areaCheckedChange(checked) {
      RestaurantsManager.setSelectedBatch(this.props.area.Restaurants, checked)
      .then(() => this.update());
   }
   areAllChecked() {
      return this.props.area.Restaurants.every(r => this.state.selected.indexOf(r.id) > -1);
   }
   render() {
      const {area} = this.props;
      const {selected} = this.state;
      if (selected)
         return (
            <View style={[MKCardStyles.card, styles.areaContainer]}>
               <View style={styles.area}>
                  <Text style={styles.areaTitle}>{area.name}</Text>
                  <Checkbox
                     color='#000'
                     checked={this.areAllChecked()}
                     onCheckedChange={this.areaCheckedChange.bind(this)} />
               </View>
               {area.Restaurants.sort((a, b) => a.name > b.name ? 1 : -1).map((r, i) =>
                  <View key={r.id} style={[styles.restaurant, i > 0 && styles.borderTop]}>
                     <Text style={{fontSize: 14, flex: 1}}>{r.name}</Text>
                     <Checkbox
                        onCheckedChange={this.checkedChange.bind(this, r)}
                        checked={!!selected.find(id => id === r.id)} />
                  </View>
               )}
            </View>
         );

      return <View />;
   }
}

class Restaurants extends Component {
   constructor() {
      super();
      this.state = {};
   }
   componentDidMount() {
      this.props.events.on('RAVINTOLAT', () => {
         if (!this.state.areas) {
            Service.getAreas()
            .then(areas => {
               const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
               this.setState({
                  areas: dataSource.cloneWithRows(areas)
               });
            })
            .catch(e => console.error(e));
         }
      });
   }
   render() {
      return (
         <View style={styles.container}>
            {this.state.areas ?
            <ListView
               dataSource={this.state.areas}
               renderRow={area => <Area area={area} />} />
            : <Loader color={MKColor.Teal} />}
         </View>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: MKColor.Silver
   },
   areaContainer: {
      margin: 14,
      marginBottom: 10,
      elevation: 2,
      borderWidth: 0,
      borderRadius: 2
   },
   area: {
      padding: 8,
      backgroundColor: MKColor.Teal,
      borderRadius: 2,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      flexDirection: 'row',
      alignItems: 'center'
   },
   areaTitle: {
      fontSize: 20,
      flex: 1,
      color: '#fff',
      fontWeight: '300',
      fontFamily: Platform.OS === 'android' ? 'sans-serif-light' : undefined
   },
   restaurant: {
      marginLeft: 6,
      marginRight: 6,
      flexDirection: 'row',
      alignItems: 'center'
   },
   borderTop: {
      borderTopWidth: 1,
      borderTopColor: '#eee'
   }
});

export default Restaurants;
