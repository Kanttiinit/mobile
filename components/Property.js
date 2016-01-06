'use strict';
import React from 'react-native';
import {MKColor} from 'react-native-material-kit';

const {
   View,
   Text,
   Component
} = React;

class Property extends Component {
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
      return (
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
      );
   }
}

export default Property;
