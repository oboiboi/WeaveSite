import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

console.log("app: ", app);
console.log("auth: ", auth);

const email = document.getElementById('emailLogin');
const senha = document.getElementById('senhaLogin');
const btnLogin = document.getElementById('btnLogin');


btnLogin.addEventListener("click", logarUsuario);

function logarUsuario() {
    if(email.value != "" && senha.value != ""){
        signInWithEmailAndPassword(auth, email.value, senha.value)
        .then((userCredential) => {
            // Signed in 
            window.location.replace("perfil.html");
        })
        .catch((error) => {
           alert(getErrorCode(error))
        });
    } else {
        alert("Preencha todos os campos.")
    }
   
};

function getErrorCode(error) {
    switch(error.code) {
        case 'auth/invalid-credential':
        return "E-mail ou senha inválidos."
        case 'auth/too-many-requests':
        return "Muitas tentativas de login, tente novamente mais tarde." 
    }
}
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in
        window.location.href = "index.html";
    } else {
        // User is signed out
        console.log("Usuário não está logado.")
    }
});

