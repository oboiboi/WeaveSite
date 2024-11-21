// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";
import { getFirestore, collection, query, where, getDocs, getDoc, doc, addDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";


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
const db = getFirestore(app);

const username = document.getElementById('usernameCad');
const email = document.getElementById('emailCad');
const senha = document.getElementById('senhaCad');
const confirmarSenha = document.getElementById('confirmarSenhaCad');
const btnCad = document.getElementById('btnCad');


btnCad.addEventListener("click", criarConta);

function getErrorCode(error) {
    switch (error.code) {
        case 'auth/invalid-credential':
            return "E-mail ou senha inválidos."
        case 'auth/too-many-requests':
            return "Muitas tentativas de login, tente novamente mais tarde."
    }
}


async function criarConta() {

    const usernameValue = document.getElementById('usernameCad').value

    // Verifica se todos os campos estão preenchidos
    if (username.value != "" && email.value != "" && senha.value != "" && confirmarSenha.value != "") {
        // Verifica se as senhas coincidem
        if (senha.value == confirmarSenha.value) {
            const dadosExistentes = await verificarNomeDeUsuarioExistente(usernameValue);
            // Verifica se o nome de usuário já está em uso
            if (!dadosExistentes) {
                try {
                    const newUser = await createUserWithEmailAndPassword(auth, email.value, senha.value)
                    console.log("asfasdgas", newUser.user.uid)
                    await setDoc(doc(db, "usuarios", newUser.user.uid), {
                        username: username.value,
                        email: email.value,
                        senha: senha.value,
                        status: "ativo"
                      });

                      window.location.replace("index.html");
                } catch (error) {
                    console.error("Erro ao criar usuário: ", error);
                    alert('Erro ao criar conta: ' + error.message);
                }
            } else {
                alert('Este nome de usuário já está sendo utilizado.');
            }
        } else {
            alert('As senhas não coincidem.');
        }
    } else {
        alert('Preencha todos os campos.');
    }

}

async function verificarNomeDeUsuarioExistente(usernameValue) {
    const q = query(collection(db, "usuarios"), where("username", "==", usernameValue));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty; // Retorna true se existir, caso contrário, false
}



