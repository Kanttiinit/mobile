import moment from 'moment';
import {AsyncStorage} from 'react-native';

const API_BASE = 'https://api.kanttiinit.fi';

export default {
	get(key, url, maxAge) {
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
			.then(d => r);
		});
	},
	reset(key) {
		return AsyncStorage.removeItem(key);
	}
};
