// ゲームの状態管理
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'O'; // Oが先手
let gameActive = true;
let scores = {
    O: 0,
    X: 0,
    draw: 0
};

// 勝利パターン
const winningPatterns = [
    [0, 1, 2], // 上段
    [3, 4, 5], // 中段
    [6, 7, 8], // 下段
    [0, 3, 6], // 左列
    [1, 4, 7], // 中列
    [2, 5, 8], // 右列
    [0, 4, 8], // 左上から右下
    [2, 4, 6]  // 右上から左下
];

// DOM要素の取得
const cells = document.querySelectorAll('.cell');
const currentPlayerDisplay = document.getElementById('currentPlayer');
const gameStatusDisplay = document.getElementById('gameStatus');
const resetButton = document.getElementById('resetButton');
const scoreO = document.getElementById('scoreO');
const scoreX = document.getElementById('scoreX');
const scoreDraw = document.getElementById('scoreDraw');

// セルのクリックイベント
cells.forEach((cell, index) => {
    cell.addEventListener('click', () => handleCellClick(index));
});

// リセットボタンのイベント
resetButton.addEventListener('click', resetGame);

// セルクリックの処理
function handleCellClick(index) {
    if (board[index] !== '' || !gameActive) {
        return;
    }

    // セルにマークを配置
    board[index] = currentPlayer;
    updateCell(index, currentPlayer);

    // 勝敗判定
    if (checkWinner()) {
        gameActive = false;
        gameStatusDisplay.textContent = `プレイヤー ${currentPlayer} の勝利！`;
        gameStatusDisplay.classList.add('winner');
        scores[currentPlayer]++;
        updateScores();
        highlightWinningCells();
        return;
    }

    // 引き分け判定
    if (board.every(cell => cell !== '')) {
        gameActive = false;
        gameStatusDisplay.textContent = '引き分けです！';
        gameStatusDisplay.classList.add('draw');
        scores.draw++;
        updateScores();
        return;
    }

    // プレイヤー交代
    currentPlayer = currentPlayer === 'O' ? 'X' : 'O';
    updateCurrentPlayerDisplay();
}

// セルの更新
function updateCell(index, player) {
    const cell = cells[index];
    cell.textContent = player;
    cell.classList.add('filled', player.toLowerCase());
    cell.classList.remove('x', 'o');
    cell.classList.add(player.toLowerCase());
}

// 現在のプレイヤー表示の更新
function updateCurrentPlayerDisplay() {
    currentPlayerDisplay.textContent = currentPlayer;
    currentPlayerDisplay.className = `player-mark ${currentPlayer.toLowerCase()}`;
}

// 勝敗判定
function checkWinner() {
    for (let pattern of winningPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return true;
        }
    }
    return false;
}

// 勝利したセルをハイライト
function highlightWinningCells() {
    for (let pattern of winningPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            cells[a].classList.add('winning');
            cells[b].classList.add('winning');
            cells[c].classList.add('winning');
            break;
        }
    }
}

// スコアの更新
function updateScores() {
    scoreO.textContent = scores.O;
    scoreX.textContent = scores.X;
    scoreDraw.textContent = scores.draw;
}

// ゲームリセット
function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'O';
    gameActive = true;
    gameStatusDisplay.textContent = 'ゲーム開始！';
    gameStatusDisplay.classList.remove('winner', 'draw');
    
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('filled', 'x', 'o', 'winning', 'disabled');
    });
    
    updateCurrentPlayerDisplay();
}

// ローカルストレージからスコアを読み込む
function loadScores() {
    const savedScores = localStorage.getItem('ticTacToeScores');
    if (savedScores) {
        scores = JSON.parse(savedScores);
        updateScores();
    }
}

// スコアをローカルストレージに保存
function saveScores() {
    localStorage.setItem('ticTacToeScores', JSON.stringify(scores));
}

// スコア更新時に保存
const originalUpdateScores = updateScores;
updateScores = function() {
    originalUpdateScores();
    saveScores();
};

// ページ読み込み時にスコアを読み込む
document.addEventListener('DOMContentLoaded', () => {
    loadScores();
    updateCurrentPlayerDisplay();
});
