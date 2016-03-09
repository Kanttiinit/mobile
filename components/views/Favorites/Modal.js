'use strict';

import React from 'react-native';
import {connect} from 'react-redux';

import {dismissModal} from '../../../store/actions';
import Button from '../../Button';
import {colors} from '../../../style';

const {
   View,
   Platform,
   Text,
   TextInput,
   StyleSheet
} = React;

class FavoriteModal extends React.Component {
   constructor() {
      super();
      this.state = {text: ''};
   }
   set() {
      this.props.onSelect(this.state.text);
      this.props.dismissModal();
   }
   render() {
      return (
         <View>
            <View style={styles.modalTitle}><Text style={styles.modalTitleText}>Uusi suosikki</Text></View>
            <TextInput
               clearButtonMode="while-editing"
               autoCapitalize="none"
               autoCorrect={false}
               autoFocus={true}
               onChangeText={text => this.setState({text})}
               onSubmitEditing={this.set.bind(this)}
               value={this.state.text}
               style={styles.textField}
               placeholder="Avainsana" />
            <View style={{flexDirection: 'row', flex: 1}}>
               <Button
                  style={[styles.addButton, {backgroundColor: colors.red}]}
                  onPress={() => this.props.dismissModal()}>
                  <Text style={styles.addText}> PERUUTA </Text>
               </Button>
               <View style={{flex: 1}} />
               <Button
                  style={styles.addButton}
                  onPress={this.set.bind(this)}>
                  <Text style={styles.addText}> LISÄÄ </Text>
               </Button>
            </View>
         </View>
      );
   }
};

const styles = StyleSheet.create({
   modalTitle: {
      marginBottom: 20
   },
   modalTitleText: {
      color: 'black',
      fontSize: 18
   },
   textField: {
      padding: 4,
      marginBottom: 40,
      fontSize: 18,
      height: Platform.OS === 'ios' ? 32 : undefined,
      backgroundColor: colors.lightGrey,
      borderRadius: 4
   },
   addButton: {
      backgroundColor: colors.accent,
      alignSelf: 'flex-end',
      borderRadius: 2,
      padding: 6,
      elevation: 3
   },
   addText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 12
   }
});

export default connect(
   undefined,
   dispatch => ({
      dismissModal: () => dispatch(dismissModal())
   })
)(FavoriteModal);
