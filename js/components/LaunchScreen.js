import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';

const LaunchScreen = () => (
  <View style={styles.container}>
    <View style={styles.logoWrapper}>
      <Image
        resizeMode="contain"
        style={{width: 70, height: 70}}
        source={require('../../images/logo.png')} />
      <Text style={styles.logo}>Kanttiinit</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightGrey,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logoWrapper: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  logo: {
    color: colors.accent,
    fontSize: 48,
    fontWeight: '300',
    marginLeft: spaces.big
  }
});

export default LaunchScreen;
