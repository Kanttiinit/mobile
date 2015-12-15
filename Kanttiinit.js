'use strict';

import React from 'react-native';
import Material from 'react-native-material-kit';
import Menu from './views/Menu';
import Favourites from './views/Favourites';
import Restaurants from './views/Restaurants';
const {
   AppRegistry,
   StyleSheet,
   Text,
   View,
   Navigator,
   TouchableHighlight,
   Platform
} = React;

const {
   MKButton,
   MKColor
} = Material;

class TabButton extends React.Component {
   render() {
      const {data, changeScene, parent, current} = this.props;
      return (
         <MKButton
            backgroundColor={current ? MKColor.Teal : MKColor.Grey}
            onPress={() => changeScene(data)} style={styles.tabButton}>
            <Text style={{fontSize: 14, color: MKColor.Silver}}>{data.title}</Text>
         </MKButton>
      );
   }
}

class Kanttiinit extends React.Component {
   constructor() {
      super();
      this.state = {
         views: [
            { title: 'MENU', component: Menu },
            { title: 'SUOSIKIT', component: Favourites },
            { title: 'RAVINTOLAT', component: Restaurants }
         ],
         currentView: 'Menu'
      };
   }
   componentDidMount() {
      console.log(Navigator.SceneConfigs);
      this.changeScene(this.state.views[0]);
   }
   changeScene(data) {
      this.refs.navigator.jumpTo(data);
      this.setState({currentView: data.title});
   }
   renderScene(route, navigator) {
      return React.createElement(route.component);
   }
   render() {
      return (
         <View style={[styles.wrapper, Platform.OS === 'ios' && {paddingTop: 24}]}>
            <Navigator
               ref="navigator"
               initialRouteStack={this.state.views}
               renderScene={this.renderScene} />
            <View style={styles.tabBar}>
               {this.state.views.map(v =>
                  <TabButton
                     current={this.state.currentView === v.title}
                     changeScene={this.changeScene.bind(this)}
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
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
   },
   tabButton: {
     flex: 1,
     padding: 16,
     alignItems: 'center'
   }
});

export default Kanttiinit;
