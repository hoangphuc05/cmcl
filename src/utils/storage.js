import { getStorage, uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { app } from "./firebase";
import { v4 as uuidv4 } from 'uuid';

// Get a reference to the storage service
const storage = getStorage(app);

export const uploadFile = async (file,  name=uuidv4()) => {

    const snapshot = await uploadBytes(ref(storage, name), file)
    const url = await getDownloadURL(snapshot.ref);
    return url;
}

export const getDownloadUrl = async (name) => {
    return await getDownloadURL(ref(storage, name));
}