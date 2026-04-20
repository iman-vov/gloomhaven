const firebaseConfig = {
  apiKey: "AIzaSyCK1MVEMbOHG_sLUy7_tWq8C5DL2mxeRQo",
  authDomain: "gloomhaven-session.firebaseapp.com",
  databaseURL: "https://gloomhaven-session-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "gloomhaven-session",
  storageBucket: "gloomhaven-session.firebasestorage.app",
  messagingSenderId: "898892539910",
  appId: "1:898892539910:web:533bee04c567bdc301fb87"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();
