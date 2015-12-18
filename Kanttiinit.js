'use strict';

import React from 'react-native';
import Material from 'react-native-material-kit';
import Menu from './views/Menu';
import Favourites from './views/Favourites';
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
      return (
         <MKButton
            backgroundColor={current ? '#00796B' : MKColor.Grey}
            onPress={() => changeScene(data)} style={styles.tabButton}>
            <Icon name={icon} size={18} color={current ? '#fff' : MKColor.Silver} />
            <Text style={{fontSize: 12, color: current ? '#fff' : MKColor.Silver}}>{data.title}</Text>
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
            { title: 'SUOSIKIT', icon: 'android-favorite', component: React.createElement(Favourites, {events: this.events}) },
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
      this.events.fire('MENU');

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
         <View style={[styles.wrapper, Platform.OS === 'ios' && {paddingTop: 24}]}>
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
      backgroundColor: MKColor.Teal
   },
   tabBar: {
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
