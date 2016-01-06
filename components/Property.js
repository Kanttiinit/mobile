'use strict';
import React from 'react-native';
import {MKColor} from 'react-native-material-kit';

const {
   View,
   Text,
   Component
} = React;

class Property extends Component {
   getName(p) {
      const names = {
         'L': 'laktoositon',
         'G': 'gluteeniton',
         'VS': 'vähäsuolainen',
         'M': 'maidoton',
         'VL': 'vähälaktoosinen'
      };

      if (p in names)
         return names[p];

      return '???';
   }
   getColor(p) {
      const colors = {
         'L': MKColor.Brown,
         'G': MKColor.DeepOrange,
         'V': MKColor.Green,
         'M': MKColor.Pink,
         'VL': MKColor.Indigo,
         'A': MKColor.BlueGrey
      };

      if (p in colors)
         return colors[p];

      return MKColor.Grey;
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
