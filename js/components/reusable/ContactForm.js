// @flow
import React from 'react';
import {connect} from 'react-redux';
import {Animated, ActivityIndicator, Alert} from 'react-native';
import {Makiko} from 'react-native-textinput-effects';
import Icon from 'react-native-vector-icons/FontAwesome';

import type {Lang} from '../../utils/types';
import {colors, spaces} from '../../utils/style';
import translations from '../../utils/i18n';
import Button from './Button';
import {selectLang} from '../../store/selectors';

class ContactForm extends React.Component {
  props: {
    type: string,
    lang: Lang,
    style: any,
    label: string
  };
  state: {
    message: string,
    sending: boolean,
    phase: any
  };
  constructor() {
    super();
    this.state = {
      message: '',
      phase: new Animated.Value(0),
      sending: false
    };
  }
  sendFeedback() {
    const {type, lang} = this.props;
    const {message, sending} = this.state;

    if (message.length < 3) {
      Alert.alert(
        translations.tooShortMessage[lang],
        translations.tryAgain[lang],
        [{text: 'OK'}]
      );
    } else if (!sending) {
      this.setState({sending: true});
      fetch('https://bot.kanttiinit.fi/feedback', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          message: `New feedback from app: "${type}":\n"${message}"`
        })
      })
      .then(() => {
        this.setState({sending: false, message: ''});
        this.onBlur();
        Alert.alert(
          translations.thanksForFeedback[lang],
          '',
          [{text: 'OK'}]
        );
      })
      .catch(() => {
        this.setState({sending: false});
        Alert.alert(
          translations.unexpectedError[lang],
          translations.tryAgainLater[lang],
          [{text: 'OK'}]
        );
      });
    }
  }
  onFocus() {
    Animated.spring(this.state.phase, {toValue: 1}).start();
  }
  onBlur() {
    if (this.state.message === '') {
      Animated.spring(this.state.phase, {toValue: 0}).start();
    }
  }
  render() {
    const {label, style} = this.props;
    const {message, phase, sending} = this.state;
    const borderColor = phase.interpolate({
      inputRange: [0, 1],
      outputRange: ['#cbcbcb', colors.accent]
    });
    const scale = phase.interpolate({
      inputRange: [0, 1],
      outputRange: [0.4, 1]
    });
    return (
      <Animated.View style={[style, {borderColor, borderWidth: 3}]}>
        <Makiko
          label={label}
          iconName="comment"
          iconClass={Icon}
          iconColor={colors.white}
          value={message}
          onFocus={() => this.onFocus()}
          onBlur={() => this.onBlur()}
          onChangeText={message => this.setState({message})}
          inputStyle={{paddingRight: 30}}
          autoCorrect={false}
          style={{flex: 1}} />
        <Animated.View
          style={{
            backgroundColor: 'transparent',
            position: 'absolute',
            right: 4,
            top: 12,
            opacity: phase,
            transform: [{scale}]
          }}>
          {sending ? <ActivityIndicator style={{paddingTop: 2, paddingRight: 6}} animating={true} color={colors.accent} /> :
          <Button
            style={{paddingHorizontal: spaces.medium}}
            onPress={() => this.sendFeedback()}>
            <Icon
              color={colors.accent}
              size={24}
              name="paper-plane" />
          </Button>
          }
        </Animated.View>
      </Animated.View>
    );
  }
}

const mapState = state => ({
  lang: selectLang(state)
});

export default connect(mapState)(ContactForm);
