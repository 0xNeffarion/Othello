const MAX_DEPTH = 5;

const BLACK = -1;
const WHITE = 1;
const PLACEHOLDER = 2;
const EMPTY = 0;

const MAX = WHITE;
const MIN = BLACK;

const PLAYER = WHITE;
const CPU = BLACK;

const ROWS = 8;
const COLS = 8;

var TURN = PLAYER;

const PLACEHOLDER_MASK = [
    [0, 1, 0],
    [1, 0, 1],
    [0, 1, 0]
];

var JOGO = new Array(ROWS);

const emptyTable = function(){
    JOGO = new Array(ROWS);

    for(let i = 0; i < COLS; i++){
        JOGO[i] = constructRows();
    }
}

const constructRows = function() {
    var arr = new Array(ROWS);
    for(let i = 0; i < ROWS; i++){
        arr[i] = EMPTY;
    }

    return arr;
}

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

const fillStartingPositions = function(){
    JOGO[3][3] = WHITE;
    JOGO[3][4] = BLACK;
    JOGO[4][3] = BLACK;
    JOGO[4][4] = WHITE;
}

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

const isEmpty = function(row, col){
    return JOGO[row][col] === EMPTY || JOGO[row][col] === PLACEHOLDER;
}

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

const startGame = function() {
    emptyTable();
    fillStartingPositions();
    drawGame();
}
