'use strict';

import React from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {colors} from '../style';
import Button from './Button';

const {
   Animated,
   View,
   Platform
} = React;

export default class Checkbox extends React.Component {
   constructor() {
      super();
      this.state = {checkedPhase: new Animated.Value(1)};
   }
   componentDidMount() {
      const {checked} = this.props;
      this.setState({checkedPhase: new Animated.Value(checked ? 1 : 0)});
   }
   componentWillReceiveProps(props) {
      this.animateCheckSymbol(props.checked);
   }
   animateCheckSymbol(active) {
      Animated.spring(
         this.state.checkedPhase,
         {toValue: active ? 1 : 0, tension: 200}
      ).start();
   }
   render() {
      const {checked, onCheckedChange, color, backgroundColor} = this.props;
      const {checkedPhase} = this.state;
      return (
         <Button
            onPress={() => onCheckedChange(!checked)}
            style={{
               height: 24,
               width: 24,
               margin: 6,
               borderRadius: 12,
               backgroundColor: '#c1c1c1'
            }}>
            <Animated.View
               style={{
                  flex: 1,
                  opacity: checkedPhase,
                  borderRadius: 12,
                  backgroundColor: backgroundColor || colors.accent,
                  alignItems: 'center',
                  justifyContent: 'center'
               }}>
               <View
                  style={{
                     backgroundColor: 'transparent',
                     marginTop: Platform.OS === 'ios' ? 3 : 0
                  }}>
                  <Icon
                     name="ios-checkmark-empty"
                     color={color || 'white'}
                     size={32} />
               </View>
            </Animated.View>
         </Button>
      );
   }
}
