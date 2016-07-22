import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const LaunchScreen = () => (
   <View style={styles.container}>
      <Text style={styles.logo}>Kanttiinit</Text>
   </View>
);

const styles = StyleSheet.create({
   container: {
      backgroundColor: colors.accent,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
   },
   logo: {
      color: colors.white,
      fontSize: 48,
      fontWeight: '300'
   }
});

export default LaunchScreen;
