import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyBkpdzJsV_WCkJm4kpqvcUzZRe3b4Md0rs',
  authDomain: 'crwn-db-370c8.firebaseapp.com',
  databaseURL: 'https://crwn-db-370c8.firebaseio.com',
  projectId: 'crwn-db-370c8',
  storageBucket: 'crwn-db-370c8.appspot.com',
  messagingSenderId: '983870942637',
  appId: '1:983870942637:web:e88d9655012e0d9c1d0524',
  measurementId: 'G-7MF51MDSE1',
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
