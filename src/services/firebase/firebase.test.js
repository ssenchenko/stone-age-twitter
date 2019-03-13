import firebaseApp from './firebase';

test('Firebase App object', () => {
  expect(firebaseApp).toHaveProperty('doCreateUserWithEmailAndPassword');
  expect(firebaseApp).toHaveProperty('doSignInWithEmailAndPassword');
  expect(firebaseApp).toHaveProperty('doSignOut');
});
