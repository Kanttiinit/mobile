'use strict';

import React from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-simple-modal';
import {connect} from 'redux-nimble';

import Button from './components/Button';
import {colors} from './style';

import Menu from './components/views/Menu';
import Favorites from './components/views/Favorites';
import Restaurants from './components/views/Restaurants';
import Map from './components/views/Map';

const {
   StyleSheet,
   Text,
   View,
   Navigator,
   StatusBar,
   Platform,
   DeviceEventEmitter
} = React;

class TabButton extends React.Component {
   render() {
      const {data, changeScene, parent, current, icon} = this.props;
      const textColor = current ? colors.accent : '#666666';
      const backgroundColor = current ? '#e3e0e0' : colors.lightGrey;
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
   { title: 'RUOKALISTA', icon: 'android-restaurant', component: Menu },
   { title: 'SUOSIKIT', icon: 'android-favorite', component: Favorites },
   //{ title: 'KARTTA', icon: 'android-pin', component: Map},
   { title: 'RAVINTOLAT', icon: 'ios-list', component: Restaurants }
];

class Router extends React.Component {
   constructor() {
      super();
      this.state = {};

      if (Platform.OS === 'ios')
         StatusBar.setBarStyle('light-content');
   }
   changeScene(data) {
      try {
         this.refs.navigator.jumpTo(data);
      } catch(e) {
         this.refs.navigator.push(data);
      }
      this.props.changeView(data.title);
   }
   componentDidMount() {
      DeviceEventEmitter.addListener('keyboardDidShow', () => {
         this.setState({keyboardVisible: true});
      });
      DeviceEventEmitter.addListener('keyboardDidHide', () => {
         this.setState({keyboardVisible: false});
      });
   }
   render() {
      const {currentView, modal} = this.props;

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
               offset={this.state.keyboardVisible ? -100 : 0}
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
      borderTopColor: '#d7d7d7',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
   },
   tabButton: {
     flex: 1,
     padding: 8,
     alignItems: 'center'
   }
});

export default connect(['currentView', 'views', 'modal'], ['changeView', 'dismissModal'])(Router);
