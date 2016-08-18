// @flow
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {View, Text} from 'react-native';

import Button from './reusable/Button';
import {setSelectedRestaurants} from '../store/actions/preferences';
import {selectLang} from '../store/selectors';
import {colors, spaces, defaultStyles} from '../utils/style';
import translations from '../utils/i18n';

const AreaSelector = ({areas, lang, setSelectedRestaurants}) => (
  <View style={{justifyContent: 'center', flex: 1}}>
    <Text style={[defaultStyles.bigText, {textAlign: 'center', padding: spaces.big, marginBottom: spaces.medium}]}>
      {translations.beginMessage[lang]}
    </Text>
    {areas.map(a =>
      <Button
        key={a.id}
        onPress={() => setSelectedRestaurants(a.restaurants.map(r => r.id), true)}
        style={[defaultStyles.button, {padding: spaces.big, marginVertical: spaces.small, marginHorizontal: spaces.medium}]}>
        <Text
          style={[defaultStyles.bigText, {color: colors.white}]}>
          {a.name}
        </Text>
      </Button>
    )}
    <Text
      style={[defaultStyles.smallText, {textAlign: 'center', marginTop: spaces.medium}]}>
      {translations.changeSettingsLaterText[lang]}
    </Text>
  </View>
);

const mapState = state => ({
  areas: state.data.areas || [],
  lang: selectLang(state)
});

const mapDispatch = dispatch => bindActionCreators({setSelectedRestaurants}, dispatch);

export default connect(mapState, mapDispatch)(AreaSelector);
