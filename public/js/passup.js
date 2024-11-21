import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
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

// Lógica do botão "Esqueci minha senha"
document.getElementById("btnForgotPassword").addEventListener("click", () => {
    const email = document.getElementById("emailLogin").value;

    if (!email) {
        alert("Por favor, insira seu e-mail antes de tentar redefinir a senha.");
        return;
    }

    sendPasswordResetEmail(auth, email)
    .then(() => {
        // O e-mail foi enviado com sucesso
        console.log("E-mail de redefinição enviado com sucesso para:", email);
        alert("Não foi possível enviar o e-mail. Verifique se o endereço está correto ou tente novamente mais tarde.");
    })
    .catch((error) => {
        // Capture e trate erros reais
        console.error("Erro ao enviar e-mail de redefinição:", error.code, error.message);
        
        // Mensagem ao usuário dependendo do tipo de erro
        switch (error.code) {
            case 'auth/invalid-email':
                alert("O endereço de e-mail inserido é inválido.");
                break;
            case 'auth/user-not-found':
                alert("Nenhum usuário encontrado com este e-mail.");
                break;
            case 'auth/too-many-requests':
                alert("Muitas tentativas recentes. Tente novamente mais tarde.");
                break;
            default:
                alert("Um e-mail de redefinição de senha foi enviado. Verifique sua caixa de entrada.");
        }
    });


});
