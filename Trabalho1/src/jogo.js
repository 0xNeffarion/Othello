// ------------------ Constantes ------------------------------

// PEÇAS
const BLACK = -1;
const WHITE = 1;
const PLACEHOLDER = 2;
const EMPTY = 0;

// MINIMAX CONFIG
const MAX_DEPTH = 5;
const MAX = WHITE;
const MIN = BLACK;

// TAMANHO DO TABULEIRO
const ROWS = 8;
const COLS = 8;

// ------------------ Variaveis ------------------------------

// COR DOS JOGADORES
var PLAYER = WHITE;
var CPU = BLACK;

// JOGADOR DO TURNO DE AGORA
var TURN = PLAYER;

// TABULEIRO
var JOGO = new Array(ROWS);

// ------------------ Objetos ------------------------------

class Point {
    constructor(x, y){
        this.x = x;
        this.y = y;
    }

    getX(){
        return this.x;
    }

    getY(){
        return this.y;
    }

    equals(p){
        if(this.x === p.getX() && this.y === p.getY()){
            return true;
        }

        return false;
    }
}

const INV_POINT = new Point(-1, -1);

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

const enemy = function(color){
    return color === BLACK ? WHITE : BLACK;
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
            if(color == PLACEHOLDER){
                dot.addEventListener("click", function() { jogarPeca(row, col); });
            }
            
            colElement[0].appendChild(dot);
        }
    }
}

// Verifica se a coordenada dada esta vazia ou tem placeholder
const isEmpty = function(row, col){
    return JOGO[row][col] === EMPTY || JOGO[row][col] === PLACEHOLDER;
}

const clearPlaceholders = function(){
    for(let r = 0; r < ROWS; r++){
        for(let c = 0; c < COLS; c++){
            if(JOGO[r][c] == PLACEHOLDER){
                JOGO[r][c] = 0;
            }
        }
    }
}

// Cria placeholders para a jogada do utilizador
const setPlaceholders = function(color){
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            if(JOGO[r][c] !== color){
                continue;
            }

            var opponent = enemy(color);
            var tr = checkTopRight(opponent, r - 1, c + 1, false);
            var tl = checkTopLeft(opponent, r - 1, c - 1, false);
            var top = checkTop(opponent, r - 1, c, false);

            var br = checkBottomRight(opponent, r + 1, c + 1, false);
            var bl = checkBottomLeft(opponent, r + 1, c - 1, false);
            var bottom = checkBottom(opponent, r + 1, c, false);

            var right = checkRight(opponent, r, c + 1, false);
            var left = checkLeft(opponent, r, c - 1, false);


            if(!tr.equals(INV_POINT)){
                JOGO[tr.getX()][tr.getY()] = PLACEHOLDER;
            }

            if(!tl.equals(INV_POINT)){
                JOGO[tl.getX()][tl.getY()] = PLACEHOLDER;
            }

            if(!top.equals(INV_POINT)){
                JOGO[top.getX()][top.getY()] = PLACEHOLDER;
            }
            
            if(!br.equals(INV_POINT)){
                JOGO[br.getX()][br.getY()] = PLACEHOLDER;
            }

            if(!bl.equals(INV_POINT)){
                JOGO[bl.getX()][bl.getY()] = PLACEHOLDER;
            }

            if(!right.equals(INV_POINT)){
                JOGO[right.getX()][right.getY()] = PLACEHOLDER;
            }

            if(!bottom.equals(INV_POINT)){
                JOGO[bottom.getX()][bottom.getY()] = PLACEHOLDER;
            }

            if(!left.equals(INV_POINT)){
                JOGO[left.getX()][left.getY()] = PLACEHOLDER;
            }

        }
    }
}

// ---

// Jogo acabou
const isFull = function(){
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            if(isEmpty(r, c)){
                return false;
            }
        }
    }

    return true;
}

const jogarPeca = function(row, col){
    fillPecas(row, col, TURN);
    JOGO[row][col] = TURN;
    TURN = enemy(TURN);
    drawGame();
}

const fillPecas = function(r, c, color){
    var opponent = enemy(color);
    var tr = fillCheckTopRight(opponent, r - 1, c + 1);
    var tl = fillCheckTopLeft(opponent, r - 1, c - 1);
    var top = fillCheckTop(opponent, r - 1, c);

    var br = fillCheckBottomRight(opponent, r + 1, c + 1);
    var bl = fillCheckBottomLeft(opponent, r + 1, c - 1);
    var bottom = fillCheckBottom(opponent, r + 1, c);

    var right = fillCheckRight(opponent, r, c + 1);
    var left = fillCheckLeft(opponent, r, c - 1);

    if(!tr.equals(INV_POINT)){
        fillBottomLeft(color, tr.getX() + 1, tr.getY() - 1);
    }

    if(!tl.equals(INV_POINT)){
        fillBottomRight(color, tl.getX() + 1, tl.getY() + 1);
    }

    if(!top.equals(INV_POINT)){
        fillBottom(color, top.getX() + 1, top.getY());
    }
    
    if(!br.equals(INV_POINT)){
        fillTopLeft(color, br.getX() - 1, br.getY() - 1);
    }

    if(!bl.equals(INV_POINT)){
        fillTopRight(color, bl.getX() - 1, bl.getY() + 1);
    }

    if(!right.equals(INV_POINT)){
        fillLeft(color, right.getX(), right.getY() - 1);
    }

    if(!bottom.equals(INV_POINT)){
        fillTop(color, bottom.getX() - 1, bottom.getY());
    }

    if(!left.equals(INV_POINT)){
        fillRight(color, left.getX(), left.getY() + 1);
    }

}

// Desenha o jogo baseado na matriz JOGO
// Tem de ser chamada apos cada jogada
const drawGame = function(){
    var table = document.getElementById("tabela-jogo");
    if(table == null){
        return;
    }

    clearPlaceholders();
    setPlaceholders(TURN);

    for(let r = 0; r < ROWS; r++){
        for(let c = 0; c < COLS; c++){
            var color = JOGO[r][c];
            setColor(r, c, color);
        }
    }

    
}

// Inicializa um jogo novo
const startGame = function() {
    emptyTable();
    fillStartingPositions();
    drawGame();
}
