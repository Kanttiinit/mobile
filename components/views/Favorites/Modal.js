'use strict';

import React from 'react-native';
import Material from 'react-native-material-kit';
import {connect} from 'react-redux';

import {dismissModal} from '../../../store/actions';

const {
   View,
   Text,
   StyleSheet
} = React;

const {
   MKButton,
   MKTextField,
   MKColor
} = Material;

class FavoriteModal extends React.Component {
   constructor() {
      super();
      this.state = {};
   }
   render() {
      return (
         <View>
            <View style={styles.modalTitle}><Text style={styles.modalTitleText}>Uusi suosikki</Text></View>
            <MKTextField
               clearButtonMode='while-editing'
               highlightColor={MKColor.Teal}
               textInputStyle={{color: MKColor.Black, fontSize: 18}}
               floatingLabelEnabled={true}
               onChangeText={text => this.setState({text})}
               style={styles.textField}
               placeholder="Avainsana" />
            <View style={{flexDirection: 'row', flex: 1}}>
               <MKButton
                  style={[styles.addButton, {backgroundColor: MKColor.Red}]}
                  onPress={() => this.props.dismissModal()}>
                  <Text style={styles.addText}> PERUUTA </Text>
               </MKButton>
               <View style={{flex: 1}} />
               <MKButton
                  style={styles.addButton}
                  onPress={() => {
                     this.props.onSelect(this.state.text);
                     this.props.dismissModal();
                  }}>
                  <Text style={styles.addText}> LISÄÄ </Text>
               </MKButton>
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
      height: 48,
      marginBottom: 40
   },
   addButton: {
      backgroundColor: MKColor.Teal,
      alignSelf: 'flex-end',
      borderRadius: 2,
      padding: 6,
      elevation: 2
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
