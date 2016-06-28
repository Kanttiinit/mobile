import React from 'react';
import Button from './Button';

import {colors} from '../style';

import {View, Text, TextInput, StyleSheet} from 'react-native';

export default class ContactForm extends React.Component {
   constructor() {
      super();
      this.state = {};
   }
   send() {
      this.setState({sending: true});
      fetch('https://api.kanttiinit.fi/send-message', {
         method: 'post',
         headers: {'Content-Type': 'application/json'},
         body: JSON.stringify({message: this.props.type + ': ' + this.state.text})
      })
      .then(r => r.json())
      .then(r => {
         this.setState({sent: true});
      });
   }
   render() {
      const {question} = this.props;
      const {sending, sent} = this.state;

      if (sent)
         return <Text style={styles.confirmation}>Kiitos palautteestasi!</Text>;

      return (
         <View style={{padding: 8}}>
            <Text style={styles.headerText}>{this.props.children || 'Anna palautetta:'}</Text>
            <TextInput
               style={styles.textInput}
               onChangeText={text => this.setState({text})}
               value={this.state.text} />
            <Button style={styles.button} onPress={() => this.send()}>
               <Text style={{color: 'white', textAlign: 'center'}}>{sending ? 'Lähetetään...' : 'LÄHETÄ'}</Text>
            </Button>
         </View>
      );
   }
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
