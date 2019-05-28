import React from 'react';
import {StyleSheet,
          Text,
          View} from 'react-native';


export default function NoCards (){
  return (
    <View style={styles.noCards}>
      <Text style={styles.noCardsText}>Sorry, you could not take quiz because there are no cards in the deck.</Text>
    </View>
  )  
}

const styles= StyleSheet.create({ 
  noCards:{
    flex: 1,
    backgroundColor: '#F5F5F5',
    justifyContent: "space-around",
    alignItems: 'center',
    padding:20,
  },
  noCardsText:{
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
  }
})