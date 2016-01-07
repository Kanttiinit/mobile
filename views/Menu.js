'use strict';

import React from 'react-native';
import Material from 'react-native-material-kit';
import moment from 'moment';
import momentFI from 'moment/locale/fi';
import Swiper from '../components/Swiper';
import Service from '../managers/Service';
import Loader from '../components/Loader';
import Favorites from '../managers/Favorites';
import Icon from 'react-native-vector-icons/Ionicons';

import Modal from 'react-native-simple-modal';
import Day from './Menu/Day';
import CourseDetails from './Menu/CourseDetails';

const {
   View,
   StyleSheet,
   AppStateIOS,
   Platform,
   DeviceEventEmitter,
   Text
} = React;

const {
   MKButton,
   MKColor,
   mdl
} = Material;

class DaySelector extends React.Component {
   constructor() {
      super();
      this.state = {current: 0};
   }
   shouldComponentUpdate(props) {
      return props.current !== this.state.current;
   }
   componentWillReceiveProps(props) {
      this.setState({current: props.current});
   }
   change(p) {
      const current = Math.min(this.props.dates.length - 1, Math.max(0, this.state.current + p));
      this.props.onChange(current);
      this.setState({current});
   }
   render() {
      const {dates} = this.props;
      const {current} = this.state;
      const date = dates[current];
      const showPrevious = current > 0;
      const showNext = current < dates.length - 1;
      return (
         <View style={styles.daySelector}>
            <MKButton
               onPress={this.change.bind(this, -1)}
               pointerEvents={showPrevious ? 'auto' : 'none'}
               style={[styles.arrowButton, !showPrevious && {opacity: 0}]}
               rippleColor="rgba(200, 200, 200, 0.25)">
               <Icon name="chevron-left" color="#999" />
            </MKButton>
            <Text style={styles.dayTitle}>
               {date.format('dddd').toUpperCase()}
               <Text style={styles.date}> {date.format('DD.MM.')}</Text>
            </Text>
            <MKButton
               onPress={this.change.bind(this, 1)}
               pointerEvents={showNext ? 'auto' : 'none'}
               style={[styles.arrowButton, !showNext && {opacity: 0}]}
               rippleColor="rgba(200, 200, 200, 0.25)">
               <Icon name="chevron-right" color="#999" />
            </MKButton>
         </View>
      );
   };
}

class Menu extends React.Component {
   constructor() {
      super();
      moment.locale('fi');
      this.state = {
         days: this.getDays(),
         currentPage: 0
      };
   }
   getChildContext() {
      return {
         courseSelected: this.courseSelected.bind(this),
         closeCourseDialog: this.closeCourseDialog.bind(this)
      };
   }
   closeCourseDialog() {
      this.refs.modal.close();
   }
   courseSelected(course, restaurant) {
      this.selectedCourse = course;
      this.selectedCourse.restaurant = restaurant;
      this.refs.modal.open();
   }
   getDays() {
      return Array(7).fill(1).map((n, i) => moment().add(i, 'days'));
   }
   componentDidMount() {
      if (Platform.OS === 'ios')
         AppStateIOS.addEventListener('change', currentAppState => {
            if (currentAppState === 'active')
               this.update();
         });

      DeviceEventEmitter.addListener('start', this.update.bind(this));
      this.props.events.on('MENU', this.update.bind(this));
      this.update();
   }
   update() {
      if (this.state.loading)
         return;

      // shit is loading, yo
      this.setState({loading: true});

      if (!this.state.days[0].isSame(moment(), 'day'))
         this.setState({days: this.getDays()});

      // fetch favorites
      Favorites.getStoredFavorites()
      .then(favorites => this.setState({favorites}));

      // update restaurant list
      Service.getRestaurants()
      .then(restaurants => {
         this.setState({
            restaurants: Service.updateRestaurantDistances(restaurants, this.state.location)
         });

         // // if no location is known, try to get it
         // if (!this.state.location) {
         //    return Service.getLocation().then(location => {
         //       this.setState({
         //          location,
         //          restaurants: Service.updateRestaurantDistances(this.state.restaurants, location)
         //       });
         //       this.setState({loading: false});
         //    });
         // } else {
            this.setState({loading: false});
         //}
      })
      .catch(err => {
         console.error(err);
      });
   }
   onPageChange(p) {
      this.refs.swiper.setPage(p);
      this.setState({currentPage: p});
   }
   render() {
      const {restaurants, favorites, days, loading, currentPage} = this.state;
      const date = days[currentPage];
      return (
         <View style={styles.container}>
            <DaySelector ref="daySelector" current={currentPage} onChange={this.onPageChange.bind(this)} dates={days} />
            {restaurants && favorites
            ? <Swiper ref="swiper" onPageChange={p => this.setState({currentPage: p})}>{days.map((date, i) => <Day key={i} restaurants={restaurants} favorites={favorites} date={date} />)}</Swiper>
            : <Loader color={MKColor.Teal} />}
            {restaurants && loading ?
               <mdl.Spinner
                  strokeColor={MKColor.Teal}
                  style={styles.spinner} />
            : null}
            <Modal
               ref="modal"
               style={{padding: 0}}
               renderContent={() => React.createElement(CourseDetails, {course: this.selectedCourse})} />
         </View>
      );
   }
}

Menu.childContextTypes = {
   courseSelected: React.PropTypes.func,
   closeCourseDialog: React.PropTypes.func
};

const styles = StyleSheet.create({
   container: {
      backgroundColor: MKColor.Silver,
      flex: 1
   },
   spinner: {
      position: 'absolute',
      top: 14,
      right: 14,
      transform: [{scale: 0.7}]
   },
   daySelector: {
      flexDirection: 'row',
      paddingHorizontal: 14,
      paddingVertical: 8,
      alignItems: 'center'
   },
   dayTitle: {
      fontSize: 20,
      fontWeight: '300',
      fontFamily: Platform.OS === 'android' ? 'sans-serif-light' : undefined,
      flexDirection: 'row',
      textAlign: 'center',
      flex: 1
   },
   arrowButton: {
      width: 32,
      height: 32,
      alignItems: 'center',
      justifyContent: 'center'
   },
   date: {
      color: '#bababa'
   }
});

export default Menu;
