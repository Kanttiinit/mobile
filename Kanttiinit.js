'use strict';

import React from 'react-native';
import Material from 'react-native-material-kit';
import Menu from './views/Menu';
import Favourites from './views/Favourites';
const {
   AppRegistry,
   StyleSheet,
   Text,
   View,
   Navigator,
   TouchableHighlight
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
            { title: 'Menu', component: Menu },
            { title: 'Favourites', component: Favourites },
            { title: 'Restaurants', component: null }
         ],
         currentView: 'Menu'
      };
   }
   changeScene(data) {
      this.refs.navigator.replace(data);
      this.setState({currentView: data.title});
   }
   renderScene(route, navigator) {
      return React.createElement(route.component);
   }
   render() {
      return (
         <View style={styles.wrapper}>
            <Navigator
               ref="navigator"
               initialRoute={this.state.views[0]}
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
      marginTop: 24,
      flex: 1
   },
   tabBar: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
   },
   tabButton: {
     flex: 1,
     padding: 20,
     alignItems: 'center'
   }
});

export default Kanttiinit;
