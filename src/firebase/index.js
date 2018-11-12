import * as firebase from 'firebase';

// Initialize Firebase
const config = {
  apiKey: "AIzaSyD5un_OIp8bnwaOpXcQhG4j5Taeus-vhyY",
  authDomain: "track-the-rack.firebaseapp.com",
  databaseURL: "https://track-the-rack.firebaseio.com",
  projectId: "track-the-rack",
  storageBucket: "track-the-rack.appspot.com",
  messagingSenderId: "562811217603"
};
firebase.initializeApp(config);

const database = firebase.database();

function getMeals() {
  return database.ref('/meals/').once('value').then(snapshot => snapshot.val())
}

function updateMeals(meals) {
  return database.ref('meals/').set(meals);
}

export default {
  getMeals,
  updateMeals
}