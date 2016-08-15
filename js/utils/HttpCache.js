import moment from 'moment';
import {AsyncStorage} from 'react-native';

const API_BASE = 'https://kitchen.kanttiinit.fi';

export default {
  get(key, url, lang, maxAge) {
    key = `HTTPCache-${key}-${lang}`;
    url = `${url}&lang=${lang}`;
    return AsyncStorage.getItem(key)
    .then(item => {
      if (item) {
        const data = JSON.parse(item);
        if (moment().subtract(maxAge).isBefore(moment(data.date))) {
          console.log('cache hit', url);
          return data.json;
        }
      }
      console.log('cache miss', url);
      let r;
      return fetch(API_BASE + url)
      .then(r => r.json())
      .then(json => {
        r = json;
        return AsyncStorage.setItem(key, JSON.stringify({json, date: moment()}));
      })
      .then(() => r);
    });
  },
  reset(key) {
    return AsyncStorage.removeItem(key);
  }
};
