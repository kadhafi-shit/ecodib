// Importation des fonctions nécéssaires
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries



// configuration de firebase
const firebaseConfig = {
apiKey: "AIzaSyB_AYl63Feug_D1l5l5fA1ZjGvD6DdQUVI",
authDomain: "ecodib-f12cf.firebaseapp.com",
projectId: "ecodib-f12cf",
storageBucket: "ecodib-f12cf.firebasestorage.app",
messagingSenderId: "400900440441",
appId: "1:400900440441:web:0a4c9221ccbc71fe992fa8"
};



// Initialiser firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app);




// firebase login
// firebase initial
// firebase deploiement