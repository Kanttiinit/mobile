import React from 'react';
import {connect} from 'react-redux';

import {openModal} from '../../../store/actions/modal';
import RestaurantDialog from './RestaurantDialog';

import Checkbox from '../../Checkbox';
import Button from '../../Button';

import {View, Text} from 'react-native';

class Restaurant extends React.Component {
   shouldComponentUpdate(props) {
      return props.restaurant.id !== this.props.restaurant.id || props.checked !== this.props.checked;
   }
   render() {
      const {restaurant, checkedChange, style, checked, showModal} = this.props;
      return (
         <View style={style}>
            <Button
               containerStyle={{flex: 1}}
               onPress={() => showModal(<RestaurantDialog restaurant={restaurant} />, {padding: 0})}>
               <Text style={{fontSize: 14, flex: 1}}>{restaurant.name}</Text>
            </Button>
            <Checkbox
               onCheckedChange={checked => checkedChange([restaurant], checked)}
               checked={checked} />
         </View>
      );
   }
}

const mapDispatch = dispatch => ({
   showModal(...args) {
      dispatch(openModal(...args));
   }
});

export default connect(null, mapDispatch)(Restaurant);
