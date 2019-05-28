import React, { Component } from 'react'
import { StyleSheet,
          View, 
          Text, 
          TextInput, 
          KeyboardAvoidingView } from 'react-native';
// import {FormValidationMessage } from 'react-native-elements';
import { saveDeckTitle } from '../utils/api';
import { connect } from 'react-redux';
import { addDeck } from '../actions';
import StyledButton from './StyledButton';

class AddDeck extends Component {
  state = {
    title: '',
    questions: [],
    errorMessage:false
  }
    
  handleSubmit = () => {
    if(this.state.title){
    
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
    this.setState({errorMessage:false}) 
  }else{
    this.setState({errorMessage:true})
  }
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
            <Text style={styles.errorMessage}> {this.state.errorMessage===true? "You cannot create blank deck" : ''}</Text>
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
  errorMessage:{
    marginTop:5,
    textAlign: 'center',
    fontSize: 14
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