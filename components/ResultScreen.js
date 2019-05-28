import React from 'react';
import {StyleSheet,
          Text,
          View,
          TouchableOpacity} from 'react-native';

import {white,green,grey} from '../utils/colors';

export default function ResultScreen (props){
  return (
    <View style={styles.container}>
    <View style={styles.resultCards}>
      <Text style={[styles.resultCardsText,{fontWeight:"bold"}]}>Total questions answered: {props.totalAnswered}</Text>
      <Text style={[styles.resultCardsText,{color:grey}]}>Your Score: {props.correct}</Text>
    </View>
    <View>
      <TouchableOpacity 
        onPress={()=>{
          props.restartQuiz();
          props.navigation.goBack()}}
        style={styles.iosRestartBtn}>
        <Text style={styles.BtnText}>Restart</Text>
      </TouchableOpacity> 
      <TouchableOpacity 
        onPress={()=>{
          props.navigation.goBack()}}
        style={styles.iosGoBackBtn}>
        <Text style={styles.BtnText}>Go Back</Text>
      </TouchableOpacity> 
    </View>
  </View>
  )  
}

const styles= StyleSheet.create({ 
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    justifyContent: "space-around",
    alignItems: 'center',
    padding:20,
  },
  resultCards:{
    backgroundColor: white,
    borderRadius: 5,
    width:250,
    padding:20,
    // justifyContent: "space-around",
    alignItems: 'center',
  },
  resultCardsText:{
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
    margin:10,
  },
  iosRestartBtn:{
    backgroundColor: 	green,
    padding: 10,
    borderRadius: 7,
    height: 40,
    width:200,
    marginTop:30,
    marginLeft: 30,
    marginRight: 30
  },
  iosGoBackBtn:{
    backgroundColor: 	grey,
    padding: 10,
    borderRadius: 7,
    height: 40,
    width:200,
    marginTop:30,
    marginLeft: 30,
    marginRight: 30
  },
  BtnText:{
    color: white,
    fontSize: 16,
    textAlign: 'center',
  },
})