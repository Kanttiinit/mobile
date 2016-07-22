import {createSelector} from 'reselect';
import _ from 'lodash';
import moment from 'moment';
import haversine from 'haversine';

const now = state => moment(state.misc.now);
const location = state => state.misc.location;
const restaurants = state => state.restaurants.restaurants;
const selectedRestaurantIds = state => state.restaurants.selected;
const favoritedRestaurantIds = state => state.restaurants.favorited;
const selectedFavoriteIds = state => state.favorites.selected;
const favorites = state => state.favorites.items;
const menus = state => state.data.menus;

function isOpen(openingHours, now) {
   const hours = openingHours[now.weekday()];
   if (hours) {
      const [open, close] = hours.split(' - ').map(n => moment(n, 'HH:mm'));
      return now.isAfter(open) && now.isBefore(close);
   }
   return false;
}

export const selectedRestaurants = createSelector(
   restaurants, selectedRestaurantIds,
   (all, selected) => all.filter(r => selected.has(r.id))
);

export const isFavorite = createSelector(
   favorites, selectedFavoriteIds, (state, props) => props.course.title,
   (all, selected, title) => selected.some(selectedId => {
      const favorite = all.find(f => f.id === selectedId);
      if (favorite) {
         return title.match(new RegExp(favorite.regexp, 'i'));
      }
   })
 );

export const isAreaChecked = createSelector(
   selectedRestaurantIds, (state, props) => props.area.restaurants,
   (selectedRestaurantIds, areaRestaurants) =>
      areaRestaurants.every(r => selectedRestaurantIds.has(r.id))
);

export const isRestaurantFavorited = createSelector(
   favoritedRestaurantIds, (state, props) => props.restaurant.id,
   (favoritedIds, restaurantId) => favoritedIds.has(restaurantId)
);

export const getCourseFavorites = createSelector(
   favorites, (state, props) => props.course.title,
   (favorites, courseTitle) =>
      _.sortBy(favorites.filter(f => courseTitle.match(new RegExp(f.regexp, 'i'))), 'name')
);

export const formatRestaurants = createSelector(
   (state, props) => props.restaurants,
   menus,
   (state, props) => props.day,
   (restaurants, menus, day) => _.orderBy(
      restaurants.map(restaurant => {
         const courses = _.get(menus, [restaurant.id, day], []);
         return {...restaurant, courses, noCourses: !courses.length};
      }),
   ['noCourses'])
);

export const isToday = createSelector(
   now, (state, props) => props.day,
   (now, day) => now.isSame(moment(day), 'day')
);

export const isSelectedRestaurant = createSelector(
   selectedRestaurantIds, (state, props) => props.restaurant.id,
   (selectedIds, currentId) => selectedIds.has(currentId)
);

export const orderedRestaurants = createSelector(
   selectedRestaurants, location, now, favoritedRestaurantIds,
   (restaurants, location, now, favorited) =>
      _.orderBy(
         restaurants.map(restaurant =>
            ({
               ...restaurant,
               distance: location ? haversine(location, restaurant) : undefined,
               isOpen: isOpen(restaurant.openingHours, now),
               favorited: favorited.has(restaurant.id)
            })
         ),
         ['favorited', 'isOpen', 'distance'],
         ['desc', 'desc', 'asc']
      )
);
