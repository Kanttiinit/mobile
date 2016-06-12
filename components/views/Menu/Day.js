import React from 'react';
import moment from 'moment';
import momentFI from 'moment/locale/fi';
import {connect} from 'react-redux';
import {colors, defaultStyles} from '../../../style';

import Restaurant from './Restaurant';

import {
   View,
   Text,
   ListView,
   Platform,
   StyleSheet,
   InteractionManager
} from 'react-native';

class Day extends React.Component {
   constructor() {
      super();
      this.dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      moment.locale('fi');
      this.state = {menu: {}};
   }
   shouldComponentUpdate(props) {
      if (props.currentView === 'RUOKALISTA') {
         return !this.props.date.isSame(props.date, 'day')
            || this.props.menus !== props.menus
            || !props.now.isSame(this.props.date, 'minute');
      }

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
                  <Text style={styles.date}> {date.format('D.M.')}</Text>
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
      marginBottom: 0,
      height: 50,
   },
   dayTitle: {
      fontSize: 20,
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

const mapState = state => ({
   currentView: state.misc.currentView,
   now: state.misc.now,
   menus: state.menus
});

export default connect(mapState)(Day);
