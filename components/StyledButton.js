import React from 'react';
import {StyleSheet,
          Platform, 
          Text,
          TouchableOpacity} from 'react-native';

import {purple,green, white} from '../utils/colors';


export default function SubmitBtn ({children, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={Platform.OS ==='ios'? styles.iosSubmitBtn : styles.AndroidSubmitBtn}>
      <Text style={styles.submitBtnText}>{children}</Text>
    </TouchableOpacity>
  )
}



const styles= StyleSheet.create({ 
  iosSubmitBtn: {
    width:200,
    margin: 12,
    fontSize: 14,
    backgroundColor: purple,
    padding: 12,
    alignItems: 'center',
    borderRadius: 3,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 2
  },
  AndroidSubmitBtn: {
    backgroundColor: purple,
    paddingRight: 30,
    height: 40,
    width:200,
    borderRadius: 2,
    alignSelf: "flex-end",
    justifyContent: "center",
    alignItems: "center"
  },
  submitBtnText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
})
