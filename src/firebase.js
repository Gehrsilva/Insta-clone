  import firebase from "firebase";

  const firebaseApp = firebase.initializeApp({
  
        apiKey: "AIzaSyAcx3bI108vLUeef_KIKSqt-IZeHqdIlhU",
        authDomain: "photogram-project-react.firebaseapp.com",
        databaseURL: "https://photogram-project-react-default-rtdb.firebaseio.com",
        projectId: "photogram-project-react",
        storageBucket: "photogram-project-react.appspot.com",
        messagingSenderId: "249618618265",
        appId: "1:249618618265:web:99e11bb6b9630090d9e508",
        measurementId: "G-76L0BGXSVP"
   
  });

  const db = firebaseApp.firestore();
  const auth= firebase.auth();
  const storage = firebase.storage();

  export {db, auth, storage};