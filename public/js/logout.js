import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBEQNP7Avbu_2jPIrHrYvnTh3ypr3xUnLE",
    authDomain: "weave-e.firebaseapp.com",
    projectId: "weave-e",
    storageBucket: "weave-e.appspot.com",
    messagingSenderId: "550401847476",
    appId: "1:550401847476:web:bb3ec0e4bcfa6af9c667e1",
    measurementId: "G-7WZW49T0JH"
};

const btnSair = document.getElementById('btnSair');

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


btnSair.addEventListener('click', sair);

function sair() {
    signOut(auth).then(() => {
        // Sign-out successful.
        window.location.replace("login.html")
      }).catch((error) => {
        // An error happened.
        console.log("Código do erro: " + errorCode + " Erro mensagem: " + errorMessage);
      });  
}


