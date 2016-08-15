import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {View, Alert, Text, StyleSheet} from 'react-native';
import {Makiko} from 'react-native-textinput-effects';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Button from './Button';
import {dismissModal} from '../../store/actions/modal';
import {selectLang} from '../../store/selectors';

class ContactForm extends React.Component {
  constructor() {
    super();
    this.state = {message: ''};
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
        this.setState({sending: false, sent: true});
      })
      .catch(() => {
        this.setState({sending: false, sent: true});
        Alert.alert(
          'Tapahtui odottamaton virhe!',
          'Yritä myöhemmin uudestaan.',
          [{text: 'OK'}]
        );
      });
    }

  }
  render() {
    const {lang, children, dismissModal} = this.props;
    const {message, sent, sending} = this.state;

    if (sent)
      return <Text style={styles.confirmation}>Kiitos palautteestasi!</Text>;

    return (
      <View style={{padding: 8}}>
        <Makiko
          label={children || 'Anna palautetta'}
          iconName="comment"
          iconClass={FontAwesome}
          iconColor={colors.white}
          value={message}
          onChangeText={message => this.setState({message})}
          style={{backgroundColor: colors.accent}} />
        <View style={{marginTop: spaces.big, flexDirection: 'row'}}>
          <Button
            containerStyle={{flex: 1}}
            onPress={() => this.sendFeedback()}>
            <Text style={defaultStyles.lightButtonText}>
            {sending ? translations.sending[lang] + '...' : translations.send[lang].toUpperCase()}
            </Text>
          </Button>
          <Button
            onPress={() => dismissModal()}>
            <Text style={defaultStyles.lightButtonText}>{translations.close[lang].toUpperCase()}</Text>
          </Button>
        </View>
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

const mapState = state => ({
  lang: selectLang(state)
});

const dispatchToProps = dispatch => bindActionCreators({dismissModal}, dispatch);

export default connect(mapState, dispatchToProps)(ContactForm);
