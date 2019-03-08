import * as firebase from 'firebase';
import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';

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
  const storage = app.storage();
  const db = app.firestore();

  return {
    doCreateUserWithEmailAndPassword: (email, password) => (
      auth.createUserWithEmailAndPassword(email, password)),

    doSignInWithEmailAndPassword: (email, password) => (
      auth.signInWithEmailAndPassword(email, password)),

    doSignOut: () => auth.signOut(),

    onAuthStateChange: (nextOrObserver, error, completed) => (
      auth.onAuthStateChanged(nextOrObserver, error, completed)),

    doUpdateUserProfile: profile => (auth.currentUser.updateProfile(profile)),

    doUploadFile: (filePath, file) => (storage.ref(filePath).put(file)),

    doSaveArticleHeader: ({
      inAuthorId, inAuthorName, inArticleName, inDescription,
    }) => (
      db.collection('posts').add({
        authorId: inAuthorId,
        authorName: inAuthorName,
        articleName: inArticleName,
        description: inDescription,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
    ),

    doCompletePost: (postRef, inFileUrl, inStorageUri = null) => (
      postRef.update({
        url: inFileUrl,
        storageUri: inStorageUri,
      })
    ),

    doDeletePost: async (postRef) => {
      await postRef.delete();
    },
  };
})();

export default firebaseApp;
