import React from 'react';
import Loader from './reusable/Loader';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ScrollView, View, Text, StyleSheet} from 'react-native';

import {setLang} from '../store/actions/preferences';
import {selectLang} from '../store/selectors';
import Area from './Area';
import Dropdown from './reusable/Dropdown';
import ContactForm from './reusable/ContactForm';

const Settings = ({setLang, lang, areas, loading}) => (
  <ScrollView style={styles.container}>
    <View style={[styles.settingGroup, {zIndex: 999}]}>
      <Text style={defaultStyles.bigText}>{translations.general[lang]}</Text>
      <Text style={styles.settingLabel}>{translations.lang[lang]}</Text>
      <Dropdown
        value={lang}
        options={[{value: 'fi', label: 'Suomi'}, {value: 'en', label: 'English'}]}
        selected={lang}
        onSelect={value => setLang(value)} />
    </View>
    <View style={styles.settingGroup}>
      <Text style={defaultStyles.bigText}>{translations.restaurants[lang]}</Text>
      <ContactForm
        type="missing-restaurant"
        style={{marginVertical: spaces.medium}}
        label={translations.whichRestaurantIsMissing[lang] }/>
      {loading || !areas ? <Loader color={colors.accent}/> :
      areas.map(area => <Area key={area.id} area={area} />)}
    </View>
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGrey
  },
  settingGroup: {
    padding: spaces.medium,
    marginBottom: spaces.medium,
    backgroundColor: colors.white
  },
  settingLabel: {
    marginVertical: spaces.small
  }
});

const mapState = state => ({
  areas: state.data.areas,
  loading: state.pending.areas,
  lang: selectLang(state)
});

const mapDispatch = dispatch => bindActionCreators({setLang}, dispatch);

export default connect(mapState, mapDispatch)(Settings);
