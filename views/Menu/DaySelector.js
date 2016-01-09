'use strict';

import React from 'react-native';
import Material from 'react-native-material-kit';
import Icon from 'react-native-vector-icons/Ionicons';


import moment from 'moment';
import momentFI from 'moment/locale/fi';

const {
   View,
   StyleSheet,
   Platform,
   Text
} = React;

const {
   MKButton,
   MKColor
} = Material;

const Button = props => (
   <MKButton
      onPress={() => props.onPress()}
      pointerEvents={props.visible ? 'auto' : 'none'}
      style={[styles.arrowButton, !props.visible && {opacity: 0}]}
      rippleColor="rgba(200, 200, 200, 0.25)">
      <Icon name={props.icon} color="#999" />
   </MKButton>
);

export default class DaySelector extends React.Component {
   constructor() {
      super();
      moment.locale('fi');

      this.state = { current: 0 };
   }
   shouldComponentUpdate(props, state) {
      return state.current !== this.state.current;
   }
   setCurrent(day) {
      this.setState({current: day});
   }
   change(p) {
      const current = Math.min(this.props.dates.length - 1, Math.max(0, this.state.current + p));
      this.props.onChange(current);
      this.setState({current});
   }
   render() {
      const {dates} = this.props;
      const {current} = this.state;
      const date = dates[current];
      const showPrevious = current > 0;
      const showNext = current < dates.length - 1;
      return (
         <View style={styles.daySelector}>
            <Button
               onPress={this.change.bind(this, -1)}
               icon="chevron-left"
               visible={showPrevious} />
            <Text style={styles.dayTitle}>
               {date.format('dddd').toUpperCase()}
               <Text style={styles.date}> {date.format('DD.MM.')}</Text>
            </Text>
            <Button
               onPress={this.change.bind(this, 1)}
               icon="chevron-right"
               visible={showNext} />
         </View>
      );
   }
}

const styles = StyleSheet.create({
   daySelector: {
      flexDirection: 'row',
      paddingHorizontal: 14,
      paddingVertical: 8,
      alignItems: 'center'
   },
   dayTitle: {
      fontSize: 20,
      fontWeight: '300',
      fontFamily: Platform.OS === 'android' ? 'sans-serif-light' : undefined,
      flexDirection: 'row',
      textAlign: 'center',
      flex: 1
   },
   arrowButton: {
      width: 32,
      height: 32,
      alignItems: 'center',
      justifyContent: 'center'
   },
   date: {
      color: '#bababa'
   }
});
