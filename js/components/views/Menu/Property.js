import React from 'react';

import {View, Text} from 'react-native';

const names = {
   'L': 'laktoositon',
   'G': 'gluteeniton',
   'VS': 'sisältää tuoretta valkosipulia',
   'M': 'maidoton',
   'VL': 'vähälaktoosinen',
   'A': 'sisältää allergeenejä',
   'K': 'kasvis',
   'MU': 'munaton',
   'VE': 'vegaani',
   'T': 'terveellisempi valinta',
   'S': 'ei soijaa'
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

function getName(p) {
   if (p in names)
      return names[p];

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
      const {children, size = 16, large, containerStyle} = this.props;
      const color = getColor(children);
      const fontSize = large ? 12 : 10;
      const width = large ? 18 : undefined;

      return (
         <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{fontSize, width, fontWeight: 'bold', marginLeft: 3, color, backgroundColor: 'transparent'}}>{children}</Text>
            {large && <Text style={{marginLeft: 6}}>{getName(children)}</Text>}
         </View>
      );
   }
}
