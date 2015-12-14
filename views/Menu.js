'use strict';

import React from 'react-native';
import Base from './Base';
import Material from 'react-native-material-kit';
const {
   View,
   Text
} = React;
const {
   MKButton
} = Material;

const ColoredRaisedButton = MKButton.coloredButton()
  .withText('BUTTON')
  .withOnPress(() => {
    console.log("Hi, it's a colored button!");
  })
  .build();

class Menu extends React.Component {
   render() {
      return(
         <Base>
            <ColoredRaisedButton />
         </Base>
      );
   }
}

export default Menu;
