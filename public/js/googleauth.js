// IMPORTANDO OS SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js"; // ESSE FUNCIONA PARA INICIAR A CONEXÃO
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js"; // ESSES PEGAM OAuth DO GOOGLE PARA REALIZAR O LOGIN/CADASTRO PELO POP-UP
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js"; //ESSES FAZEM COM QUE OS DADOS VÃO PARA OS DOCUMENTOS DO FIREBASE, OU SEJA, O BANCO DE DADOS  

// CONFIGURANDO O FIREBASE COM OS DADOS DA NOSSA APLICAÇÃO 
const firebaseConfig = {
    apiKey: "AIzaSyBEQNP7Avbu_2jPIrHrYvnTh3ypr3xUnLE",
    authDomain: "weave-e.firebaseapp.com",
    projectId: "weave-e",
    storageBucket: "weave-e.appspot.com",
    messagingSenderId: "550401847476",
    appId: "1:550401847476:web:bb3ec0e4bcfa6af9c667e1",
    measurementId: "G-7WZW49T0JH"
};

// INICIALIZA O FIREBASE
const app = initializeApp(firebaseConfig);
// INICIALIZA A AUTENTICAÇÃO
const auth = getAuth(app);
//INICIALIZA O BANCO DE DADOS
const db = getFirestore(app);

// CONFIGURA O PROVEDOR DA GOOGLE
const provider = new GoogleAuthProvider();

// FUNÇÃO PARA GERAR UM USERNAME ALEATÓRIO
function generateRandomUsername(displayName) {
    const randomStr = Math.random().toString(36).substring(2, 8); 
    return `${displayName.replace(/\s+/g, '').toLowerCase()}_${randomStr}`;
}

// EVENTO DE CLIQUE PARA FAZER O LOGIN/CADASTRO COM O GOOGLE
document.getElementById('SendoAcionado').addEventListener('click', () => {
    handleGoogleLogin();
});

// FUNÇÃO QUE EXECUTA O LOGIN/CADASTRO
async function handleGoogleLogin() {
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        // EXIBE UMA MENSAGEM DE BOAS-VINDAS
        alert(`Bem-vindo, ${user.displayName}!`);

        // VERIFICA SE O DOCUMENTO DO USUÁRIO QUE ESTA LOGANDO/CADASTRANDO JÁ EXISTE NO BANCO DE DADOS DO FIREBASE 
        const userDocRef = doc(db, "usuarios", user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
            // SE O DOCUMENTO JÁ EXISTE, ENTÃO O USUÁRIO VAI SER APENAS REDIRECIONADO 
            console.log("Usuário já existe no Firestore. Apenas logando...");
        } else {
            // CASO O DOCUMENTO NÃO EXISTA, ENTÃO IRÁ CRIAR UM NOVO CADASTRO 
            const username = generateRandomUsername(user.displayName);
            await setDoc(userDocRef, {
                name: user.displayName, // RESGATA O NOME DO USUÁRIO
                email: user.email, // RESGATA O EMAIL DO USUÁRIO
                profileImageUrl: user.photoURL, // RESGATA A FOTO DE PERFIL DO USUÁRIO
                username: username, // RESGATA A FUNÇÃO DO USERNAME ALEATÓRIO
                status: "ativo", // DEFINE O STATUS DO USUÁRIO COMO "ATIVO"
            });
            console.log("Novo usuário criado no Firestore.");
        }

        // REDIRECIONA O USUÁRIO APÓS O LOGIN/CADASTRO SER CONCLUÍDO COM SUCESSO
        window.location.replace("index.html");

    } catch (error) {
        // TRATAMENTO DE ERRO
        console.error('Erro no login:', error);
        alert(`Erro no login: ${error.message}`);
    }
}
