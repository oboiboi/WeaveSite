    import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
    import { getFirestore, collection, addDoc, query, where, getDocs } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";


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

   // Inicialização do Firebase e Firestore
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  // Referência ao formulário e configuração do evento de submissão
  document.getElementById("messageForm").addEventListener("submit", async (event) => {
    event.preventDefault(); // Previne o envio do formulário

    // Coleta dos dados do formulário
    const email = document.getElementById("email").value;
    const assunto = document.getElementById("assunto").value;
    const mensagem = document.getElementById("mensagem").value;

    try {
      // Verificação da existência do username no Firestore
      const usersQuery = query(collection(db, "usuarios"), where("email", "==", email));
      const querySnapshot = await getDocs(usersQuery);

      if (!querySnapshot.empty) {
        // Usuário existe, prosseguir com o envio da mensagem
        await addDoc(collection(db, "mensagens"), {
          email: email,
          assunto: assunto,
          mensagem: mensagem,
          status: "Aguardando resposta...",
          data: new Date()
        });
        alert("Mensagem enviada com sucesso!");
        document.getElementById("messageForm").reset(); // Limpa o formulário
      } else {
        // Usuário não existe
        alert("Usuário não encontrado. Por favor, registre-se antes de enviar uma mensagem.");
      }
    } catch (e) {
      console.error("Erro ao enviar a mensagem: ", e);
      alert("Erro ao enviar a mensagem. Tente novamente.");
    }
  });