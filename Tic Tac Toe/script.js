document.addEventListener('DOMContentLoaded', () => {
  const board = document.getElementById('board');
  const cells = Array.from(document.getElementsByClassName('cell'));
  const popup = document.getElementById('popup');
  const winnerDisplay = document.getElementById('winner');
  const restartButton = document.getElementById('restart');
  
  let currentPlayer = 'X';
  let boardState = Array(9).fill('');
  let isGameActive = true;
  
  const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  
  const createFallingSnowflake = () => {
    const snowflake = document.createElement('div');
    snowflake.innerHTML = '&#10052;'; // Unicode for snowflake
    snowflake.classList.add('snowflake');
    snowflake.style.left = `${Math.random() * 100}vw`;
    document.body.appendChild(snowflake);
    setTimeout(() => {
      document.body.removeChild(snowflake);
    }, 3000);
  };

  const checkWinner = () => {
    for (let pattern of winningPatterns) {
      const [a, b, c] = pattern;
      if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
        return boardState[a];
      }
    }
    return boardState.includes('') ? null : 'Draw';
  };
  
  const handleClick = (e) => {
    const index = e.target.getAttribute('data-index');
    if (boardState[index] === '' && isGameActive) {
      boardState[index] = currentPlayer;
      e.target.innerText = currentPlayer;
      e.target.classList.add('active');
      setTimeout(() => e.target.classList.remove('active'), 500);
      
      const winner = checkWinner();
      if (winner) {
        isGameActive = false;
        winnerDisplay.innerHTML = winner === 'Draw' ? 'It\'s a Draw!' : `${winner} Wins! ❄️❄️❄️`;
        popup.classList.remove('hidden');
        for (let i = 0; i < 10; i++) {
          setTimeout(createFallingSnowflake, i * 300);
        }
      } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      }
    }
  };
  
  const resetGame = () => {
    boardState = Array(9).fill('');
    cells.forEach(cell => cell.innerText = '');
    currentPlayer = 'X';
    isGameActive = true;
    popup.classList.add('hidden');
  };
  
  const handleDocumentClick = (e) => {
    const clickEffect = document.createElement('div');
    clickEffect.classList.add('click-effect');
    clickEffect.style.top = `${e.clientY}px`;
    clickEffect.style.left = `${e.clientX}px`;
    document.body.appendChild(clickEffect);
    setTimeout(() => {
      document.body.removeChild(clickEffect);
    }, 500);
  };

  cells.forEach(cell => cell.addEventListener('click', handleClick));
  restartButton.addEventListener('click', resetGame);
  document.addEventListener('click', handleDocumentClick);
});