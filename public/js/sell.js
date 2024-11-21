import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, sendEmailVerification, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore, doc, setDoc, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js"; //ESSES FAZEM COM QUE OS DADOS VÃO PARA OS DOCUMENTOS DO FIREBASE, OU SEJA, O BANCO DE DADOS  


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

// Obtém o botão e o ícone de verificação
const verifyEmailButton = document.getElementById('verifyEmailButton');
const verifiedIcon = document.getElementById('verifiedIcon');

// Observa mudanças no estado de autenticação do usuário
onAuthStateChanged(auth, async (user) => {
    if (user) {
        try {
            // Atualiza os dados do usuário para garantir que temos a informação mais recente
            await user.reload();
            const refreshedUser = auth.currentUser;

            // Verifica se o e-mail foi verificado
            if (refreshedUser && refreshedUser.emailVerified) {
                // Exibe o ícone se o e-mail foi verificado
                verifiedIcon.classList.remove('hidden');
            } else {
                // Oculta o ícone se o e-mail não foi verificado
                verifiedIcon.classList.add('hidden');
            }
        } catch (error) {
            console.error('Erro ao recarregar os dados do usuário:', error);
            // Oculta o ícone em caso de erro para segurança
            verifiedIcon.classList.add('hidden');
        }
    } else {
        // Oculta o ícone se não houver um usuário autenticado
        verifiedIcon.classList.add('hidden');
    }
});

// Lógica de envio de e-mail de verificação quando o botão é clicado
verifyEmailButton.addEventListener('click', () => {
    const user = auth.currentUser;

    if (user) {
        // Envia o e-mail de verificação
        sendEmailVerification(user)
            .then(() => {
                alert('E-mail de verificação enviado! Por favor, verifique sua caixa de entrada.');
            })
            .catch((error) => {
                console.error('Erro ao enviar o e-mail de verificação:', error);
                alert('Ocorreu um erro ao enviar o e-mail de verificação. Verifique se você está autenticado.');
            });
    } else {
        alert('Nenhum usuário autenticado. Por favor, faça login primeiro.');
    }
});


document.getElementById('nameComp').addEventListener('input', function () {
    const inputValue = this.value;
    const regex = /[^a-zA-Z\s]/; // Regex para detectar caracteres especiais ou números
    const svgCorreto = document.getElementById('tudocerto');
    const svgErrado = document.getElementById('errado');

    // Caso o campo esteja vazio, não exibe nenhum SVG
    if (inputValue.trim() === '') {
        svgCorreto.classList.add('hidden');
        svgErrado.classList.add('hidden');
    } else if (inputValue.length < 9) {
        // Se tiver menos de 7 caracteres, oculta ambos os SVGs
        svgCorreto.classList.add('hidden');
        svgErrado.classList.add('hidden');
    } else if (regex.test(inputValue)) {
        // Contém caracteres especiais ou números
        svgErrado.classList.remove('hidden');
        svgCorreto.classList.add('hidden');
    } else {
        // Não contém caracteres especiais ou números
        svgErrado.classList.add('hidden');
        svgCorreto.classList.remove('hidden');
    }
});

document.getElementById('number').addEventListener('input', function () {
    const inputValue = this.value;
    const svgCorreto = document.getElementById('tudocerto2');
    const svgErrado = document.getElementById('errado2');

    // Caso o campo esteja vazio, não exibe nenhum SVG
    if (inputValue.trim() === '') {
        svgCorreto.classList.add('hidden');
        svgErrado.classList.add('hidden');
    } else if (inputValue.length < 15) {
        // Se tiver menos de 7 caracteres, oculta ambos os SVGs
        svgCorreto.classList.add('hidden');
        svgErrado.classList.remove('hidden');
    }
    else {
        // Não contém caracteres especiais ou números
        svgErrado.classList.add('hidden');
        svgCorreto.classList.remove('hidden');
    }
});

document.getElementById('cpf').addEventListener('input', function () {
    const inputValue = this.value;
    const svgCorreto = document.getElementById('tudocerto3');
    const svgErrado = document.getElementById('errado3');

    // Caso o campo esteja vazio, não exibe nenhum SVG
    if (inputValue.trim() === '') {
        svgCorreto.classList.add('hidden');
        svgErrado.classList.add('hidden');
    } else if (inputValue.length < 14) {
        // Se tiver menos de 7 caracteres, oculta ambos os SVGs
        svgCorreto.classList.add('hidden');
        svgErrado.classList.remove('hidden');
    }
    else {
        // Não contém caracteres especiais ou números
        svgErrado.classList.add('hidden');
        svgCorreto.classList.remove('hidden');
    }
});

document.getElementById('birth').addEventListener('input', function () {
    const inputValue = this.value;
    const svgCorreto = document.getElementById('tudocerto4');
    const svgErrado = document.getElementById('errado4');

    // Caso o campo esteja vazio, não exibe nenhum SVG
    if (inputValue.trim() === '') {
        svgCorreto.classList.add('hidden');
        svgErrado.classList.add('hidden');
    } else if (inputValue.length < 10) {
        // Se tiver menos de 7 caracteres, oculta ambos os SVGs
        svgCorreto.classList.add('hidden');
        svgErrado.classList.remove('hidden');
    }
    else {
        // Não contém caracteres especiais ou números
        svgErrado.classList.add('hidden');
        svgCorreto.classList.remove('hidden');
    }
});

document.getElementById('numberhouse').addEventListener('input', function () {
    const inputValue = this.value;
    const svgCorreto = document.getElementById('tudocerto6');
    const svgErrado = document.getElementById('errado6');

    // Caso o campo esteja vazio, não exibe nenhum SVG
    if (inputValue.trim() === '') {
        svgCorreto.classList.add('hidden');
        svgErrado.classList.add('hidden');
    }
    else {
        // Não contém caracteres especiais ou números
        svgErrado.classList.add('hidden');
        svgCorreto.classList.remove('hidden');
    }
});

document.getElementById('comple').addEventListener('input', function () {
    const inputValue = this.value;
    const regex = /\d/; // Regex para detectar caracteres especiais ou números
    const svgCorreto = document.getElementById('tudocerto9');
    const svgErrado = document.getElementById('errado9');

    // Caso o campo esteja vazio, não exibe nenhum SVG
    if (inputValue.trim() === '') {
        svgCorreto.classList.add('hidden');
        svgErrado.classList.add('hidden');
    } else if (inputValue.length < 4) {
        // Se tiver menos de 7 caracteres, oculta ambos os SVGs
        svgCorreto.classList.add('hidden');
        svgErrado.classList.remove('hidden');
    } else if (regex.test(inputValue)) {
        // Contém caracteres especiais ou números
        svgErrado.classList.remove('hidden');
        svgCorreto.classList.add('hidden');
    } else {
        // Não contém caracteres especiais ou números
        svgErrado.classList.add('hidden');
        svgCorreto.classList.remove('hidden');
    }
});

// Função para associar lógica de validação a um campo com IDs personalizados
function addInputValidationLogic(inputId, corretoSvgId, erradoSvgId) {
    const inputElement = document.getElementById(inputId);
    const svgCorreto = document.getElementById(corretoSvgId);
    const svgErrado = document.getElementById(erradoSvgId);

    // Lógica de validação aplicada diretamente
    function validateInput() {
        const inputValue = inputElement.value;

        // Caso o campo esteja vazio, esconde ambos os SVGs
        if (inputValue.trim() === '') {
            svgCorreto.classList.add('hidden');
            svgErrado.classList.add('hidden');
        } else {
            // Exibe o SVG correto e esconde o errado
            svgErrado.classList.add('hidden');
            svgCorreto.classList.remove('hidden');
        }
    }

    // Adiciona evento ao input para interatividade
    inputElement.addEventListener('input', validateInput);

    // Valida imediatamente (para quando os dados são carregados automaticamente)
    validateInput();
}


let isRequestingCep = false; // Defina a variável para controlar o estado da requisição

// Função para buscar o CEP usando a função já definida anteriormente
function buscarCep(cep) {
    if (isRequestingCep) {
        return; // Ignora se já há uma requisição em andamento
    }

    isRequestingCep = true; // Marca como requisitando

    const url = `https://viacep.com.br/ws/${cep}/json/`;

    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        timeout: 5000
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar o CEP');
            }
            return response.json();
        })
        .then(jsonResponse => {
            isRequestingCep = false; // Marca como concluído ao obter resposta

            // Verifica se o CEP é válido
            if (jsonResponse.erro) {
                alert('CEP não encontrado!');
                document.getElementById('addressEt').value = '';
                document.getElementById('cityEt').value = '';
                document.getElementById('stateEt').value = '';
                document.getElementById('districtEt').value = '';
                return;
            }

            // Extrai as informações do JSON
            const address = jsonResponse.logradouro || 'Não encontrado';
            const district = jsonResponse.bairro || 'Não encontrado';
            const city = jsonResponse.localidade || 'Não encontrado';
            const state = jsonResponse.uf || 'Não encontrado';

            // Atualiza os campos na página
            document.getElementById('addressEt').value = address;
            document.getElementById('districtEt').value = district;
            document.getElementById('stateEt').value = state;
            document.getElementById('cityEt').value = city;


            // Aplica a lógica para cada campo específico
            addInputValidationLogic('addressEt', 'tudocerto7', 'errado7');
            addInputValidationLogic('districtEt', 'tudocerto8', 'errado8');
            addInputValidationLogic('districtEt', 'tudocerto10', 'errado10');
            addInputValidationLogic('districtEt', 'tudocerto11', 'errado11');



        })
        .catch(error => {
            console.error(error);
            isRequestingCep = false;
            alert('Erro ao buscar o CEP');
        });
}

// Adiciona um evento para capturar o CEP quando o usuário digitar ou sair do campo de input
document.getElementById('cep').addEventListener('blur', function () {
    const cep = this.value.trim();
    const svgCorreto = document.getElementById('tudocerto5');
    const svgErrado = document.getElementById('errado5');

    if (cep) {
        buscarCep(cep);
        if (cep.trim() === '') {
            svgCorreto.classList.add('hidden');
            svgErrado.classList.add('hidden');
        } else if (cep.length < 9) {
            // Se tiver menos de 7 caracteres, oculta ambos os SVGs
            svgCorreto.classList.add('hidden');
            svgErrado.classList.remove('hidden');
        }
        else {
            // Não contém caracteres especiais ou números
            svgErrado.classList.add('hidden');
            svgCorreto.classList.remove('hidden');
        }
    }
});

let userUID = null;
//INICIALIZA O BANCO DE DADOS
const db = getFirestore(app);

// Observa o estado de autenticação
onAuthStateChanged(auth, (user) => {
    if (user) {
        userUID = user.uid;
        document.getElementById('confirmButton').disabled = false;
        console.log("UID do usuário:", userUID);
    } else {
        userUID = null;
        document.getElementById('confirmButton').disabled = true;
        console.log("Nenhum usuário autenticado");
    }
});

// Função para salvar endereço no Firestore
async function saveAddress() {
    if (!userUID) {
        alert("Usuário não autenticado!");
        return;
    }

    try {
        // Referência para a subcoleção 'address' dentro do documento do usuário
        const addressRef = collection(db, "usuarios", userUID, "address");

        // Obtenha os valores dos campos
        const cep = document.getElementById('cep').value.trim();
        const address = document.getElementById('addressEt').value.trim();
        const district = document.getElementById('districtEt').value.trim();
        const city = document.getElementById('cityEt').value.trim();
        const state = document.getElementById('stateEt').value.trim();
        const phone = document.getElementById('number').value.trim();
        const name = document.getElementById('nameComp').value.trim();
        const comple = document.getElementById('comple').value.trim();
        const number = document.getElementById('numberhouse').value.trim();

        // Verifique se os campos obrigatórios estão preenchidos
        if (!cep || !address || !district || !city || !state) {
            alert("Por favor, preencha todos os campos obrigatórios!");
            return;
        }

        // Crie um novo documento na subcoleção 'address'
        const docRef = await addDoc(addressRef, {
            address: address,
            cep: cep,
            city: city,
            comp: comple,
            bairro: district,
            name: name,
            number: number,
            phone: phone,
            state: state,
            uid: userUID,
        });

        // Atualiza o documento com o ID gerado automaticamente
        await setDoc(docRef, { id: docRef.id }, { merge: true });

        alert("Endereço salvo com sucesso!");
    } catch (error) {
        console.error("Erro ao salvar o endereço:", error);
        alert("Erro ao salvar o endereço.");
    }
}

// Função para salvar informações do usuário no Firestore
async function saveInfo() {
    if (!userUID) {
        alert("Usuário não autenticado!");
        return;
    }

    try {
        const name = document.getElementById("nameComp");
        const cpfInput = document.getElementById("cpf");
        const nascInput = document.getElementById("birth");
        const telInput = document.getElementById("number");

        const userDocRef = doc(db, "usuarios", userUID);

        // Atualiza os campos do documento do usuário
        await setDoc(userDocRef, {
            name: name.value,
            cpf: cpfInput.value,
            dob: nascInput.value,
            phone: telInput.value,
        }, { merge: true }); // Merge mantém campos existentes

        alert("Informações atualizadas com sucesso!");
    } catch (error) {
        console.error("Erro ao atualizar as informações do usuário:", error);
        alert("Erro ao atualizar as informações. Tente novamente.");
    }
}

// Adiciona evento ao botão
document.getElementById('confirmButton').addEventListener('click', () => {
    saveAddress();
    saveInfo();
});
