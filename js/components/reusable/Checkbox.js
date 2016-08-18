// @flow
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

import Button from './Button';
import {colors} from '../../utils/style';

import {Animated, View, Platform} from 'react-native';

type Props = {
  checked: boolean,
  onCheckedChange: (checked: boolean) => void,
  color?: string,
  backgroundColor?: string
};

export default class Checkbox extends React.Component {
  props: Props;
  state: {
    checkedPhase: any
  };
  constructor() {
    super();
    this.state = {checkedPhase: new Animated.Value(1)};
  }
  componentDidMount() {
    const {checked} = this.props;
    this.setState({checkedPhase: new Animated.Value(checked ? 1 : 0)});
  }
  componentWillReceiveProps(props: Props) {
    this.animateCheckSymbol(props.checked);
  }
  animateCheckSymbol(active: boolean) {
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
          height: 20,
          width: 20,
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
              name="ios-checkmark-outline"
              color={color || 'white'}
              size={32} />
          </View>
        </Animated.View>
      </Button>
    );
  }
}
