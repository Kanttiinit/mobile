'use strict';

import React from 'react-native';
import Checkbox from '../../Checkbox';

const {
   View,
   Text
} = React;

export default class Restaurant extends React.Component {
   shouldComponentUpdate(props) {
      return props.restaurant.id !== this.props.restaurant.id || props.checked !== this.props.checked;
   }
   render() {
      const {restaurant, checkedChange, style, checked} = this.props;
      return (
         <View key={restaurant.id} style={style}>
            <Text style={{fontSize: 14, flex: 1}}>{restaurant.name}</Text>
            <Checkbox
               onCheckedChange={checked => checkedChange([restaurant], checked)}
               checked={checked} />
         </View>
      );
   }
}
