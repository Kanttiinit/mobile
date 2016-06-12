import moment from 'moment';
import haversine from 'haversine';

export default function getMenus(days, restaurants, now, favorites, location) {
   console.log(arguments);
   if (days && restaurants && now && favorites) {
      // iterate through all days
      return days.map(day => {
         const dayString = day.format('YYYY-MM-DD');
         return {
            date: day,
            // iterate through all restaurants for each day
            restaurants: sortedRestaurants(
               restaurants.map(restaurant => {
                  let favoriteCourses = 0;

                  // iterate through courses for the current day
                  const coursesForDay = restaurant.Menus.find(m => dayString === m.day);
                  const courses = coursesForDay ? coursesForDay.courses.map(course => {
                     const isFavorite = checkIfFavorite(course.title, favorites);
                     if (isFavorite)
                        favoriteCourses++;
                     return {...course, isFavorite};
                  }) : [];

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
         };
      });
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

function checkIfFavorite(title, favorites) {
   if (title)
      return favorites.some(f =>
         f.selected && title.match(new RegExp(f.regexp, 'i'))
      );

   return false;
}
