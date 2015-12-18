'use strict';
import moment from 'moment';
import {AsyncStorage} from 'react-native';

export default {
	get(url, maxAge) {
		AsyncStorage.getItem(url)
		.then(item => {
			if (item) {
				const data = JSON.parse(item);
				if (moment().subtract(maxAge).isBefore(moment(data.date)))
					return data.json;
			}

			return fetch(url)
			.then(r => r.json())
			.then(json => {
				const date = moment();
				return AsyncStorage.setItem(url, JSON.stringify({json, date}));
			})
			.then(d => d.json);
		});
	}
};