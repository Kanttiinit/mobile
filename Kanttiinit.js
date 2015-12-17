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
   Platform
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
            backgroundColor={current ? MKColor.Teal : MKColor.Grey}
            onPress={() => changeScene(data)} style={styles.tabButton}>
            <Icon name={icon} size={24} color={MKColor.Silver} />
            <Text style={{fontSize: 14, color: MKColor.Silver}}>{data.title}</Text>
         </MKButton>
      );
   }
}

class Kanttiinit extends React.Component {
   constructor() {
      super();
      this.state = {};
      Platform.OS == 'ios' && StatusBarIOS.setStyle('light-content');
   }
   componentDidMount() {
      this.setState({
         views: [
            { title: 'MENU', icon: 'android-restaurant', component: React.createElement(Menu, {navigator: this.refs.navigator}) },
            { title: 'SUOSIKIT', icon: 'android-favorite', component: React.createElement(Favourites) },
            { title: 'RAVINTOLAT', icon: 'ios-list', component: React.createElement(Restaurants) }
         ]
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
      if (this.state.views)
         return (
            <View style={[styles.wrapper, Platform.OS === 'ios' && {paddingTop: 24}]}>
               <Navigator
                  ref="navigator"
                  style={{flex: 1}}
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

      return <View />;
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
     padding: 12,
     alignItems: 'center'
   }
});

export default Kanttiinit;
