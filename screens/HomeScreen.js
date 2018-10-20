import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button
  
} from 'react-native';

import {Divider} from 'react-native-elements'
import { WebBrowser } from 'expo';
import {apiService } from '../apiService/apiService'
import { compareCards } from '../utils/cardUtils';
import { MonoText } from '../components/StyledText';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
   
  };
  constructor(props) {
    super(props);
    this.state = {
      card: {
        image: null,
        value: null
      },
      winLoose: null,
      deckId: null
    };
  }
 
  
  componentDidMount() {
    let deckId = null;
    apiService.shuffleDeck() //get deck id
     .then(deck_id => {
       deckId = deck_id;
       return apiService.getCards(deckId);//passed deck Id for fetch Cards
      })
      .then(card => {   
        this.setState({
          card,
          deckId
        });
      });
  }
  // Call new fetch and pass deckID
  bet(isBigger) {
    apiService.getCards(this.state.deckId)
      .then(card => {  
        this.setState({
          card,
          winLoose: compareCards(this.state.card, card, isBigger) //current Card, new Card, or Bigger on Lower
        });
      });
  }


  render() {

    const { card: { image }, winLoose } = this.state
    console.log(image);
    
    return (
      <View style={styles.container}>
         <View style={styles.center}>
        <Text style={styles.header}>Card Game</Text>
        <Divider style={{backgroundColor:'black'}}/>
        <Image
          style={styles.card}
          source={{uri:image}}
        />
           
         </View>
         <Button
              style={styles.button}
              title='UP'
              raised 
              onPress={()=>{this.bet(true)}}
          />
          <Button
              style={styles.button}
              title='DOWN'
              raised 
              onPress={()=>{this.bet(false)}}
          />
          <View style={styles.center}>
          <Text style={styles.info}>{winLoose}</Text>

          </View>

      </View>
    );
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use useful development
          tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
   
  },
  card:{
    width: 216, 
    height: 314,
    marginBottom:40
  
  },
  button:{
    width: 120
  },
  center:{
    justifyContent: 'center',
    alignItems: 'center'
    
  },
  info:{
    fontSize:30,
    color:'red'
  },
  header:{
    fontSize:30,
    color:'black'
  }
});
