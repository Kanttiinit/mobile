import React from 'react';

import {View, Text} from 'react-native';

const names = {
  'L': {'fi': 'laktoositon', 'en': 'lactose-free'},
  'G': {'fi': 'gluteeniton', 'en': 'glutein-free'},
  'VS': {'fi': 'sisältää tuoretta valkosipulia', 'en': 'includes fresh garlic'},
  'M': {'fi': 'maidoton', 'en': 'dairy-free'},
  'VL': {'fi': 'vähälaktoosinen', 'en': 'low-lactose'},
  'A': {'fi': 'sisältää allergeenejä', 'en': 'includes allergens'},
  'K': {'fi': 'kasvis', 'en': 'vegetarian'},
  'MU': {'fi': 'munaton', 'en': 'egg-free'},
  'VE': {'fi': 'vegaani', 'en': 'vegan'},
  'T': {'fi': 'terveellisempi valinta', 'en': 'more healthy choice'},
  'S': {'fi': 'ei soijaa', 'en': 'soy-free'}
};

const colors = {
  'L': '#795548',
  'G': '#FF5722',
  'V': '#4CAF50',
  'M': '#E91E63',
  'VL': '#3F51B5',
  'A': '#607D8B',
  'K': '#168b33',
  'VE': '#4CAF50'
};

function getName(p, lang) {
  if (p in names)
    return names[p][lang];

  return 'tuntematon';
}

function getColor(p) {
  if (p in colors)
    return colors[p];

  return '#9E9E9E';
}

export default class Property extends React.Component {
  shouldComponentUpdate(props) {
    return props.children !== this.props.children;
  }
  render() {
    const {children, large, lang} = this.props;
    const color = getColor(children);
    const fontSize = large ? 12 : 10;
    const width = large ? 18 : undefined;

    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={{fontSize, width, fontWeight: 'bold', marginLeft: 3, color, backgroundColor: 'transparent'}}>{children}</Text>
        {large && <Text style={{marginLeft: 6}}>{getName(children, lang)}</Text>}
      </View>
    );
  }
}
