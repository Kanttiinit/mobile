'use strict';

import React from 'react-native';
import Material from 'react-native-material-kit';
import Service from '../Service';
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
      Service.getSelectedRestaurants()
      .then(selected => this.setState({selected}));
   }
   checkedChange(restaurant, state) {
      if (state.checked)
         Service.selectRestaurant(restaurant);
      else
         Service.deselectRestaurant(restaurant);
   }
   onShow() {
      console.log('showed');
   }
   render() {
      const {area} = this.props;
      const {selected} = this.state;
      if (selected)
         return (
            <View style={[MKCardStyles.card, styles.area]}>
               <Text style={styles.areaTitle}>{area.name}</Text>
               {area.Restaurants.sort((a, b) => a.name > b.name ? 1 : -1).map(r =>
                  <View key={r.id} style={styles.restaurant}>
                     <Text style={{fontSize: 20, flex: 1}}>{r.name}</Text>
                     <mdl.Switch
                        thumbOnColor={MKColor.Teal}
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
      Service.getAreas()
      .then(areas => this.setState({areas}));
   }
   render() {
      return (
         <ScrollView style={styles.container}>
            {this.state.areas.map(area => <Area key={area.id} area={area} />)}
         </ScrollView>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: MKColor.Silver,
      padding: 14
   },
   area: {
      padding: 10
   },
   areaTitle: {
      fontSize: 28,
      fontWeight: '300',
      marginBottom: 5
   },
   restaurant: {
      padding: 6,
      flexDirection: 'row',
      alignItems: 'center'
   }
});

export default Restaurants;
