// Importa as funções necessárias do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore, doc, collection, getDocs, deleteDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

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
const db = getFirestore(app);

// Referência ao elemento tbody
const userRows = document.getElementById('userRows');

async function fetchAndDisplayUsers() {
    try {
        const querySnapshot = await getDocs(collection(db, 'usuarios'));
        querySnapshot.forEach((doc) => {
            if (doc.id === 'M2NrDuVbeKR51V37vYylN4cl6ql2') {
                return; // Ignora este usuário específico
            }

            const userData = doc.data();
            const newRow = document.createElement('tr');
            newRow.classList.add('bg-white', 'border-b', 'dark:bg-gray-800', 'dark:border-gray-700', 'hover:bg-gray-50', 'dark:hover:bg-gray-600');
            newRow.dataset.userId = doc.id; // Adiciona o ID do usuário como atributo de dados

            newRow.innerHTML = `
                <td class="w-4 p-4">
                    <div class="flex items-center">
                        <input type="checkbox" class="user-checkbox w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                    </div>
                </td>
                <th scope="row" class="p-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">${userData.username || ''}</th>
                <td class="p-4">${userData.email || ''}</td>
                <td class="p-4">${userData.name || ''}</td>
                <td class="p-4">${userData.cpf || ''}</td>
                <td class="p-4">${userData.dob || ''}</td>
                <td class="p-4">${userData.phone || ''}</td>
                <td class="p-4">${userData.status || ''}</td>
                <td class="flex items-center p-4">
                    <button class="delete-btn font-medium text-red-600 dark:text-red-500 hover:underline">Deletar</button>
                </td>
            `;

            userRows.appendChild(newRow);
        });

        // Adiciona os eventos de exclusão nos botões após carregar as linhas
        attachDeleteButtonListeners();
    } catch (error) {
        console.error("Erro ao buscar usuários:", error);
    }
}

function attachDeleteButtonListeners() {
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach((button) => {
        button.addEventListener('click', async (event) => {
            const row = event.target.closest('tr');
            const userId = row.dataset.userId; // Pega o ID do usuário correspondente

            if (userId) {
                try {
                    await deleteDoc(doc(db, 'usuarios', userId));
                    console.log(`Usuário com ID ${userId} deletado com sucesso do Firestore`);

                    // Remove a linha da tabela
                    row.remove();
                } catch (error) {
                    console.error(`Erro ao deletar o usuário com ID ${userId}:`, error);
                }
            }
        });
    });
}

// Busca e mostra os usuários
fetchAndDisplayUsers();
