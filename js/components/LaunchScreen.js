// @flow
import React from 'react';
import _ from 'lodash';
import {View, StyleSheet} from 'react-native';
import {colors, spaces, defaultStyles} from '../utils/style';


const LaunchScreen = () => (
  <View style={[defaultStyles.overlay, styles.container]}>
    <View style={styles.header} />
    {_.times(4, i => <View key={i} style={styles.block} />)}
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightGrey,
    flex: 1
  },
  block: {
    height: 200,
    backgroundColor: colors.mediumGrey,
    flex: 1,
    margin: spaces.medium,
    marginTop: 0
  },
  header: {
    height: 60,
    backgroundColor: colors.accentLight,
    marginBottom: spaces.medium
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
