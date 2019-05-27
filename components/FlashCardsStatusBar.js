import React from 'react';
import { View, StatusBar } from 'react-native'
import { Constants } from 'expo'

// Constants.statusBarHeight help to get the accurate height for statusbar

export default function FlashCardsStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}