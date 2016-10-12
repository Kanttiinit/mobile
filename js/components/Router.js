// @flow
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-simple-modal';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {StyleSheet, Text, View, Platform} from 'react-native';

import Button from './reusable/Button';
import {setCurrentView} from '../store/actions/values';
import {dismissModal} from '../store/actions/modal';
import {selectLang} from '../store/selectors';
import Menu from './Menu';
import Favorites from './Favorites';
import Settings from './Settings';
import Map from './Map';
import {colors, spaces, defaultStyles} from '../utils/style';
import translations from '../utils/i18n';

const views = [
  { key: 'menus', icon: 'md-restaurant', component: Menu },
  { key: 'favorites', icon: 'md-heart', component: Favorites },
  //{ key: 'map', icon: 'md-map', component: React.createElement(Map) },
  { key: 'settings', icon: 'md-settings', component: Settings }
];


const TabButton = ({title, onPress, style, color, icon}) => (
  <Button
    onPress={() => onPress()}
    containerStyle={{flex: 1}}
    style={[styles.tabButton, style]}>
    <Icon name={icon} size={18} color={color} />
    <Text style={{fontSize: 12, color: color}}>{title}</Text>
  </Button>
);

const NavBar = ({lang, currentView, onButtonPress, initializing}) => (
  <View style={styles.tabBar}>
    {views.map(v =>
      <TabButton
        color={currentView === v.key ? colors.accent : '#b0b0b0'}
        style={{backgroundColor: currentView === v.key ? '#f8f8f8' : colors.lightGrey}}
        onPress={() => onButtonPress(v)}
        icon={v.icon}
        key={v.key}
        title={initializing ? null : translations[v.key][lang]} />
    )}
  </View>
);

const Router = ({lang, currentView, modal, keyboardVisible, initializing, setCurrentView, dismissModal}) => (
  <View style={styles.wrapper}>
    {Platform.OS === 'ios' ? <View style={{height:20, backgroundColor:colors.accent}}></View> : null}
    <View style={{flex: 1}}>
      {views.map(view =>
        <View
          key={view.key}
          pointerEvents={view.key === currentView ? 'auto' : 'none'}
          style={[styles.view, {opacity: view.key === currentView ? 1 : 0}]}>
          {React.createElement(view.component)}
        </View>
      )}
    </View>
    <NavBar
      lang={lang}
      initializing={initializing}
      onButtonPress={view => setCurrentView(view.key)}
      currentView={currentView} />
    <Modal
      modalStyle={modal.style}
      open={modal.visible}
      offset={keyboardVisible ? -100 : 0}
      modalDidClose={() => dismissModal()}>
      {modal.component}
    </Modal>
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.lightGrey
  },
  tabBar: {
    borderTopWidth: 1,
    borderTopColor: '#ececec',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  tabButton: {
    flex: 1,
    padding: spaces.medium,
    alignItems: 'center'
  },
  view: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  }
});

const mapState = state => ({
  currentView: state.value.currentView,
  views: state.value.views,
  initializing: state.value.initializing,
  modal: state.modal,
  keyboardVisible: state.value.keyboardVisible,
  lang: selectLang(state)
});

const mapDispatch = dispatch => bindActionCreators({dismissModal, setCurrentView}, dispatch);

export default connect(mapState, mapDispatch)(Router);
