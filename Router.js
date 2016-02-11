'use strict';

import React from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-simple-modal';
import {connect} from 'react-redux'

import Button from './components/Button';
import {changeView, dismissModal} from './store/actions';
import {colors} from './style';

const {
   StyleSheet,
   Text,
   View,
   Navigator,
   StatusBarIOS,
   Platform,
   DeviceEventEmitter
} = React;

class TabButton extends React.Component {
   render() {
      const {data, changeScene, parent, current, icon} = this.props;
      const textColor = current ? colors.accent : '#666666';
      const backgroundColor = current ? '#e3e0e0' : colors.lightGrey;
      return (
         <Button
            rippleColor="rgba(0, 150, 136, 0.1)"
            backgroundColor={backgroundColor}
            onPress={() => changeScene(data)} style={styles.tabButton}>
            <Icon name={icon} size={18} color={textColor} />
            <Text style={{fontSize: 12, color: textColor}}>{data.title}</Text>
         </Button>
      );
   }
}

class Router extends React.Component {
   constructor() {
      super();
      this.state = {};

      Platform.OS == 'ios' && StatusBarIOS.setStyle('light-content');
   }
   changeScene(data) {
      this.refs.navigator.jumpTo(data);
      this.props.changeView(data.title);
   }
   componentDidMount() {
      DeviceEventEmitter.addListener('keyboardDidShow', () => {
         this.refs.modal.animateOffset(-100);
      });
      DeviceEventEmitter.addListener('keyboardDidHide', () => {
         this.refs.modal.animateOffset(0);
      });
   }
   componentDidUpdate() {
      if (this.props.modal.visible)
         this.refs.modal.open();
      else
         this.refs.modal.close();
   }
   render() {
      const {views, currentView, modal} = this.props;
      return (
         <View style={styles.wrapper}>
            {Platform.OS === 'ios' ? <View style={{height:20, backgroundColor:colors.accent}}></View> : null}
            <Navigator
               ref="navigator"
               style={{flex: 1}}
               initialRoute={views[0]}
               initialRouteStack={views}
               renderScene={route=> React.createElement(route.component)} />
            <View style={styles.tabBar}>
               {views.map(v =>
                  <TabButton
                     current={currentView === v.title}
                     changeScene={this.changeScene.bind(this)}
                     icon={v.icon}
                     key={v.title}
                     data={v} />
               )}
            </View>
            <Modal
               ref="modal"
               modalDidClose={() => this.props.dismissModal()}
               renderContent={() => modal.component} />
         </View>
      );
   }
};

const styles = StyleSheet.create({
   wrapper: {
      flex: 1,
      backgroundColor: colors.lightGrey
   },
   tabBar: {
      borderTopWidth: 1,
      borderTopColor: '#d7d7d7',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
   },
   tabButton: {
     flex: 1,
     padding: 8,
     alignItems: 'center'
   }
});

const stateToProps = state => ({
   currentView: state.currentView,
   views: state.views,
   modal: state.modal
});

const dispatchToProps = dispatch => ({
   changeView: view => dispatch(changeView(view)),
   dismissModal: () => dispatch(dismissModal())
});

export default connect(stateToProps, dispatchToProps)(Router);
