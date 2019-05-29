import { AsyncStorage } from 'react-native'

const STORAGE_KEY = 'StorageKey:flashcards'

const DEFAULT_STATE = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
}

/**
 * Return all of the decks along with their titles, questions, and answers.
 */ 
export function getDecks() {
  return AsyncStorage.getItem(STORAGE_KEY).then(result => {
    if(result !== null) {
      return JSON.parse(result) 
    } else {
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_STATE));
      return DEFAULT_STATE;
    }
  });
}
/**
 * Take in a single title argument and add it to the decks. 
 */
export function saveDeckTitle (title) {
  return AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify({
    [title]: {
      title: title,
      questions: []
    } 
  }))
}

/**
 * Take in two arguments, title and card, and will add the card to the list of 
 * questions for the deck with the associated title. 
 */ 
export function addCardToDeck (title, card) {
  AsyncStorage.getItem(STORAGE_KEY).then((response) => {
    const data = JSON.parse(response)
    const questions = data[title].questions
    questions.push(card)
    return AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify({
      [title]: {
        title: title,
        questions: questions
      }      
    }))
  })
}

/**
 * Remove deck and it's questions. 
 */ 
export function deleteDeck (title) {
  return AsyncStorage.getItem(STORAGE_KEY).then((response) => {
    const data = JSON.parse(response)
    data[title] = undefined
    delete data[title]
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  })
}