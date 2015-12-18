'use strict';
import moment from 'moment';
import {AsyncStorage} from 'react-native';

export default {
	get(url, maxAge) {
		return AsyncStorage.getItem(url)
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
			return fetch(url)
			.then(r => r.json())
			.then(json => {
				r = json;
				return AsyncStorage.setItem(url, JSON.stringify({json, date: moment()}));
			})
			.then(d => r);
		});
	}
};
