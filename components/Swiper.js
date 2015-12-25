'use strict';

import React from 'react-native';

const {
   Component,
   Dimensions,
   Platform,
   ScrollView,
   View,
   ViewPagerAndroid
} = React;

class Swiper extends Component {
   constructor() {
      super();
      this.state = {width: Dimensions.get('window').width};
   }
   render() {
      const {width} = this.state;
      if (Platform.OS === 'ios')
         return (
            <ScrollView
               contentContainerStyle={{flex: 1}}
               horizontal={true}
               showsHorizontalScrollIndicator={false}
               pagingEnabled={true}>
               {this.props.children.map((c, i) =>
                  <View key={i} style={{width}}>
                     {c}
                  </View>
               )}
            </ScrollView>
         );

      return (
         <ViewPagerAndroid style={{flex: 1}}>
            {this.props.children}
         </ViewPagerAndroid>
      );
   }
}

export default Swiper;
