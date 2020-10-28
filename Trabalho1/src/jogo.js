// ------------------ Constantes ------------------------------

// MINIMAX CONFIG
const MAX_DEPTH = 5;
const MAX = WHITE;
const MIN = BLACK;

// PEÇAS
const BLACK = -1;
const WHITE = 1;
const PLACEHOLDER = 2;
const EMPTY = 0;

// COR DOS JOGADORES
const PLAYER = WHITE;
const CPU = BLACK;

// TAMANHO DO TABULEIRO
const ROWS = 8;
const COLS = 8;

// ------------------ Variaveis ------------------------------

// JOGADOR DO TURNO DE AGORA
var TURN = PLAYER;

// TABULEIRO
var JOGO = new Array(ROWS);

// ------------------ Funções ------------------------------

// Cria um tabuleiro vazio
const emptyTable = function(){
    JOGO = new Array(ROWS);

    for(let i = 0; i < COLS; i++){
        JOGO[i] = constructRows();
    }
}

// Cria as linhas do tabuleiro
const constructRows = function() {
    var arr = new Array(ROWS);
    for(let i = 0; i < ROWS; i++){
        arr[i] = EMPTY;
    }

    return arr;
}

// Conta o numero de peças da cor que se deseja
const countPieces = function(color){
    var count = 0;
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            if(JOGO[r][c] === color){
                count++;
            }
        }
    }

    return count;
}

// Inicializa um tabuleiro vazio com as quatro peças iniciais.
// As posicoes de cada jogador é à sorte
const fillStartingPositions = function(){
    var rng = Math.random() >= 0.5;

    var p1 = rng ? WHITE : BLACK;
    var p2 = rng ? BLACK : WHITE;

    JOGO[3][3] = p1;
    JOGO[3][4] = p2;
    JOGO[4][3] = p2;
    JOGO[4][4] = p1;
}

// Cria um element de uma peça com a cor desejada
const buildDot = function(color){
    var dot = document.createElement("div");
    if(color === WHITE){
        dot.classList.add("dot", "white");
    }else if(color === BLACK){
        dot.classList.add("dot", "black");
    }else if(color === PLACEHOLDER){
        dot.classList.add("dot", "placeholder");
    }

    return dot;
}

// Cria e poem uma peça com a cor ('color') desejada e poem na linha 'row' e coluna 'col' 
const setColor = function(row, col, color){
    var modRow = parseInt(row)+1;
    var modCol = parseInt(col)+1;
    var strRow = "row-" + modRow;
    var strCol = "col-" + modCol;

    var rowElement = document.getElementById(strRow);
    var colElement = rowElement.getElementsByClassName(strCol);

    if(colElement != null){
        colElement[0].innerHTML = '';
        if(colElement[0] != null && color != EMPTY){
            var dot = buildDot(color);
            colElement[0].appendChild(dot);
        }
    }
}

// Verifica se a coordenada dada esta vazia ou tem placeholder
const isEmpty = function(row, col){
    return JOGO[row][col] === EMPTY || JOGO[row][col] === PLACEHOLDER;
}

// Cria placeholders para a jogada do utilizador do turno currente
const setPlaceholders = function(){
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            if(!isEmpty(r, c) && TURN == JOGO[r][c]){
                if(r > 0 && isEmpty(r - 1, c)){
                    setColor(r - 1, c, PLACEHOLDER);
                }

                if(c > 0 && isEmpty(r, c - 1)){
                    setColor(r, c - 1, PLACEHOLDER);
                }

                if(r < (ROWS - 1) && isEmpty(r + 1, c)){
                    setColor(r + 1, c, PLACEHOLDER);
                }

                if(c < (COLS - 1) && isEmpty(r, c + 1)){
                    setColor(r, c + 1, PLACEHOLDER);
                }
            }
        }
    }
}

// Desenha o jogo baseado na matriz JOGO
// Tem de ser chamada apos cada jogada
const drawGame = function(){
    var table = document.getElementById("tabela-jogo");
    if(table == null){
        return;
    }

    for(let r = 0; r < ROWS; r++){
        for(let c = 0; c < COLS; c++){
            var color = JOGO[r][c];
            if(color != EMPTY){
                setColor(r, c, color);
            }
        }
    }

    setPlaceholders();
}

// Inicializa um jogo novo
const startGame = function() {
    emptyTable();
    fillStartingPositions();
    drawGame();
}
