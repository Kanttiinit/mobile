// @flow
import React from 'react';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import {bindActionCreators} from 'redux';
import {View, Text, Switch} from 'react-native';

import {openModal} from '../store/actions/modal';
import {isSelectedRestaurant, isRestaurantFavorited} from '../store/selectors';
import {setFavoritedRestaurants, setSelectedRestaurants} from '../store/actions/preferences';
import RestaurantDialog from './RestaurantDialog';
import Button from './reusable/Button';
import {colors, spaces} from '../utils/style';

const Restaurant = ({restaurant, setSelectedRestaurants, setFavoritedRestaurants, style, selected, favorited, openModal}) => (
  <View style={[style, {paddingVertical: spaces.small}]}>
    <Button
      onPress={() => setFavoritedRestaurants([restaurant.id], !favorited)}
      style={{marginHorizontal: spaces.small}}>
      <Icon
        size={28}
        color={favorited ? colors.yellow : colors.grey}
        name={'md-star' + (!favorited ? '-outline' : '')} />
    </Button>
    <Button
      containerStyle={{flex: 1}}
      onPress={() => openModal(<RestaurantDialog restaurant={restaurant} />, {padding: 0})}>
      <Text style={{flex: 1, fontSize: 16}}>{restaurant.name}</Text>
    </Button>
    <Switch
      onValueChange={selected => setSelectedRestaurants([restaurant.id], selected)}
      value={selected} />
  </View>
);

const mapState = (state, props) => ({
  selected: isSelectedRestaurant(state, props),
  favorited: isRestaurantFavorited(state, props)
});

const mapDispatch = dispatch => bindActionCreators({openModal, setFavoritedRestaurants, setSelectedRestaurants}, dispatch);

export default connect(mapState, mapDispatch)(Restaurant);
