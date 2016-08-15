import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-simple-modal';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {StyleSheet, Text, View, Navigator, Platform} from 'react-native';

import Button from './reusable/Button';
import LaunchScreen from './LaunchScreen';
import {setCurrentView} from '../store/actions/values';
import {dismissModal} from '../store/actions/modal';
import {selectLang} from '../store/selectors';
import Menu from './Menu';
import Favorites from './Favorites';
import Areas from './Areas';
import Map from './Map';

const views = [
  { key: 'menus', icon: 'md-restaurant', component: Menu },
  { key: 'favorites', icon: 'md-heart', component: Favorites },
  { key: 'map', icon: 'md-map', component: Map},
  { key: 'settings', icon: 'md-settings', component: Areas }
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

const NavBar = ({lang, currentView, changeScene, initializing}) => {
  return (
    <View style={styles.tabBar}>
      {views.map(v =>
        <TabButton
          color={currentView === v.key ? colors.accent : '#b0b0b0'}
          style={{backgroundColor: currentView === v.key ? '#f8f8f8' : colors.lightGrey}}
          onPress={() => changeScene(v)}
          icon={v.icon}
          key={v.key}
          title={translations[v.key][lang]} />
      )}
      {initializing && <View style={[defaultStyles.overlay, {backgroundColor: colors.grey}]} />}
    </View>
  );
};

class Router extends React.Component {
  changeScene(data) {
    try {
      this.refs.navigator.jumpTo(data);
    } catch(e) {
      this.refs.navigator.push(data);
    }
    this.props.setCurrentView(data.key);
  }
  render() {
    const {lang, currentView, modal, keyboardVisible, initializing} = this.props;

    return (
      <View style={styles.wrapper}>
        {Platform.OS === 'ios' ? <View style={{height:20, backgroundColor:colors.accent}}></View> : null}
        <Navigator
          ref="navigator"
          style={{flex: 1}}
          initialRoute={views[0]}
          initialRouteStack={views}
          renderScene={route => React.createElement(route.component)} />
        {initializing && <LaunchScreen />}
        <NavBar
          lang={lang}
          initializing={initializing}
          changeScene={this.changeScene.bind(this)}
          currentView={currentView} />
        <Modal
          modalStyle={modal.style}
          open={modal.visible}
          offset={keyboardVisible ? -100 : 0}
          modalDidClose={() => this.props.dismissModal()}>
          {modal.component}
        </Modal>
      </View>
    );
  }
}

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
