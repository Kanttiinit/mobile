'use strict';

import React from 'react-native';
import Material from 'react-native-material-kit';
import Icon from 'react-native-vector-icons/Ionicons';

const {
   Animated,
   View,
   Platform
} = React;

const {
   MKColor,
   MKButton
} = Material;

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
         <MKButton
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
                  backgroundColor: backgroundColor || MKColor.Teal,
                  alignItems: 'center',
                  justifyContent: 'center'
               }}>
               <Animated.View
                  style={{
                     backgroundColor: 'transparent',
                     transform: [{scale: checkedPhase}],
                     marginTop: Platform.OS === 'ios' ? 3 : 0
                  }}>
                  <Icon
                     name="ios-checkmark-empty"
                     color={color || 'white'}
                     size={32} />
               </Animated.View>
            </Animated.View>
         </MKButton>
      );
   }
}
