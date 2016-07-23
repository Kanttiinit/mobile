import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {View, Text, TextInput, StyleSheet} from 'react-native';

import Button from './Button';

import * as actions from '../../store/actions/feedback';

const ContactForm = ({children, message, type, sending, send, setFeedbackMessage, sent, error}) => {
   if (sent)
      return <Text style={styles.confirmation}>Kiitos palautteestasi!</Text>;

   return (
      <View style={{padding: 8}}>
         <Text style={styles.headerText}>{children || 'Anna palautetta:'}</Text>
         <TextInput
            style={styles.textInput}
            onChangeText={text => setFeedbackMessage(text)}
            value={message} />
         <Button style={styles.button} onPress={() => send(type, message)}>
            <Text style={{color: 'white', textAlign: 'center'}}>{sending ? 'Lähetetään...' : 'LÄHETÄ'}</Text>
         </Button>
         {error && <Text>{JSON.stringify(error)}</Text>}
      </View>
   );
}

const styles = StyleSheet.create({
   confirmation: {
      fontSize: 16,
      margin: 6,
      textAlign: 'center'
   },
   headerText: {
      fontSize: 14,
      marginBottom: 8
   },
   textInput: {
      height: 40,
      borderRadius: 4,
      marginVertical: 8,
      borderColor: 'gray',
      borderWidth: 1
   },
   button: {
      backgroundColor: colors.accent,
      padding: 8,
      borderRadius: 2,
      marginTop: 8
   }
});

const stateToProps = state => ({
   sending: state.pending.feedback,
   sent: state.data.feedback && !state.error.feedback,
   error: state.error.feedback,
   message: state.value.feedbackMessage
});

const dispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(stateToProps, dispatchToProps)(ContactForm);
