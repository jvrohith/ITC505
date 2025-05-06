document.addEventListener("DOMContentLoaded", () => {
    const size = 5;
    const board = document.getElementById("board");
    const cells = [];
  
    function createBoard() {
      for (let row = 0; row < size; row++) {
        cells[row] = [];
        for (let col = 0; col < size; col++) {
          const cell = document.createElement("div");
          cell.classList.add("cell");
          board.appendChild(cell);
          cells[row][col] = cell;
  
          cell.addEventListener("click", () => {
            toggleCell(row, col);
            toggleCell(row - 1, col);
            toggleCell(row + 1, col);
            toggleCell(row, col - 1);
            toggleCell(row, col + 1);
            checkWin();
          });
        }
      }
    }
  
    function toggleCell(row, col) {
      if (row >= 0 && row < size && col >= 0 && col < size) {
        cells[row][col].classList.toggle("is-off");
      }
    }
  
    function checkWin() {
      for (let row of cells) {
        for (let cell of row) {
          if (!cell.classList.contains("is-off")) {
            return;
          }
        }
      }
      setTimeout(() => alert("You win!"), 100);
    }
  
    function randomizeBoard() {
      for (let i = 0; i < 15; i++) {
        const row = Math.floor(Math.random() * size);
        const col = Math.floor(Math.random() * size);
        simulateClick(row, col);
      }
    }
  
    function simulateClick(row, col) {
      toggleCell(row, col);
      toggleCell(row - 1, col);
      toggleCell(row + 1, col);
      toggleCell(row, col - 1);
      toggleCell(row, col + 1);
    }
  
    createBoard();
    randomizeBoard();
  });
  