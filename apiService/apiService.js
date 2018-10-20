import { cardValueToInt } from '../utils/cardUtils';

class ApiService {
  
    shuffleDeck = () => {
        return fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
        .then(res => res.json())
        .then(jsonRes => jsonRes.deck_id)
    }

     getCards = (deckId) => { 
        return fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
        .then(response=> response.json())
        .then(jsonRes => cardValueToInt(jsonRes.cards[0]));
          
    }

}

export const apiService = new ApiService(); 