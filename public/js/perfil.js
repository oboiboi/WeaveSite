import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, onAuthStateChanged, EmailAuthProvider, reauthenticateWithCredential, updatePassword } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore, doc, getDoc, updateDoc, setDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-storage.js";

// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBEQNP7Avbu_2jPIrHrYvnTh3ypr3xUnLE",
    authDomain: "weave-e.firebaseapp.com",
    projectId: "weave-e",
    storageBucket: "weave-e.appspot.com",
    messagingSenderId: "550401847476",
    appId: "1:550401847476:web:bb3ec0e4bcfa6af9c667e1",
    measurementId: "G-7WZW49T0JH"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

let userUID = null;

// Observa o estado de autenticação e define o UID global
onAuthStateChanged(auth, (user) => {
    if (user) {
        userUID = user.uid;
        console.log("UID do usuário:", userUID);
        setUserProfile(userUID);
    } else {
        userUID = null;
        console.log("Nenhum usuário autenticado");
    }
});

// Função para buscar e configurar o perfil do usuário
async function setUserProfile(uid) {
    const withProfileDiv = document.getElementById("withProfile");
    const withoutProfileDiv = document.getElementById("withoutProfile");
    const nomeDaPessoaDiv = document.getElementById("nomeDaPessoa");
    const userDaPessoaDiv = document.getElementById("userDaPessoa");

    // Elementos de input para perfil
    const nameInput = document.getElementById("nameProfile");
    const emailInput = document.getElementById("emailProfile");
    const passwordInput = document.getElementById("passwordProfile");
    const cpfInput = document.getElementById("cpfProfile");
    const nascInput = document.getElementById("nascProfile");
    const telInput = document.getElementById("telProfile");

    try {
        const userDocRef = doc(db, 'usuarios', uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
            const userData = userDoc.data();
            const profileImage = userData?.profileImageUrl;
            const name = userData?.name;
            const email = userData?.email;
            const username = userData?.username;
            const cpf = userData?.cpf;
            const dob = userData?.dob;
            const phone = userData?.phone;
            

            // Preenche os inputs com dados do Firestore
            if (name) nameInput.value = name;
            if (email) emailInput.value = email;
            if (cpf) cpfInput.value = cpf;
            if (dob) nascInput.value = dob;
            if (phone) telInput.value = phone;

            passwordInput.value = "********";  // Senha placeholder (não real)

            // Atualiza a visualização do perfil
            if (profileImage) {
                const imageElement = document.querySelector("#withProfile image");
                imageElement.setAttribute("href", profileImage);
                withProfileDiv.classList.remove("hidden");
                withoutProfileDiv.classList.add("hidden");
            } else {
                withoutProfileDiv.classList.remove("hidden");
                withProfileDiv.classList.add("hidden");
            }

            // Pega o primeiro nome e exibe na div "nomeDaPessoaDiv"
            if (name) {
                const firstName = name.split(' ')[0]; // Pega a primeira parte do nome (antes do primeiro espaço)
                nomeDaPessoaDiv.textContent = firstName;
            }
            if (username) userDaPessoaDiv.textContent = `@${username}`;

        } else {
            withoutProfileDiv.classList.remove("hidden");
            withProfileDiv.classList.add("hidden");
        }
    } catch (error) {
        console.error("Erro ao buscar os dados do perfil:", error);
        withoutProfileDiv.classList.remove("hidden");
        withProfileDiv.classList.add("hidden");
    }
}

// Função para atualizar o perfil do usuário no Firestore
async function updateUserProfile() {
    const nameInput = document.getElementById("nameProfile");
    const cpfInput = document.getElementById("cpfProfile");
    const nascInput = document.getElementById("nascProfile");
    const telInput = document.getElementById("telProfile");

    // Obtém o usuário autenticado
    const auth = getAuth();
    const user = auth.currentUser;

    // Verifica se o e-mail do usuário foi verificado
    if (!user || !user.emailVerified) {
        alert("Você precisa verificar seu e-mail antes de atualizar seu perfil.");
        return; // Interrompe a execução da função
    }

    try {
        const userDocRef = doc(db, 'usuarios', user.uid);

        // Atualiza somente os campos que foram preenchidos
        await setDoc(userDocRef, {
            name: nameInput.value,
            cpf: cpfInput.value,
            dob: nascInput.value,
            phone: telInput.value,
        }, { merge: true }); // { merge: true } mantém campos existentes e atualiza somente os especificados

        alert("Informações atualizadas com sucesso!");
    } catch (error) {
        console.error("Erro ao atualizar as informações do usuário:", error);
        alert("Erro ao atualizar as informações. Tente novamente.");
    }
}


// Adiciona um evento de clique ao botão de salvar
document.getElementById("saveButton").addEventListener("click", (event) => {
    event.preventDefault();
    if (userUID) {
        updateUserProfile();
    } else {
        alert("Nenhum usuário autenticado.");
    }
});

async function changePassword() {
    const yourPassword = document.getElementById("yourPassword").value;
    const newPassword = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (!yourPassword || !newPassword || !confirmPassword) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    if (newPassword !== confirmPassword) {
        alert("A nova senha e a confirmação não correspondem.");
        return;
    }

    try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
            alert("Nenhum usuário autenticado.");
            return;
        }

        // Reautenticar o usuário com a senha atual
        const credential = EmailAuthProvider.credential(user.email, yourPassword);
        await reauthenticateWithCredential(user, credential);

        // Atualizar a senha para a nova senha
        await updatePassword(user, newPassword);

        // Atualizar senha como texto simples no Firestore - **NÃO RECOMENDADO**
        const db = getFirestore();
        const userDocRef = doc(db, "usuarios", user.uid);

        await updateDoc(userDocRef, {
            senha: newPassword 
        });

        alert("Senha atualizada com sucesso!");
    } catch (error) {
        console.error("Erro ao atualizar a senha:", error);
        if (error.code === "auth/wrong-password") {
            alert("Senha atual incorreta.");
        } else {
            alert("Erro ao atualizar a senha. Tente novamente.");
        }
    }
}

// Adiciona um evento de clique ao botão de trocar senha
document.getElementById("changePasswordButton").addEventListener("click", (event) => {
    event.preventDefault();
    changePassword();
});


// Função para fazer upload da foto de perfil
async function uploadProfilePicture(file) {
    if (!userUID) return;

    const storageRef = ref(storage, `/UserImages/${userUID}`);
    try {
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);

        const userDocRef = doc(db, 'usuarios', userUID);
        await updateDoc(userDocRef, { profileImageUrl: downloadURL });

        setUserProfile(userUID);
        console.log("Foto de perfil atualizada com sucesso!");
    } catch (error) {
        console.error("Erro ao fazer upload da foto de perfil:", error);
    }
}

// Função para deletar a foto de perfil
async function deleteProfilePicture() {
    if (!userUID) return;

    const storageRef = ref(storage, `/UserImages/${userUID}`);
    try {
        await deleteObject(storageRef);

        const userDocRef = doc(db, 'usuarios', userUID);
        await updateDoc(userDocRef, { profileImageUrl: null });

        setUserProfile(userUID);
        console.log("Foto de perfil deletada com sucesso!");
    } catch (error) {
        console.error("Erro ao deletar a foto de perfil:", error);
    }
}

// Evento para fazer upload da nova foto
document.getElementById("trocarFoto").addEventListener("click", () => {
    const fileInput = document.getElementById("file-upload");
    const file = fileInput.files[0];

    if (file) {
        uploadProfilePicture(file);
    } else {
        console.log("Nenhum arquivo selecionado");
    }
});

// Evento para deletar a foto de perfil
document.getElementById("deletarFoto").addEventListener("click", deleteProfilePicture);
