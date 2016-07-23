import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-simple-modal';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {StyleSheet, Text, View, Navigator, Platform, DeviceEventEmitter} from 'react-native';

import Button from './reusable/Button';
import LaunchScreen from './LaunchScreen';
import {setCurrentView} from '../store/actions/values';
import {dismissModal} from '../store/actions/modal';
import Menu from './Menu';
import Favorites from './Favorites';
import Areas from './Areas';
// import Map from './components/Map';


class TabButton extends React.Component {
   render() {
      const {data, changeScene, parent, current, icon} = this.props;
      const textColor = current ? colors.accent : '#b0b0b0';
      const backgroundColor = current ? '#f8f8f8' : colors.lightGrey;
      return (
         <Button
            onPress={() => changeScene(data)}
            containerStyle={{flex: 1}}
            style={[styles.tabButton, {backgroundColor}]}>
            <Icon name={icon} size={18} color={textColor} />
            <Text style={{fontSize: 12, color: textColor}}>{data.title}</Text>
         </Button>
      );
   }
}

const views = [
   { title: 'Ruokalista', icon: 'md-restaurant', component: Menu },
   { title: 'Suosikit', icon: 'md-heart', component: Favorites },
   //{ title: 'KARTTA', icon: 'android-pin', component: Map},
   { title: 'Ravintolat', icon: 'ios-list', component: Areas }
];

class Router extends React.Component {
   changeScene(data) {
      try {
         this.refs.navigator.jumpTo(data);
      } catch(e) {
         this.refs.navigator.push(data);
      }
      this.props.setCurrentView(data.title);
   }
   render() {
      const {currentView, modal, keyboardVisible, initializing} = this.props;
      if (initializing) {
         return <LaunchScreen />;
      }

      return (
         <View style={styles.wrapper}>
            {Platform.OS === 'ios' ? <View style={{height:20, backgroundColor:colors.accent}}></View> : null}
            <Navigator
               ref="navigator"
               style={{flex: 1}}
               initialRoute={views[0]}
               initialRouteStack={views}
               renderScene={route => React.createElement(route.component)} />
            <View style={styles.tabBar}>
               {views.map(v =>
               <TabButton
                  current={currentView === v.title}
                  changeScene={this.changeScene.bind(this)}
                  icon={v.icon}
                  key={v.title}
                  data={v} />
               )}
            </View>
            <Modal
               ref="modal"
               style={modal.style}
               open={modal.visible}
               offset={keyboardVisible ? -100 : 0}
               modalDidClose={() => this.props.dismissModal()}>
               {modal.component}
            </Modal>
         </View>
      );
   }
};

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
   keyboardVisible: state.value.keyboardVisible
});

const mapDispatch = dispatch => bindActionCreators({dismissModal, setCurrentView}, dispatch);

export default connect(mapState, mapDispatch)(Router);
