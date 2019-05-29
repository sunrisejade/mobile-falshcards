import React, { Component } from 'react'
import { StyleSheet, Text, TouchableOpacity, View,Platform } from 'react-native'
import { connect } from 'react-redux'
import { receiveDecks } from '../actions'
import { deleteDeck, getDecks } from '../utils/api'
import {purple,green, white} from '../utils/colors';

class Deck extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam("deck"),
  });


  
  handleDeleteDeck = () => {
    const { deck, dispatch } = this.props
        
    // Delete from DB.
    deleteDeck(deck.title).then(() =>
      // Update redux store.
      getDecks().then(
        (decks) => dispatch(receiveDecks(decks))
      )
    )
    
    // Navigate to Decks.
    this.props.navigation.navigate(
      'ListDecks'
    )  
  }
  
  
  render() {
    const { deck } = this.props
     // here should add a condition if this deck exist then render it otherwise when u delete this deck ,it will throw error that deck.title undefined
     return (
      <View style={styles.container}>
        { deck && (
          <View style={{ flex: 1,justifyContent :"space-around"}}>
            <View style={styles.box}>      
              <Text style={styles.cardName}>{deck.title}</Text>
              <Text style={styles.cardNum}>{deck.questions.length} cards</Text>
            </View>
          <View >
          <TouchableOpacity 
            style={Platform.OS ==='ios'? styles.iosAddCardBtn : styles.AndroidAddCardBtn}
            onPress={() => this.props.navigation.navigate(
              'AddCard',
              { deck: deck.title }
            )}>
            <Text style={styles.BtnText}>Add Card</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={Platform.OS ==='ios'? styles.iosStartQuizBtn : styles.AndroidStartQuizBtn}
            onPress={() => this.props.navigation.navigate(
              'CardQuiz',
              { deck: deck.title }
            )}>
            <Text style={styles.BtnText}>Start Quiz</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={this.handleDeleteDeck}>
            <Text style={styles.deleteBtn}>Delete Deck</Text>
          </TouchableOpacity>
        </View>
      </View>
      )}

     </View> 
     )  
  }
}

function mapStateToProps(state, { navigation }) {
  return {
    deck:state[navigation.getParam("deck")],  
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    // justifyContent: "space-around",
    alignItems: 'center',
    padding:20,
  },
  box: {
    backgroundColor:white,
    justifyContent: "center",
    alignItems: 'center',
    height: 100,
    width: 200,
    borderRadius: 7,
    marginLeft: 30,
  },
  cardName:{
    textAlign:"center",
    fontSize:18,
    fontWeight: "bold",
  },
  cardNum:{
    textAlign:"center",
    color:'#787878'
  },
  deleteBtn:{
    margin:15,
    textAlign:"center",
  },
  iosAddCardBtn: {
    backgroundColor: green,
    padding: 10,
    borderRadius: 7,
    height: 40,
    width:200,
    marginLeft: 30,
    marginRight: 30
  },
  AndroidAddCardBtn: {
    backgroundColor: purple,
    paddingRight: 30,
    height: 40,
    width:200,
    borderRadius: 2,
    alignSelf: "flex-end",
    justifyContent: "center",
    alignItems: "center"
  },
  iosStartQuizBtn:{
    backgroundColor: 	'#DCDCDC',
    padding: 10,
    borderRadius: 7,
    height: 40,
    width:200,
    marginTop:30,
    marginLeft: 30,
    marginRight: 30
  },
  AndroidStartQuizBtn:{
    backgroundColor: 	'#DCDCDC',
    paddingRight: 30,
    height: 40,
    width:200,
    borderRadius: 2,
    alignSelf: "flex-end",
    justifyContent: "center",
    alignItems: "center"
  },
  BtnText:{
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
})

export default connect(mapStateToProps)(Deck)