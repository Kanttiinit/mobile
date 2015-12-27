'use strict';

import React from 'react-native';
import Material from 'react-native-material-kit';
import Menu from './views/Menu';
import Favorites from './views/Favorites';
import Restaurants from './views/Restaurants';
import Icon from 'react-native-vector-icons/Ionicons';

const {
   AppRegistry,
   StyleSheet,
   Text,
   View,
   Navigator,
   TouchableHighlight,
   StatusBarIOS,
   Platform,
   BackAndroid
} = React;

const {
   MKButton,
   MKColor
} = Material;

class TabButton extends React.Component {
   render() {
      const {data, changeScene, parent, current, icon} = this.props;
      const textColor = current ? MKColor.Teal : '#666666';
      const backgroundColor = current ? '#e3e0e0' : MKColor.Silver;
      return (
         <MKButton
            rippleColor="rgba(0, 150, 136, 0.1)"
            backgroundColor={backgroundColor}
            onPress={() => changeScene(data)} style={styles.tabButton}>
            <Icon name={icon} size={18} color={textColor} />
            <Text style={{fontSize: 12, color: textColor}}>{data.title}</Text>
         </MKButton>
      );
   }
}

class Kanttiinit extends React.Component {
   constructor() {
      super();
      this.events = {
         eventListeners: [],
         on(event, cb) {
            this.eventListeners.push({event, cb});
         },
         fire(event, data) {
            this.eventListeners.filter(l => l.event === event).forEach(l => l.cb(data));
         }
      };
      this.state = {
         views: [
            { title: 'MENU', icon: 'android-restaurant', component: React.createElement(Menu, {events: this.events}) },
            { title: 'SUOSIKIT', icon: 'android-favorite', component: React.createElement(Favorites, {events: this.events}) },
            { title: 'RAVINTOLAT', icon: 'ios-list', component: React.createElement(Restaurants, {events: this.events}) }
         ],
         currentView: 'MENU'
      };

      Platform.OS == 'ios' && StatusBarIOS.setStyle('light-content');
   }
   componentDidMount() {
      this.refs.navigator.navigationContext.addListener('didfocus', event => {
         this.events.fire(event.data.route.title);
      });

      BackAndroid.addEventListener('hardwareBackPress', () => {
         if (this.state.currentView !== 'MENU') {
            this.changeScene(this.state.views[0]);
            return true;
         }
         return false;
      });
   }
   changeScene(data) {
      this.refs.navigator.jumpTo(data);
      this.setState({currentView: data.title});
   }
   renderScene(route, navigator) {
      return route.component;
   }
   render() {
      return (
         <View style={styles.wrapper}>
            {Platform.OS === 'ios' ? <View style={{height:20, backgroundColor:MKColor.Teal}}></View> : null}
            <Navigator
               ref="navigator"
               style={{flex: 1}}
               initialRoute={this.state.views[0]}
               initialRouteStack={this.state.views}
               renderScene={this.renderScene} />
            <View style={styles.tabBar}>
               {this.state.views.map(v =>
                  <TabButton
                     ref={'tabButton' + v.title}
                     current={this.state.currentView === v.title}
                     changeScene={this.changeScene.bind(this)}
                     icon={v.icon}
                     key={v.title}
                     data={v} />
               )}
            </View>
         </View>
      );
   }
};

const styles = StyleSheet.create({
   wrapper: {
      flex: 1,
      backgroundColor: MKColor.Silver
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

export default Kanttiinit;
