import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {Animated, View, Text, ScrollView, TouchableHighlight} from 'react-native';

export default class Dropdown extends React.Component {
  constructor() {
    super();
    this.state = {
      opened: false,
      height: 0,
      opacity: new Animated.Value(0),
      translate: new Animated.Value(-20)
    };
  }
  render() {
    const {onSelect, selected, options, style} = this.props;
    const {opacity, translate, height, opened} = this.state;

    return (
      <View style={[style, {zIndex: 2}]}>
        <TouchableHighlight
          underlayColor={colors.lightGrey}
          onLayout={e => this.setState({height: e.nativeEvent.layout.height})}
          onPress={() => this.toggle()}>
          <View
            style={{
              padding: 12,
              zIndex: 3,
              backgroundColor: colors.lightGrey,
              flexDirection: 'row'
            }}>
            <Icon size={18} name="md-arrow-dropdown" />
            <Text style={{marginLeft: spaces.small}}>{options.find(o => o.value === selected).label}</Text>
          </View>
        </TouchableHighlight>
        <Animated.View
          pointerEvents={opened ? 'auto' : 'none'}
          style={{
            position: 'absolute',
            top: height,
            left: 0,
            right: 0,
            opacity: opacity,
            transform: [{
              translateY: translate
            }]
          }}>
          <ScrollView style={{
            backgroundColor: 'white',
            shadowColor: 'rgba(0, 0, 0, 0.5)',
            shadowOffset: {width: 0, height: 12},
            shadowRadius: 5,
            shadowOpacity: 0.5
          }}>
            {options.map(({value, label}) =>
              <TouchableHighlight
                key={value}
                underlayColor={colors.lightGrey}
                onPress={() => {
                  onSelect(value);
                  this.toggle();
                }}>
                <View
                  style={{padding: 12}}>
                  <Text>{label}</Text>
                </View>
              </TouchableHighlight>
            )}
          </ScrollView>
        </Animated.View>
      </View>
    );
  }
  toggle() {
    Animated.parallel([
      Animated.spring(
        this.state.opacity,
        {
          toValue: this.state.opened ? 0 : 1
        }
      ),
      Animated.spring(
        this.state.translate,
        {
          toValue: this.state.opened ? -20 : 0
        }
      )
    ]).start();
    this.setState({opened: !this.state.opened});
  }
}
