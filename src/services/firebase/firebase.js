import app from 'firebase/app';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyATTTMKK-zoSVNCk7ZaR-D6HWMGqUAFOM8',
  authDomain: 'crowdlinker-test.firebaseapp.com',
  databaseURL: 'https://crowdlinker-test.firebaseio.com',
  projectId: 'crowdlinker-test',
  storageBucket: 'crowdlinker-test.appspot.com',
  messagingSenderId: '751054441793',
};

const firebaseApp = (() => {
  app.initializeApp(config);
  const auth = app.auth();

  return {
    doCreateUserWithEmailAndPassword: (email, password) => (
      auth.createUserWithEmailAndPassword(email, password)),

    doSignInWithEmailAndPassword: (email, password) => (
      auth.signInWithEmailAndPassword(email, password)),

    doSignOut: () => auth.signOut(),

    onAuthStateChange: (nextOrObserver, error, completed) => (
      auth.onAuthStateChanged(nextOrObserver, error, completed)),
  };
})();

export default firebaseApp;
