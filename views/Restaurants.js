'use strict';

import React from 'react-native';
import Material from 'react-native-material-kit';
import RestaurantsManager from '../managers/Restaurants';
import Service from '../managers/Service';
const {
   Component,
   Text,
   ScrollView,
   View,
   StyleSheet
} = React;

const {
   MKColor,
   MKCardStyles,
   MKButton,
   mdl
} = Material;

class Area extends Component {
   constructor() {
      super();
      this.state = {};
   }
   componentDidMount() {
      RestaurantsManager.getSelectedRestaurants()
      .then(selected => this.setState({selected}));
   }
   checkedChange(restaurant, state) {
      if (state.checked)
         RestaurantsManager.selectRestaurant(restaurant);
      else
         RestaurantsManager.deselectRestaurant(restaurant);
   }
   render() {
      const {area} = this.props;
      const {selected} = this.state;
      if (selected)
         return (
            <View style={[MKCardStyles.card]}>
               <View style={styles.area}>
                  <Text style={styles.areaTitle}>{area.name}</Text>
               </View>
               {area.Restaurants.sort((a, b) => a.name > b.name ? 1 : -1).map((r, i) =>
                  <View key={r.id} style={[styles.restaurant, i > 0 && styles.borderTop]}>
                     <Text style={{fontSize: 14, flex: 1}}>{r.name}</Text>
                     <mdl.Switch
                        trackSize={12}
                        trackLength={32}
                        thumbRadius={10}
                        thumbOnColor={MKColor.Teal}
                        onColor="rgba(5, 182, 166, 0.5)"
                        onCheckedChange={this.checkedChange.bind(this, r)}
                        checked={!!selected.find(id => id === r.id)} />
                  </View>
               )}
            </View>
         );

      return <mdl.Spinner />
   }
}

class Restaurants extends Component {
   constructor() {
      super();
      this.state = {areas: []};
   }
   componentDidMount() {
      this.props.events.on('RAVINTOLAT', () => {
         if (!this.state.areas.length)
            Service.getAreas()
            .then(areas => this.setState({areas}));
      });
   }
   render() {
      return (
         <View style={styles.container}>
            <ScrollView style={{padding: 14}}>
               {this.state.areas.map(area => <Area key={area.id} area={area} />)}
            </ScrollView>
         </View>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: MKColor.Silver,
      paddingBottom: 14
   },
   area: {
      padding: 8,
      backgroundColor: MKColor.Teal
   },
   areaTitle: {
      fontSize: 20,
      color: '#fff'
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
