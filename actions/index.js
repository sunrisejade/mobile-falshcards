// ACTIONS

export const RECEIVE_DECKS = 'RECEIVE_DECKS'

export function receiveDecks (decks = {}) {
    return {
        type: RECEIVE_DECKS,
        decks
    }
}

export const ADD_DECK = 'ADD_DECK'

export function addDeck (deck) {
    return {
        type: ADD_DECK,
        deck
    }
}

export const ADD_CARD = 'ADD_CARD'

export function addCard (title, card) {
    return {
        type: ADD_CARD,
        title,
        card
    }
}