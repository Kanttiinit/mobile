import React from 'react';
import {connect} from 'react-redux';
import {Animated, View, Alert} from 'react-native';
import {Makiko} from 'react-native-textinput-effects';
import Icon from 'react-native-vector-icons/FontAwesome';

import Loader from './Loader';
import Button from './Button';
import {selectLang} from '../../store/selectors';

class ContactForm extends React.Component {
  constructor() {
    super();
    this.state = {
      message: '',
      width: new Animated.Value(0)
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
    Animated.spring(this.state.width, {toValue: 24 + spaces.medium * 2}).start();
  }
  onBlur() {
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

const mapState = state => ({
  lang: selectLang(state)
});

export default connect(mapState)(ContactForm);
