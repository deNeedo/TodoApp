import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBTMmqNhDs-BiNxq4nHcN-5fa6lgySaSh4",
    authDomain: "to-do-app-2-deb8f.firebaseapp.com",
    projectId: "to-do-app-2-deb8f",
    storageBucket: "to-do-app-2-deb8f.appspot.com",
    messagingSenderId: "972108814482",
    appId: "1:972108814482:web:74b244d47a3fbb994cee4b",
    measurementId: "G-C33720XNYS"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
