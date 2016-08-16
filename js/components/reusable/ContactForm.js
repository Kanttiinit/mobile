import React from 'react';
import {Animated, View, Alert, Text, StyleSheet} from 'react-native';
import {Makiko} from 'react-native-textinput-effects';
import Icon from 'react-native-vector-icons/FontAwesome';

import Loader from './Loader';
import Button from './Button';

export default class ContactForm extends React.Component {
  constructor() {
    super();
    this.state = {
      message: '',
      width: new Animated.Value(0)
    };
  }
  sendFeedback() {
    const {type} = this.props;
    const {message, sending} = this.state;

    if (message.length < 3) {
      Alert.alert(
        'Viestisi on liian lyhyt!',
        'Ole hyvä, ja yritä uudestaan.',
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
          'Kiitos palautteestasi!',
          '',
          [{text: 'OK'}]
        );
      })
      .catch(() => {
        this.setState({sending: false});
        Alert.alert(
          'Tapahtui odottamaton virhe!',
          'Yritä myöhemmin uudestaan.',
          [{text: 'OK'}]
        );
      });
    }
  }
  onFocus() {
    console.log('focus');
    Animated.spring(this.state.width, {toValue: 24 + spaces.medium * 2}).start();
  }
  onBlur() {
    console.log('blur');
    if (this.state.message === '') {
      Animated.spring(this.state.width, {toValue: 0}).start();
    }
  }
  render() {
    const {label, style} = this.props;
    const {message, width, sending} = this.state;

    return (
      <View style={[style, {flexDirection: 'row', alignItems: 'center'}]}>
        <Makiko
          label={label}
          iconName="comment"
          iconClass={Icon}
          iconColor={colors.white}
          value={message}
          onFocus={() => this.onFocus()}
          onBlur={() => this.onBlur()}
          onChangeText={message => this.setState({message})}
          style={{flex: 1}} />
        <Animated.View style={{width: width}}>
          {sending ? <Loader /> :
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
      </View>
    );
  }
}

ContactForm.displayName = 'ContactForm';

const styles = StyleSheet.create({
  confirmation: {
    fontSize: 16,
    margin: 6,
    textAlign: 'center'
  },
  button: {
    backgroundColor: colors.accent,
    padding: 8,
    borderRadius: 2,
    marginTop: 8
  }
});
