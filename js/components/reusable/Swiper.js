import React from 'react';
import {Dimensions, ListView, View, InteractionManager} from 'react-native';

const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class Swiper extends React.Component {
   constructor() {
      super();
      this.state = {width: Dimensions.get('window').width};
   }
   componentWillReceiveProps(props) {
      if (props.page !== this.page) {
         this.refs.scrollView.scrollTo({y: 0, x: props.page * this.state.width});
      }
   }
   render() {
      const {width} = this.state;
      const {children} = this.props;
      return (
         <ListView
            ref="scrollView"
            contentContainerStyle={{flex: 1}}
            horizontal={true}
            initialListSize={2}
            pageSize={1}
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={event => {
               clearTimeout(this.timeout);
               const offset = event.nativeEvent.contentOffset.x;
               this.timeout = setTimeout(() => {
                  this.page = Math.round(offset / width);
                  this.props.onPageChange(this.page);
               }, 100);
            }}
            dataSource={dataSource.cloneWithRows(children)}
            pagingEnabled={true}
            renderRow={child => <View style={{width}}>{child}</View>} />
      );
   }
}

Swiper.defaultProps = {
   onPageChange: () => undefined
};
