import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {setDayOffset} from '../../../store/actions/menus';
import {colors, spaces} from '../../../style';
import Button from '../../reusable/Button';

import {View, StyleSheet, Text} from 'react-native';

const ArrowButton = ({onPress, visible, style, icon}) => (
   <Button
      onPress={() => onPress()}
      pointerEvents={visible ? 'auto' : 'none'}
      style={[styles.arrowButton, style, !visible && {opacity: 0}]}>
      <Icon size={16} name={icon} color={colors.darkGrey} />
   </Button>
);

class DaySelector extends React.Component {
   shouldComponentUpdate(props, state) {
      return props.dayOffset !== this.props.dayOffset;
   }
   change(p) {
      const current = Math.min(this.props.max, Math.max(0, this.props.dayOffset + p));
      this.props.setDayOffset(current);
   }
   render() {
      const {max, dayOffset} = this.props;
      const transparentBackground = 'rgba(255, 255, 255, 0)';
      const background = colors.lightGrey;
      return (
         <View style={styles.container}>
            <LinearGradient
               start={[0, 0]}
               end={[1, 0]}
               locations={[0.5, 1]}
               colors={[background, transparentBackground]}
               style={[styles.buttonContainer, {left: 0, paddingHorizontal: spaces.big}]}>
               <ArrowButton
                  onPress={this.change.bind(this, -1)}
                  icon="ios-arrow-back"
                  style={{alignItems: 'flex-start'}}
                  visible={dayOffset > 0} />
            </LinearGradient>
            <LinearGradient
               start={[0, 0]}
               end={[1, 0]}
               locations={[0, 0.5]}
               colors={[transparentBackground, background]}
               style={[styles.buttonContainer, {right: 0, paddingHorizontal: spaces.big}]}>
               <ArrowButton
                  onPress={this.change.bind(this, 1)}
                  icon="ios-arrow-forward"
                  style={{alignItems: 'flex-end'}}
                  visible={dayOffset < max} />
            </LinearGradient>
         </View>
      );
   }
}

const mapState = state => ({
   dayOffset: state.menus.dayOffset
});

const mapDispatch = dispatch => bindActionCreators({setDayOffset}, dispatch);

export default connect(mapState, mapDispatch)(DaySelector);

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
