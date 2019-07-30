import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBIv8bSrmTnqe1P-XoJBFdORinttHQUHiQ",
  authDomain: "react-ecommerce-db.firebaseapp.com",
  databaseURL: "https://react-ecommerce-db.firebaseio.com",
  projectId: "react-ecommerce-db",
  storageBucket: "",
  messagingSenderId: "439953958049",
  appId: "1:439953958049:web:3cec380fcac25c7c"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const { displayName, email, uid } = userAuth;
  const userRef = firestore.doc(`users/${uid}`);
  const userSnapShot = await userRef.get();
  if (!userSnapShot.exists) {
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("error creating a user: ", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
