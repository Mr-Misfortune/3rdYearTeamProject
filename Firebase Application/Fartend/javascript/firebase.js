// firebase.js
import firebaseConfig from "./firebaseConfig.js";
import "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

export { db, auth, app };
