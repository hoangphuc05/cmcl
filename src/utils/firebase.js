import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup  } from "firebase/auth";
import { collection, doc, setDoc, getFirestore, getDoc  } from "firebase/firestore"; 

const firebaseConfig = {
    apiKey: "AIzaSyCjxS6G8drG-RccsKEMs8Uyy6oxARs2DRg",
    authDomain: "meww-5bb18.firebaseapp.com",
    projectId: "meww-5bb18",
    storageBucket: "meww-5bb18.appspot.com",
    messagingSenderId: "262774623253",
    appId: "1:262774623253:web:1b40e9b342f5d77af1d21c",
    measurementId: "G-QYGN2F4L4X"
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// export default app;

const provider = new GoogleAuthProvider();
const auth = getAuth()

const signInWithGoogle = async () => {

}

//read data from firestore
export const readData = async (collectionName, docName) => {
    const db = getFirestore();
    const docSnap = await getDoc(doc(db, collectionName, docName));
    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        return docSnap.data();
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        return null;
    }
}

// export * from "./firebase";