import React from 'react';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import {bindActionCreators} from 'redux';
import {View, Text, StyleSheet} from 'react-native';

import Property from './reusable/Property';
import Button from './reusable/Button';
import {getCourseFavorites, selectLang} from '../store/selectors';
import {dismissModal} from '../store/actions/modal';
import {setIsSelected} from '../store/actions/preferences';

const CourseDetails = ({course, lang, courseFavorites, restaurant, setIsSelected, dismissModal}) => (
  <View>
    <View>
      <Text style={defaultStyles.bigText}>{course.title}</Text>
    </View>
    <View style={styles.courseListWrapper}>
      {course.properties && !!course.properties.length &&
        course.properties.map(p =>
          <Property key={p} containerStyle={{marginTop: spaces.medium}} large={true}>{p}</Property>
        )
      }
    </View>
    <View style={{flexDirection: 'row', marginVertical: spaces.small}}>
      {courseFavorites.map(f =>
        <Button
          key={f.id}
          onPress={() => setIsSelected(f.id, !f.selected)}
          style={[styles.favoriteButton, {backgroundColor: f.selected ? colors.red : 'transparent'}]}>
          <Text style={{color: f.selected ? colors.white : colors.red}}>
            <Icon name={'md-heart' + (f.selected ? '' : '-outline')} />
            {' ' + f.name}
          </Text>
        </Button>
      )}
    </View>
    <View style={styles.footer}>
      <Text style={styles.restaurantName}>{restaurant.name}</Text>
      <Button
        onPress={() => dismissModal()}>
        <Text style={defaultStyles.lightButtonText}>{translations.close[lang].toUpperCase()}</Text>
      </Button>
    </View>
  </View>
);

CourseDetails.displayName = 'CourseDetails';

const mapState = (state, props) => ({
  courseFavorites: getCourseFavorites(state, props),
  lang: selectLang(state)
});

const mapDispatch = dispatch => bindActionCreators({setIsSelected, dismissModal}, dispatch);

export default connect(mapState, mapDispatch)(CourseDetails);

const styles = StyleSheet.create({
  courseListWrapper: {
    marginTop: spaces.medium,
    marginBottom: spaces.medium,
    paddingTop: 0
  },
  footer: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: spaces.medium
  },
  favoriteButton: {
    padding: spaces.mini,
    marginRight: spaces.small,
    borderColor: colors.red,
    borderWidth: 1,
    borderRadius: 2
  },
  restaurantName: {
    alignSelf: 'flex-end',
    color: colors.darkGrey,
    flex: 1
  }
});
