import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  // 各人の認証情報を記述
  apiKey: "AIzaSyC6QjV4lG4dgJ6DPA0aAXwn030lfGZ7h6o",
  authDomain: "questionnaire-3feda.firebaseapp.com",
  projectId: "questionnaire-3feda",
  storageBucket: "questionnaire-3feda.appspot.com",
  messagingSenderId: "922608370217",
  appId: "1:922608370217:web:a77ad12b40cfb39adfd238",
  measurementId: "G-8FHVGLPB5W"
};

firebase.initializeApp(firebaseConfig);

export default firebase;