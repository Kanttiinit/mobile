import moment from 'moment';

export default function getMenus(state) {
   const {days, restaurants, now, favorites, selectedFavorites, location} = state;
   if (days && restaurants && now && favorites) {
      // iterate through all days
      return days.map(day => (
         {
            date: day,
            // iterate through all restaurants for each day
            restaurants: sortedRestaurants(
               restaurants.map(restaurant => {
                  let favoriteCourses = 0;
                  // iterate through courses for the current day
                  const courses = (restaurant.Menus.find(m => day.isSame(m.date, 'day')) || {courses: []})
                  .courses.map(course => {
                     const isFavorite = checkIfFavorite(course.title, favorites, selectedFavorites);
                     if (isFavorite)
                        favoriteCourses++;
                     return {...course, isFavorite};
                  });

                  const openingHours = getOpeningHours(restaurant, day);

                  return {
                     ...restaurant,
                     distance: location ? haversine(restaurant, location) * 1000 : undefined,
                     isOpen: courses.length > 1 ? openingHours.isOpen : false,
                     hours: courses.length > 1 ? openingHours.hours : undefined,
                     courses,
                     favoriteCourses
                  };
               }),
            now, day)
         }
      ));
   }
}

function sortedRestaurants(restaurants, now, date) {
   const isToday = moment().isSame(date, 'day');
   return restaurants.sort((a, b) => {
      // can this be written in a prettier way??
      if (!a.hours && b.hours) return 1;
      if (a.hours && !b.hours) return -1;
      if (!a.courses.length && b.courses.length) return 1;
      if (a.courses.length && !b.courses.length) return -1;
      if (isToday) {
         if (!a.isOpen && b.isOpen) return 1;
         if (a.isOpen && !b.isOpen) return -1;
      }
      if (!a.favoriteCourses && b.favoriteCourses) return 1;
      if (a.favoriteCourses && !b.favoriteCourses) return -1;
      if (a.distance > b.distance) return 1;
      if (a.distance < b.distance) return -1;
      if (a.name > b.name) return 1;
      if (a.name < b.name) return -1;

      return 0;
   });
}

function getOpeningHours(restaurant, date) {
   const now = Number(moment().format('HHmm'));
   const hours = restaurant.openingHours[date.day() - 1];
   return {hours, isOpen: hours && now >= hours[0] && now < hours[1]};
}

function checkIfFavorite(title, favorites, selectedFavorites) {
   if (title && selectedFavorites.length)
      return selectedFavorites
         .map(f => favorites.find(_ => _.id === f))
         .some(_ => title.match(new RegExp(_.regexp)));

   return false;
}
