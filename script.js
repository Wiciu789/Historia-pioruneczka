document.addEventListener("DOMContentLoaded", () => {
  const envelope = document.getElementById("open-envelope");
  const envelopeScreen = document.getElementById("envelope-screen");
  const mainContent = document.getElementById("main-content");
  const shuffleBtn = document.getElementById("shuffle-btn");
  const puzzleBoard = document.getElementById("puzzle-board");
  const successMsg = document.getElementById("success-message");

  envelope.addEventListener("click", () => {
    envelopeScreen.classList.add("hidden");
    mainContent.classList.remove("hidden");
    playConfetti(); // Efekt 🎉
  });

  shuffleBtn.addEventListener("click", () => {
    puzzleBoard.innerHTML = "";
    successMsg.classList.add("hidden");

    const pieces = [
      { id: "piece1", src: "puzzle1.png" },
      { id: "piece2", src: "puzzle2.png" }
    ];

    // Losowanie kolejności
    pieces.sort(() => Math.random() - 0.5);

    pieces.forEach((piece, index) => {
      const img = document.createElement("img");
      img.src = piece.src;
      img.id = piece.id;
      img.classList.add("puzzle-piece");
      img.draggable = true;

      img.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("text/plain", piece.id);
      });

      img.addEventListener("drop", (e) => {
        e.preventDefault();
        const draggedId = e.dataTransfer.getData("text/plain");
        const draggedEl = document.getElementById(draggedId);
        const target = e.target;

        const parent = target.parentNode;
        parent.insertBefore(draggedEl, target);
      });

      img.addEventListener("dragover", (e) => {
        e.preventDefault();
      });

      puzzleBoard.appendChild(img);
    });

    // Sprawdzenie poprawności po chwili
    setTimeout(() => {
      const current = [...puzzleBoard.children].map(el => el.id);
      if (current.join("") === "piece1piece2") {
        successMsg.classList.remove("hidden");
        playConfetti();
      }
    }, 3000);
  });

  function playConfetti() {
    // Tymczasowo alert — możesz zamienić na animację
    alert("🎉 Konfetti! Udało się!");
  }
});
