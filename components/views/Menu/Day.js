'use strict';

import React from 'react-native';
import moment from 'moment';
import momentFI from 'moment/locale/fi';
import {connect} from 'react-redux';

import Restaurant from './Restaurant';

const {
   View,
   Text,
   ListView,
   Component,
   Platform,
   StyleSheet,
   InteractionManager
} = React;

class Day extends Component {
   constructor() {
      super();
      this.dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      moment.locale('fi');
      this.state = {};
   }
   componentWillMount() {
      this.setState({menu: this.props.menu});
   }
   shouldComponentUpdate(props) {
      if (props.currentView === 'MENU')
         return !this.props.date.isSame(props.date, 'day') || this.state.menu !== props.menu;

      return false;
   }
   componentWillReceiveProps(props) {
      if (props.currentView === 'MENU') {

         if (this.props.viewChanges !== props.viewChanges && this.props.currentView === 'MENU')
            this.refs.list.scrollTo({y: 0});
         
         InteractionManager.runAfterInteractions(() => {
            this.setState({menu: props.menu});
         });
      }
   }
   render() {
      const {date} = this.props;
      const {menu} = this.state;

      return (
         <View style={{flex: 1}}>
            <View style={styles.daySelector}>
               <Text style={styles.dayTitle}>
                  {date.format('dddd').toUpperCase()}
                  <Text style={styles.date}> {date.format('DD.MM.')}</Text>
               </Text>
            </View>
            <ListView
               ref="list"
               initialListSize={1}
               pageSize={2}
               dataSource={this.dataSource.cloneWithRows(menu.restaurants)}
               renderRow={restaurant =>
                  <Restaurant date={date} restaurant={restaurant} />} />
         </View>
      );
   }
}

const styles = StyleSheet.create({
   daySelector: {
      flexDirection: 'row',
      paddingVertical: 10,
      alignItems: 'center'
   },
   dayTitle: {
      fontSize: 18,
      fontWeight: '300',
      fontFamily: Platform.OS === 'android' ? 'sans-serif-light' : undefined,
      flexDirection: 'row',
      textAlign: 'center',
      flex: 1
   },
   date: {
      color: '#bababa'
   }
});

export default connect(
   (state, props) => ({
      viewChanges: state.viewChanges,
      currentView: state.currentView,
      menu: state.menus.find(m => m.date.isSame(props.date, 'day'))
   })
)(Day);
