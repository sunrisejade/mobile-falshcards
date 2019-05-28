import React, { Component } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native'
import { getDecks } from '../utils/api'
import { connect } from 'react-redux'
import { receiveDecks } from '../actions'


class ListDecks extends Component {

  componentDidMount() {
    const { dispatch } = this.props
    
    getDecks().then(
      (decks) => dispatch(receiveDecks(decks))
    )
  }
  
  renderItem = ({ item }) => {
    return (
      <View>
        <TouchableOpacity 
          onPress={() => this.props.navigation.navigate(
            'Deck',
            { deck: item.title }
           
        )}>

        <View  style={styles.box}>
          <Text style={styles.cardName}>{item.title}</Text>
          <Text style={styles.cardNum}>{item.questions.length} cards</Text>
        </View>
        </TouchableOpacity>
      </View>
    )
  }  
  
  
  render() {
    const { decks } = this.props
    return (
      <View style={styles.container}>
        <FlatList
         data={Object.values(decks)}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => item.title}
        />
      </View>
    )
  }
}

function mapStateToProps (state) {
  return {
    decks: state
    // Object.keys(decks).map((deck) => (decks[deck]))
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
   
  },
   box: {   
    height:100,
    width: 250,
    borderRadius: 5,
    backgroundColor:"white",
    margin: 10,
    padding:10,
    justifyContent:'center',
    alignItems:'center',
  },
  cardName:{
    textAlign:"center",
    fontSize:18,
    fontWeight: "bold",
  },
  cardNum:{
    textAlign:"center",
    color:'#787878'
  }

});


export default connect(mapStateToProps)(ListDecks)
