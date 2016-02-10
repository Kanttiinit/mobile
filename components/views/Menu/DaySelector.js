'use strict';

import React from 'react-native';
import Material from 'react-native-material-kit';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

import moment from 'moment';

const {
   View,
   StyleSheet,
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
      style={[styles.arrowButton, props.style, !props.visible && {opacity: 0}]}
      rippleColor="rgba(200, 200, 200, 0.25)">
      <Icon name={props.icon} color="#bababa" />
   </MKButton>
);

export default class DaySelector extends React.Component {
   constructor() {
      super();

      this.state = { current: 0 };
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
      const transparentBackground = 'rgba(235, 235, 235, 0)';
      const background = 'rgba(235, 235, 235, 1)';
      return (
         <View style={styles.container}>
            <LinearGradient
               start={[0, 0]}
               end={[1, 0]}
               locations={[0.5, 1]}
               colors={[background, transparentBackground]}
               style={[styles.buttonContainer, {left: 0, paddingLeft: 14, paddingRight: 28}]}>
               <Button
                  onPress={this.change.bind(this, -1)}
                  icon="chevron-left"
                  visible={current > 0} />
            </LinearGradient>
            <LinearGradient
               start={[0, 0]}
               end={[1, 0]}
               locations={[0, 0.5]}
               colors={[transparentBackground, background]}
               style={[styles.buttonContainer, {right: 0, paddingRight: 14, paddingLeft: 28}]}>
               <Button
                  onPress={this.change.bind(this, 1)}
                  icon="chevron-right"
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
      height: 40
   },
   buttonContainer: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      paddingTop: 6,
      height: 40
   },
   arrowButton: {
      width: 32,
      height: 32,
      alignItems: 'center',
      justifyContent: 'center'
   }
});
