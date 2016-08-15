import React from 'react';
import Loader from './reusable/Loader';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ScrollView, View, Text, StyleSheet} from 'react-native';

import {openModal} from '../store/actions/modal';
import {setLang} from '../store/actions/preferences';
import {selectLang} from '../store/selectors';
import Area from './Area';
import Button from './reusable/Button';
import Dropdown from './reusable/Dropdown';
import ContactForm from './reusable/ContactForm';

const Settings = ({openModal, setLang, lang, areas, loading}) => (
  <View style={styles.container}>
    <ScrollView>
      <View style={[styles.settingGroup, {zIndex: 999}]}>
        <Text style={styles.settingsHeader}>Yleiset</Text>
        <View style={styles.setting}>
          <Text style={styles.settingLabel}>Kieli</Text>
          <Dropdown
            options={[{value: 'fi', label: 'Suomi'}, {value: 'en', label: 'English'}]}
            selected={lang}
            onSelect={value => setLang(value)}
            />
        </View>
      </View>
      <View style={styles.settingGroup}>
        <Text style={styles.settingsHeader}>Ravintolat</Text>
          <Button
            onPress={() => openModal(<ContactForm type="missing-restaurant">Mikä ravintola puuttuu?</ContactForm>)}
            style={[defaultStyles.button, {padding: spaces.medium, margin: spaces.medium}]}>
            <Text style={{color: colors.white, fontSize: 14, textAlign: 'center'}}>ILMOITA PUUTTUVASTA RAVINTOLASTA</Text>
          </Button>
          { loading || !areas ? <Loader color={colors.accent}/> :
          areas.map((area) =>
            <View style={styles.setting} key={area.id}>
              <Area area={area} />
            </View>
          )
          }
      </View>
    </ScrollView>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGrey
  },
  settingsHeader: {
    fontSize: 18
  },
  settingGroup: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginBottom: 8,
    backgroundColor: 'white'
  },
  setting: {
    fontSize: 16,
    marginVertical: 2,
    paddingVertical: 8,
    color: '#535353'
  },
  settingLabel: {
    marginVertical: 4
  }
});

const mapState = state => ({
  areas: state.data.areas,
  loading: state.pending.areas,
  lang: selectLang(state)
});

const mapDispatch = dispatch => bindActionCreators({openModal, setLang}, dispatch);

export default connect(mapState, mapDispatch)(Settings);
