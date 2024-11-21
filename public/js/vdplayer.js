// Selecionar os elementos de vídeo e botão
const videoElement = document.getElementById("videoPlayer");
const playPauseButton = document.getElementById("playPauseButton");
const playIcon = playPauseButton.querySelector(".play-icon");
const pauseIcon = playPauseButton.querySelector(".pause-icon");

// Controle de estado para evitar chamadas simultâneas
let isPlaying = false;

// Alternar reprodução e pausa
playPauseButton.addEventListener("click", () => {
    if (isPlaying) {
        // Pausar o vídeo
        videoElement.pause();
    } else {
        // Reproduzir o vídeo
        videoElement.play().catch((error) => {
            console.error("Erro ao reproduzir o vídeo:", error);
        });
    }
});

// Atualizar ícones quando o estado do vídeo mudar
videoElement.addEventListener("play", () => {
    isPlaying = true; // Atualiza estado para "reproduzindo"
    playIcon.classList.add("hidden");
    pauseIcon.classList.remove("hidden");
});

videoElement.addEventListener("pause", () => {
    isPlaying = false; // Atualiza estado para "pausado"
    playIcon.classList.remove("hidden");
    pauseIcon.classList.add("hidden");
});
