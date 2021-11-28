import { collection, doc, addDoc, getFirestore, getDoc, getDocs, deleteDoc, onSnapshot, query, where  } from "firebase/firestore"; 
import _ from 'lodash';

import { app } from "./firebase";

const db = getFirestore();

//read specific data from tfirebase
export const readData = async (collectionName, docName) => {
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

export const listData = async (collectionName) => {
    const collectionSnap = await getDocs(collection(db, collectionName));
    const data = [];
    collectionSnap.forEach((doc) => {
        data.push({
            docId: doc.id,
            ...doc.data(), 
        });
    });
    return data;
}

//write data to firebase
export const writeData = async (collectionName, data) => {
    await addDoc(collection(db, collectionName), _.omitBy(data, _.isNil)); //omit null values before adding to firebase
}

//delete data from firebase
export const deleteData = async (collectionName, docID) => {
    await deleteDoc(doc(db, collectionName, docID));
}

//subscribe to firebase
// listen to a collection and callback if data changes
export const subscribeChange = (collectionName, callback) => {
    return onSnapshot(query(collection(db, collectionName)), (doc) =>callback(doc));
}

export const getRef = (collectionName) => {
    return collection(db, collectionName);
}
