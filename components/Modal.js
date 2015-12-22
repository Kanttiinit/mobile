'use strict';

import React from 'react-native';

const {
   View,
   Component,
   StyleSheet,
   TouchableOpacity,
   Animated
} = React;

class Modal extends Component {
   constructor() {
      super();
      this.state = {
         opacity: new Animated.Value(0),
         scale: new Animated.Value(0.8),
         offset: new Animated.Value(0)
      };
   }
   setPhase(toValue) {
      Animated.timing(
         this.state.opacity,
         {
            toValue,
            duration: 200
         }
      ).start();

      Animated.spring(
         this.state.scale,
         {toValue: toValue ? 1 : 0.8}
      ).start();
   }
   render() {
      const {opacity, open, scale, offset} = this.state;
      return (
         <View
         pointerEvents={open ? 'auto' : 'none'}
         style={[styles.absolute, styles.container]}>
            <TouchableOpacity
            style={styles.absolute}
            onPress={this.close.bind(this)}
            activeOpacity={0.75}>
               <Animated.View style={[styles.overlay, {flex: 1, opacity}]} />
            </TouchableOpacity>
            <Animated.View
               style={[
                  this.props.style,
                  {opacity, transform: [{scale}, {translateY: offset}]}
               ]}>
               {this.props.children}
            </Animated.View>
         </View>
      );
   }
   open() {
      this.setState({open: true});
      this.setPhase(1);
   }
   close() {
      this.setState({open: false});
      this.setPhase(0);
   }
   animateOffset(offset) {
      Animated.spring(
         this.state.offset,
         {toValue: offset}
      ).start();
   }
}

const styles = StyleSheet.create({
   absolute: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0)'
   },
   container: {
      justifyContent: 'center'
   },
   overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.7)'
   }
});

export default Modal;
