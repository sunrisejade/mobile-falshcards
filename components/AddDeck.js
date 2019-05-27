import React, { Component } from 'react'
import { StyleSheet,View, Text, TextInput, KeyboardAvoidingView } from 'react-native';
import { saveDeckTitle } from '../utils/api';
import { connect } from 'react-redux';
import { addDeck } from '../actions';
import StyledButton from './StyledButton';

class AddDeck extends Component {
  state = {
    title: '',
    questions: []
  }
    
  handleSubmit = () => {
    // Save to redux store
    this.props.dispatch(addDeck(
      {
        [this.state.title]: {
          title: this.state.title,
          questions: []
        }
      }
    ))
    
    // Save to DB
    saveDeckTitle(this.state.title)
    
    // Navigate to new deck.
    this.props.navigation.navigate(
      'Deck',
      { deck: this.state.title }
    )
    
    // Clear title for next deck.
    this.setState(() => ({ title: '' }))    
  }
  
    
  render() {
    const { title } = this.state
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView 
          behavior='padding'
          style={styles.center}>
          <Text style={styles.text}>What is title of your new deck?</Text>
            <View style={styles.inputContainer}>
            <TextInput
              value={title}
              onChangeText={(text) => this.setState({title:text})}
              style={styles.input}
              placeholder={"Enter New Deck Name"}
            />
            </View>  
        </KeyboardAvoidingView>
          <StyledButton
            onPress={this.handleSubmit} >
            <Text>Create Deck</Text>
          </StyledButton>
      </View>
      
    )
  }
}

const styles = StyleSheet.create({
   container:{
    flex: 1,
    justifyContent: "space-around",
    alignItems: 'center',
    padding:20,
    backgroundColor: '#F5F5F5'
  },
  center:{
    alignItems: 'center',
  },
  text:{
    fontSize:25,
    textAlign:'center',
  },
  inputContainer:{
    borderWidth: 1,
    borderRadius: 3,
    height: 40,
    width:210,
    marginTop:15,
  },
  input:{
    backgroundColor: '#ffffff',
    padding: 10,
  }
})

export default connect()(AddDeck)