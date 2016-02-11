'use strict';
import React from 'react-native';

const {
   View,
   Text,
   Component
} = React;

class Property extends Component {
   shouldComponentUpdate() {
      return false;
   }
   getName(p) {
      const names = {
         'L': 'laktoositon',
         'G': 'gluteeniton',
         'VS': 'vähäsuolainen',
         'M': 'maidoton',
         'VL': 'vähälaktoosinen',
         'A': 'sisältää allergeenejä'
      };

      if (p in names)
         return names[p];

      return '';
   }
   getColor(p) {
      const colors = {
         'L': '#795548',
         'G': '#FF5722',
         'V': '#4CAF50',
         'M': '#E91E63',
         'VL': '#3F51B5',
         'A': '#607D8B'
      };

      if (p in colors)
         return colors[p];

      return '#9E9E9E';
   }
   render() {
      const p = this.props.children;
      const size = this.props.size || 16;
      const color = this.getColor(p);
      const large = this.props.large;
      return (
         <View style={{...this.props.containerStyle, flexDirection: 'row', alignItems: 'center'}}>
            <View key={p} style={{
                  ...this.props.style,
                  width: size,
                  height: size,
                  borderRadius: size / 2,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderColor: color,
                  borderWidth: 1
               }}>
               <Text style={{fontSize: 8, fontWeight: 'bold', color, backgroundColor: 'transparent'}}>{p}</Text>
            </View>
            {large ?
               <Text style={{marginLeft: 6}}>{this.getName(p)}</Text>
            : null}
         </View>
      );
   }
}

export default Property;