'use strict';

import React from 'react-native';
import moment from 'moment';
import momentFI from 'moment/locale/fi';
import {connect} from 'redux-nimble';
import {colors, defaultStyles} from '../../../style';

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
      this.state = {menu: {}};
   }
   shouldComponentUpdate(props) {
      if (props.currentView === 'RUOKALISTA')
         return !this.props.date.isSame(props.date, 'day') || this.state.menus !== props.menus || !props.now.isSame(this.props.date, 'minute');

      return false;
   }
   componentWillMount() {
      this.setState({menu: this.getMenu(this.props)});
   }
   componentWillReceiveProps(props) {
      if (props.currentView === 'RUOKALISTA' && props.menus) {
         InteractionManager.runAfterInteractions(() => {
            this.setState({menu: this.getMenu(props)});
         });
      }
   }
   getMenu(props) {
      return props.menus.find(m => m.date.isSame(props.date, 'day'));
   }
   render() {
      const {date} = this.props;
      const {menu} = this.state;

      return (
         <View style={{flex: 1}}>
            <View style={[defaultStyles.card, styles.daySelector]}>
               <Text style={styles.dayTitle}>
                  {date.format('dddd').toUpperCase()}
                  <Text style={styles.date}> {date.format('DD.MM.')}</Text>
               </Text>
            </View>
            <ListView
               initialListSize={1}
               pageSize={2}
               contentContainerStyle={{paddingVertical: 22}}
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
      alignItems: 'center',
      backgroundColor: colors.accent,
      marginBottom: 0
   },
   dayTitle: {
      fontSize: 18,
      fontWeight: '300',
      flexDirection: 'row',
      textAlign: 'center',
      flex: 1,
      color: 'white'
   },
   date: {
      color: 'rgba(255, 255, 255, 0.6)'
   }
});

export default connect(['currentView', 'now', 'menus'])(Day);
