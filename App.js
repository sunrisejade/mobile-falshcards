import React from 'react'
import { StyleSheet,View } from 'react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'

import FlashCardsStatusBar from './components/FlashCardsStatusBar';
import {MainNavigator} from './components/MainNavigator'
import { setLocalNotification } from './utils/notification'
import {purple} from './utils/colors';


export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification()  
  }
  
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={styles.container}>
          <FlashCardsStatusBar  
              backgroundColor={purple} 
              barStyle="light-content"/>
          <MainNavigator />
        </View>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
