let isShuffled = false;
let pieces = [];

document.addEventListener("DOMContentLoaded", () => {
    const openEnvelopeBtn = document.getElementById("open-envelope");
    const envelopeScreen = document.getElementById("envelope-screen");
    const mainContent = document.getElementById("main-content");
    const puzzleBoard = document.getElementById("puzzle-board");
    const shuffleBtn = document.getElementById("shuffle-btn");
    const successMessage = document.getElementById("success-message");

    openEnvelopeBtn.addEventListener("click", () => {
        envelopeScreen.classList.add("hidden");
        mainContent.classList.remove("hidden");
        playMusic();
    });

    shuffleBtn.addEventListener("click", () => {
        if (!isShuffled) {
            shufflePuzzle();
            isShuffled = true;
        }
    });

    createPuzzle();
});

function createPuzzle() {
    const board = document.getElementById("puzzle-board");
    const positions = [...Array(9).keys()];
   positions.forEach(i => {
        const piece = document.createElement("div");
        piece.classList.add("puzzle-piece");
        piece.style.backgroundImage = "url('piorun_gallery_1.jpg')";
      piece.style.backgroundPosition = -${(i % 3) * 100}px -${Math.floor(i / 3) * 100}px`;
        piece.dataset.index = i;
        piece.addEventListener("click", () => swapPiece(piece));
        pieces.push(piece);
        board.appendChild(piece);
    });
}

function shufflePuzzle() {
    const board = document.getElementById("puzzle-board");
    const shuffled = [...pieces].sort(() => 0.5 - Math.random());
    board.innerHTML = "";
    shuffled.forEach(piece => board.appendChild(piece));
}

function swapPiece(clickedPiece) {
    const emptyIndex = pieces.findIndex(p => !p.parentElement);
    if (emptyIndex !== -1) return;

    const board = document.getElementById("puzzle-board");
    const currentPieces = Array.from(board.children);
    const index = currentPieces.indexOf(clickedPiece);

    if (index > 0) {
        [currentPieces[index], currentPieces[index - 1]] = [currentPieces[index - 1], currentPieces[index]];
        board.innerHTML = "";
        currentPieces.forEach(p => board.appendChild(p));
        checkWin(currentPieces);
    }
}

function checkWin(currentPieces) {
    const correct = currentPieces.every((piece, index) => {
        return parseInt(piece.dataset.index) === index;
    });
    if (correct) {
        showConfetti();
        document.getElementById("success-message").classList.remove("hidden");
    }
}

function showConfetti() {
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement("div");
        confetti.classList.add("confetti");
        confetti.style.left = ${Math.random() * 100}vw;
        confetti.style.top = -${Math.random() * 20}px;
        confetti.style.backgroundColor = getRandomColor();
        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 3000);
    }
}

function getRandomColor() {
    const colors = ["#ff66a3", "#ff99cc", "#ffccff", "#ffb3d9"];
    return colors[Math.floor(Math.random() * colors.length)];
}

function playMusic() {
    const audio = new Audio("romantic_music.mp3");
    audio.loop = true;
    audio.volume = 0.4;
    audio.play();
}
