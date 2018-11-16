import firebase from 'firebase';

const API_KEY = process.env.REACT_APP_API_KEY;

if (!API_KEY) {
  throw new Error('Missing apiKey env variable for Firebase');
}

// Initialize Firebase
const config = {
  apiKey: API_KEY,
  authDomain: "track-the-rack.firebaseapp.com",
  databaseURL: "https://track-the-rack.firebaseio.com",
  storageBucket: "track-the-rack.appspot.com",
};
firebase.initializeApp(config);

const database = firebase.database();

function getMeals() {
  return database.ref('/meals/').once('value').then(snapshot => {
    return Array.isArray(snapshot.val()) ? 
      snapshot.val()
      : 
      Object.values(snapshot.val())
  })
}

function updateMeals(meals) {
  return database.ref('meals/').set(meals);
}

function addMeal(meal) {
  return database.ref('meals/').push(meal);
}

function listenOnMeals(callback) {
  return database.ref('meals/').on('value', snapshot => {
    Array.isArray(snapshot.val()) ? 
      callback(snapshot.val())
      : 
      callback(Object.values(snapshot.val()))
  })
}

function getIngredients() {
  return database.ref('/ingredients/').once('value').then(snapshot => snapshot.val());
}

function updateIngredients(ingredients) {
  return database.ref('ingredients/').set(ingredients);
}

export default {
  getMeals,
  updateMeals,
  addMeal,
  listenOnMeals,
  getIngredients,
  updateIngredients
}