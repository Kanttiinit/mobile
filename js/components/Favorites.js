// @flow
import React from 'react';
import Loader from './reusable/Loader';
import {connect} from 'react-redux';
import {View, ScrollView, LayoutAnimation, UIManager} from 'react-native';

import {formatFavorites} from '../store/selectors';
import Favorite from './Favorite';
import {colors} from '../utils/style';

UIManager.setLayoutAnimationEnabledExperimental
&& UIManager.setLayoutAnimationEnabledExperimental(true);

class Favorites extends React.Component {
  componentWillReceiveProps() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }
  render() {
    const {favorites, loading} = this.props;
    if (loading) {
      return <Loader />;
    }

    return (
      <View style={{flex: 1, backgroundColor: colors.lightGrey}}>
        {favorites ?
          <ScrollView
            style={{flex: 1}}>
            {favorites.map(favorite =>
              <Favorite key={favorite.id} favorite={favorite} />
            )}
          </ScrollView>
            : <Loader color={colors.accent} />}
      </View>
    );
  }
}

const mapState = state => ({
  favorites: formatFavorites(state),
  loading: state.pending.favorites
});

export default connect(mapState)(Favorites);
