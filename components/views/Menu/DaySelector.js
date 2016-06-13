import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import {colors} from '../../../style';

import Button from '../../Button';

import {View, StyleSheet, Text} from 'react-native';

const ArrowButton = props => (
   <Button
      onPress={() => props.onPress()}
      pointerEvents={props.visible ? 'auto' : 'none'}
      style={[styles.arrowButton, props.style, !props.visible && {opacity: 0}]}>
      <Icon size={16} name={props.icon} color={colors.darkGrey} />
   </Button>
);

export default class DaySelector extends React.Component {
   constructor() {
      super();

      this.state = {current: 0};
   }
   shouldComponentUpdate(props, state) {
      return state.current !== this.state.current;
   }
   setCurrent(day) {
      this.setState({current: day});
   }
   change(p) {
      const current = Math.min(this.props.max, Math.max(0, this.state.current + p));
      this.props.onChange(current);
      this.setState({current});
   }
   render() {
      const {max} = this.props;
      const {current} = this.state;
      const transparentBackground = 'rgba(255, 255, 255, 0)';
      const background = colors.lightGrey;
      return (
         <View style={styles.container}>
            <LinearGradient
               start={[0, 0]}
               end={[1, 0]}
               locations={[0.5, 1]}
               colors={[background, transparentBackground]}
               style={[styles.buttonContainer, {left: 0, paddingHorizontal: 18}]}>
               <ArrowButton
                  onPress={this.change.bind(this, -1)}
                  icon="ios-arrow-back"
                  style={{alignItems: 'flex-start'}}
                  visible={current > 0} />
            </LinearGradient>
            <LinearGradient
               start={[0, 0]}
               end={[1, 0]}
               locations={[0, 0.5]}
               colors={[transparentBackground, background]}
               style={[styles.buttonContainer, {right: 0, paddingHorizontal: 18}]}>
               <ArrowButton
                  onPress={this.change.bind(this, 1)}
                  icon="ios-arrow-forward"
                  style={{alignItems: 'flex-end'}}
                  visible={current < max} />
            </LinearGradient>
         </View>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      backgroundColor: 'transparent',
      flexDirection: 'row',
      flex: 1,
      height: 50
   },
   buttonContainer: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      paddingTop: 6,
      height: 50
   },
   arrowButton: {
      width: 38,
      height: 38,
      opacity: 0.9,
      justifyContent: 'center',
      alignItems: 'center'
   }
});
