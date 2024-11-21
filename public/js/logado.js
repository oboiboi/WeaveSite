import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";

// Your web app's Firebase configuration
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

// UID autorizado para acesso à página de administração
const adminUID = "M2NrDuVbeKR51V37vYylN4cl6ql2"; // Substitua pelo UID do usuário administrador

onAuthStateChanged(auth, (user) => {
    if (user) {
        // Usuário autenticado
        document.querySelectorAll('[data-auth="signed-in"]').forEach(element => {
            element.style.display = 'block'; // Exibe os elementos para usuários autenticados
        });
        document.querySelectorAll('[data-auth="signed-out"]').forEach(element => {
            element.style.display = 'none'; // Oculta os elementos para usuários não autenticados
        });

        // Verifica se o e-mail foi verificado
        if (user.emailVerified) {
            // Oculta a página "vender" se o e-mail já foi verificado
            document.querySelectorAll('[data-page="vender"]').forEach(element => {
                element.style.display = 'none';
            });
        } else {
            // Exibe a página "vender" caso o e-mail não tenha sido verificado
            document.querySelectorAll('[data-page="vender"]').forEach(element => {
                element.style.display = 'block';
            });
        }

        // Verifica se o usuário é o administrador pelo UID
        if (user.uid === adminUID) {
            document.querySelectorAll('[data-page="admin"]').forEach(element => {
                element.style.display = 'block'; // Exibe a página de administração
            });
        } else {
            document.querySelectorAll('[data-page="admin"]').forEach(element => {
                element.style.display = 'none'; // Oculta a página de administração para outros usuários
            });
        }
    } else {
        // Usuário não autenticado
        document.querySelectorAll('[data-auth="signed-in"]').forEach(element => {
            element.style.display = 'none'; // Oculta os elementos para usuários autenticados
        });
        document.querySelectorAll('[data-auth="signed-out"]').forEach(element => {
            element.style.display = 'block'; // Exibe os elementos para usuários não autenticados
        });

        // Oculta a página "vender" para usuários não autenticados
        document.querySelectorAll('[data-page="vender"]').forEach(element => {
            element.style.display = 'none';
        });

        // Oculta a página "admin" para usuários não autenticados
        document.querySelectorAll('[data-page="admin"]').forEach(element => {
            element.style.display = 'none';
        });
    }
});
