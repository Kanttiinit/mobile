import {createSelector} from 'reselect';
import _ from 'lodash';
import moment from 'moment';

export const selectedRestaurants = createSelector(
   state => state.restaurants.restaurants,
   state => state.restaurants.selected,
   (all, selected) => all.filter(r => selected.indexOf(r.id) > -1)
);

export const isFavorite = createSelector(
   state => state.favorites.items,
   state => state.favorites.selected,
   (state, props) => props.course.title,
   (all, selected, title) => selected.some(selectedId => {
      const favorite = all.find(f => f.id === selectedId);
      if (favorite) {
         return title.match(new RegExp(favorite.regexp, 'i'));
      }
   })
 );

export const isAreaChecked = createSelector(
   state => state.restaurants.selected,
   (state, props) => props.area.restaurants,
   (selectedRestaurants, areaRestaurants) =>
      areaRestaurants.every(r => selectedRestaurants.indexOf(r.id) > -1)
);

export const getCourseFavorites = createSelector(
   state => state.favorites.items,
   (state, props) => props.course.title,
   (favorites, courseTitle) =>
      _.sortBy(favorites.filter(f => courseTitle.match(new RegExp(f.regexp, 'i'))), 'name')
);

export const formatRestaurants = createSelector(
   (state, props) => props.restaurants,
   state => state.menus.menus,
   (state, props) => props.day,
   (restaurants, menus, day) => _.orderBy(
      restaurants.map(restaurant => {
         const courses = _.get(menus, [restaurant.id, day], []);
         return {...restaurant, courses, noCourses: !courses.length};
      }),
   ['noCourses'])
);

export const isToday = createSelector(
   state => state.misc.now,
   (state, props) => props.day,
   (now, day) => moment(now).isSame(moment(day), 'day')
);

export const isSelectedRestaurant = createSelector(
   state => state.restaurants.selected,
   (state, props) => props.restaurant.id,
   (selectedIds, currentId) => selectedIds.some(id => id === currentId)
);

export const isFavoritedRestaurant = createSelector(
   state => state.restaurants.favorited,
   (state, props) => props.restaurant.id,
   (favoritedIds, currentId) => favoritedIds.some(id => id === currentId)
);
