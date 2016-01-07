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
   componentDidMount() {
      if (this.iOS) {
         // implement
      } else {

      }
   }
   setPage(p) {
      if (this.iOS) {
         this.refs.scrollView.scrollTo(0, p * this.state.width);
      } else {
         this.refs.viewPager.setPage(p);
      }
   }
   onPageScroll(e) {

   }
   render() {
      const {width} = this.state;
      const {children} = this.props;
      if (this.iOS)
         return (
            <ScrollView
               ref="scrollView"
               contentContainerStyle={{flex: 1}}
               horizontal={true}
               showsHorizontalScrollIndicator={false}
               onMomentumScrollEnd={event => {
                  const page = Math.round(event.nativeEvent.contentOffset.x / this.state.width);
                  this.props.onPageChange(page);
               }}
               pagingEnabled={true}>
               {this.props.children.map((c, i) =>
                  <View key={i} style={{width}}>
                     {c}
                  </View>
               )}
            </ScrollView>
         );

      return (
         <ViewPagerAndroid
            onPageScroll={this.onPageScroll.bind(this)}
            ref="viewPager"
            style={{flex: 1}}>
            {this.props.children.map((c, i) => <View key={i}>{c}</View>)}
         </ViewPagerAndroid>
      );
   }
}

Swiper.defaultProps = {
   onPageChange: () => undefined
};

export default Swiper;
