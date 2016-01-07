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
      this.iOS = Platform.OS === 'ios';
   }
   setPage(p) {
      if (this.iOS) {
         // implement
      } else {
         this.refs.viewPager.setPage(p);
      }
   }
   render() {
      const {width} = this.state;
      if (this.iOS)
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
         <ViewPagerAndroid ref="viewPager" style={{flex: 1}}>
            {this.props.children.map((c, i) => <View key={i}>{c}</View>)}
         </ViewPagerAndroid>
      );
   }
}

export default Swiper;
