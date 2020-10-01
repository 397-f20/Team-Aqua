import * as firebase from "firebase";

import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAIzpz2NYBTDXynbGj995JyXXQxHkDqn_4",
  authDomain: "thespot-77b20.firebaseapp.com",
  databaseURL: "https://thespot-77b20.firebaseio.com",
  projectId: "thespot-77b20",
  storageBucket: "thespot-77b20.appspot.com",
  messagingSenderId: "480654285541",
  appId: "1:480654285541:web:33d762451c040a4062520c",
  measurementId: "G-T6430PD5E5",
};

firebase.initializeApp(firebaseConfig);

export { firebase };
