import React, { Component } from 'react'
import { StyleSheet, Text, TouchableOpacity, View,Platform } from 'react-native'
import { connect } from 'react-redux'
import { clearLocalNotification, setLocalNotification } from '../utils/notification'
import NoCards from './NoCards'
import ResultScreen from './ResultScreen'
import {white,green,red} from '../utils/colors';

class CardQuiz extends Component {
  state={
    checkAnswer:false,
    correctAnswerCount: 0,
    incorrectAnswerCount: 0,
    currentQuestionIndex: 0,
    showScore:false,
    questionRemaining:this.props.deck.questions.length,
  }
  showAnswer(){
    this.setState(
      {
        checkAnswer:true,
      }
    )
  }
  showQuestion(){
    this.setState(
      {
        checkAnswer:false,
      }
    )
  }
  handelUserAnswered(answer){
    const { deck } = this.props;
    if(answer==='Correct'){
      this.setState({
        correctAnswerCount:this.state.correctAnswerCount+1
      })
    }
    if(this.state.currentQuestionIndex === deck.questions.length -1) {
      this.setState({ 
        showScore: true 
      })
    }else{
        this.setState({
          currentQuestionIndex:this.state.currentQuestionIndex+1,
          questionRemaining:this.state.questionRemaining-1,
        })  
      } 
  }

  restartQuiz = () => {
    this.setState({
      correctAnswerCount: 0,
      incorrectAnswerCount: 0,
      currentQuestionIndex: 0,
      showScore:false,
    })
  }

  render(){
    const { navigation,deck } = this.props;
    const {currentQuestionIndex,correctAnswerCount} = this.state;
    const correctPercentage = Math.round(correctAnswerCount/deck.questions.length*100)

      if(deck.questions.length === 0) {
          return <NoCards/>
        }

      if(this.state.showScore===true){
        return (
        <ResultScreen 
          totalAnswered={deck.questions.length}   
          correct={correctPercentage} 
          navigation={navigation} 
          restartQuiz={this.restartQuiz}
            />
        )
      }
      return(
        <View style={styles.container}>
            <View style={styles.card} >

            {this.state.checkAnswer===false ?
              (
              <View>
                  <Text style={styles.boldText}>{deck.questions[currentQuestionIndex].question}</Text>
                    <TouchableOpacity                   
                    onPress={this.showAnswer.bind(this)}
                    > 
                    <Text style={styles.text}>Check Answer</Text>
                    </TouchableOpacity> 
              </View> )
            :    
              (<View>
                <Text style={styles.boldText}>{deck.questions[currentQuestionIndex].answer}</Text>
                  <TouchableOpacity                   
                    onPress={this.showQuestion.bind(this)}
                    > 
                    <Text style={styles.text}>Check Question</Text>
                  </TouchableOpacity> 
              </View>) 
            }     
          </View>
          <Text style={styles.text}>{this.state.questionRemaining} questions remaining</Text>
          <View> 
            <TouchableOpacity 
              onPress={this.handelUserAnswered.bind(this,'Correct')}
              style={Platform.OS ==='ios'? styles.iosCorrectBtn : styles.AndroidCorrectBtn}>
              <Text style={styles.BtnText}>Correct</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              onPress={this.handelUserAnswered.bind(this,'Incorrect')}
              style={Platform.OS ==='ios'? styles.iosIncorrectBtn : styles.AndroidIncorrectBtn}>
              <Text style={styles.BtnText}>Incorrect</Text>
            </TouchableOpacity> 
          </View>
        </View>  
    )
  }

}



const mapStateToProps = (state,{ navigation }) => {
  return {
    deck:state[navigation.getParam('deck')],  
  }
  
}


export default connect(
  mapStateToProps,
  null
)(CardQuiz);



const styles= StyleSheet.create({ 
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    justifyContent: "space-around",
    alignItems: 'center',
    padding:20,
  },
  card:{
    backgroundColor: white,
    borderRadius: 5,
    width:250,
    padding:20
    
  },
  iosCorrectBtn:{
    backgroundColor: 	green,
    padding: 10,
    borderRadius: 7,
    height: 40,
    width:200,
    marginTop:30,
    marginLeft: 30,
    marginRight: 30
  },
  iosIncorrectBtn:{
    backgroundColor: red,
    padding: 10,
    borderRadius: 7,
    height: 40,
    width:200,
    marginTop:30,
    marginLeft: 30,
    marginRight: 30
  },
  AndroidCorrectBtn:{
    backgroundColor: 	green,
    paddingRight: 30,
    height: 40,
    width:200,
    borderRadius: 2,
    alignSelf: "flex-end",
    justifyContent: "center",
    alignItems: "center"
  },
  AndroidIncorrectBtn:{
    backgroundColor:'#DCDCDC',
    paddingRight: 30,
    height: 40,
    width:200,
    borderRadius: 2,
    alignSelf: "flex-end",
    justifyContent: "center",
    alignItems: "center"
  },
  boldText:{
    textAlign:"center",
    fontSize:15,
    fontWeight: "bold",
    margin: 10,
  },
  text:{
    textAlign:"center",
    color:'#787878',
    margin: 10,
  },
  BtnText:{
    color: white,
    fontSize: 16,
    textAlign: 'center',
  },
 }
)



