import React from 'react';
import {createBottomTabNavigator, createAppContainer, createMaterialTopTabNavigator,createStackNavigator} from 'react-navigation';
import {Platform } from 'react-native';
import {white,purple} from '../utils/colors';
import {MaterialIcons} from '@expo/vector-icons';
import AddDeck from './AddDeck'
import Deck from './Deck'
import AddCard from './AddCard'
import CardQuiz from './CardQuiz'
import ListDecks from './ListDecks'

const Tabs = createBottomTabNavigator ({
  ListDecks: {
    screen: ListDecks,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) =>
        Platform.OS === 'ios' && <MaterialIcons name="folder" size={30} color={tintColor} />,
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'AddDecks',
      tabBarIcon: ({ tintColor }) =>
        Platform.OS === 'ios' && <MaterialIcons name="add-box" size={30} color={tintColor} />,
    } 
  }
}, 
  {navigationOptions: {
    tabBarOptions: {
      showIcon: true,
      activeTintColor: Platform.OS === 'ios' ? purple: white,
      style: {
        height: 60,
        backgroundColor: white,
        shadowColor: "rgba(0, 0, 0, 0.24)",
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 1
      },
      labelStyle: {
        paddingTop: 3,
        fontSize: 14,
        fontWeight: "bold"
      }
    }
  }
  }
  )

export const MainNavigator  = createAppContainer(createStackNavigator ({
  Home: {
    screen: Tabs,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: { backgroundColor: purple },
      headerTitleStyle: { fontWeight: "bold" }
    }
  },
  Deck: {
    screen: Deck,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: { backgroundColor: purple },
      headerTitleStyle: { fontWeight: "bold" }
    }
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      headerTintColor: white,
      title: 'Add Card',
      headerStyle: { backgroundColor: purple },
    }
  },
  CardQuiz: {
    screen: CardQuiz,
    navigationOptions: {
      headerTintColor: white,
      title: 'Quiz',
      headerStyle: { backgroundColor: purple },
    }
  }
})
)
