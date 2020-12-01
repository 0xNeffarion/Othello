// MINIMAX CONFIG
// -------------------

var MAX_DEPTH = 5;
const MAX = BLACK;
const MIN = WHITE;

const CPU_SLEEP_MS = 1500;

class Result {
    constructor(tabuleiro, coord, pontos){
        this.tabuleiro = tabuleiro;
        this.coordenada = coord;
        this.pontos = pontos;
    }

    getTabuleiro() {
        return this.tabuleiro;
    }

    getCoordenada() {
        return this.coordenada;
    }

    getPontos() {
        return this.pontos;
    }

}

const cpuPlay = function(TABULEIRO, cpuColor) {
    return findBestMove(TABULEIRO, cpuColor);
}

const findBestMove = function(TABULEIRO, color){
    var best = -10000;
    var bestPlay = null;
    var children = getChildren(TABULEIRO, color);
    children = shuffle(children);

    for(var i = 0; i < children.length; i++){
        var c = children[i];
        var copy = copyTable(TABULEIRO);
        var score = MINIMAX(copy, MAX_DEPTH, color);

        if(bestPlay == null){
            best = score;
            bestPlay = c.getCoordenada();
        }

        if(Math.abs(score) > best){
            best = score;
            bestPlay = c.getCoordenada();
        }
    }

    return bestPlay;
}

const MINIMAX = function(TABULEIRO, depth, player){
    if(depth <= 0){
        return heuristic(TABULEIRO, player);
    }

    var value;
    var children = getChildren(TABULEIRO, player);
    if(player === MAX){
        for(var i = 0; i < children.length; i++){
            var child = children[i];
            value = Math.max(child.getPontos(), MINIMAX(child.getTabuleiro(), depth - 1, MIN));
        }
    }else if(player === MIN){
        for(var i = 0; i < children.length; i++){
            var child = children[i];
            value = Math.min(child.getPontos(), MINIMAX(child.getTabuleiro(), depth - 1, MAX));
        }
    }

    return value;
}

const getChildren = function(TABULEIRO, color){
    var nodes = [];

    var PLACEHOLDER_TAB = copyTable(TABULEIRO);

    for(var r = 0; r < ROWS; r++){
        for(var c = 0; c < COLS; c++){
            if(PLACEHOLDER_TAB[r][c] === PLACEHOLDER){
                var JOGO_COPY = copyTable(PLACEHOLDER_TAB);
                var result = abstractPlace(JOGO_COPY, color, r, c);
                nodes.push(result);
            }
        }
    }

    return nodes;
}

const abstractPlace = function(TABULEIRO, color, row, col) {
    setPlaceholders(TABULEIRO, color);
    var point = new Point(row,col);

    if(canPlay(TABULEIRO)){
        fillPecas(TABULEIRO, row, col, color);
    }

    return new Result(TABULEIRO,point, heuristic(TABULEIRO, color));
}

const countPoints = function(TABULEIRO, color) {
    var count = 0;
    for(var r = 0; r < ROWS; r++){
        for(var c = 0; c < COLS; c++){
            if(TABULEIRO[r][c] === color){
                count += 1;
            }
        }
    }

    return count;
}

const heuristic = function(TABULEIRO, color) {
    var myScore = countPoints(TABULEIRO, color);
    var opponentScore = countPoints(TABULEIRO, enemy(color));
    return myScore - opponentScore;
}

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}


// ALGORITHMS
const boundsCheck = function(row, col){
    if(row >= ROWS || row < 0 || col >= COLS || col < 0){
        return false;
    }   

    return true;
}

// ------------------------------------------------------
// Recursively check available plays
// ------------------------------------------------------

const checkTopRight = function(opponent, row, col, found){
    if(!boundsCheck(row, col)){
        return INV_POINT;
    }

    if(isEmpty(row, col) && found){
        return new Point(row, col);
    }

    if(JOGO[row][col] == opponent){
        return checkTopRight(opponent, row - 1, col + 1, true);
    }

    return INV_POINT;
}

const checkTopLeft = function(opponent, row, col, found){
    if(!boundsCheck(row, col)){
        return INV_POINT;
    }

    if(isEmpty(row, col) && found){
        return new Point(row, col);
    }

    if(JOGO[row][col] == opponent){
        return checkTopLeft(opponent, row - 1, col - 1, true);
    }

    return INV_POINT;
}

const checkTop = function(opponent, row, col, found){
    if(!boundsCheck(row, col)){
        return INV_POINT;
    }

    if(isEmpty(row, col) && found){
        return new Point(row, col);
    }

    if(JOGO[row][col] == opponent){
        return checkTop(opponent, row - 1, col, true);
    }

    return INV_POINT;
}

const checkBottom = function(opponent, row, col, found){
    if(!boundsCheck(row, col)){
        return INV_POINT;
    }

    if(isEmpty(row, col) && found){
        return new Point(row, col);
    }

    if(JOGO[row][col] == opponent){
        return checkBottom(opponent, row + 1, col, true);
    }

    return INV_POINT;
}

const checkBottomRight = function(opponent, row, col, found){
    if(!boundsCheck(row, col)){
        return INV_POINT;
    }

    if(isEmpty(row, col) && found){
        return new Point(row, col);
    }

    if(JOGO[row][col] == opponent){
        return checkBottomRight(opponent, row + 1, col + 1, true);
    }

    return INV_POINT;
}

const checkBottomLeft = function(opponent, row, col, found){
    if(!boundsCheck(row, col)){
        return INV_POINT;
    }

    if(isEmpty(row, col) && found){
        return new Point(row, col);
    }

    if(JOGO[row][col] == opponent){
        return checkBottomLeft(opponent, row + 1, col - 1, true);
    }

    return INV_POINT;
}

const checkRight = function(opponent, row, col, found){
    if(!boundsCheck(row, col)){
        return INV_POINT;
    }

    if(isEmpty(row, col) && found){
        return new Point(row, col);
    }

    if(JOGO[row][col] == opponent){
        return checkRight(opponent, row, col + 1, true);
    }

    return INV_POINT;
}

const checkLeft = function(opponent, row, col, found){
    if(!boundsCheck(row, col)){
        return INV_POINT;
    }

    if(isEmpty(row, col) && found){
        return new Point(row, col);
    }

    if(JOGO[row][col] == opponent){
        return checkLeft(opponent, row, col - 1, true);
    }

    return INV_POINT;
}

// ------------------------------------------------------------
// Fill spots

const fillTopRight = function(TABULEIRO, mycolor, row, col){
    if(!boundsCheck(row, col)){
        return INV_POINT;
    }
    
    var cor = TABULEIRO[row][col];
    var opponent = enemy(mycolor);

    if(cor == mycolor){
        return new Point(row, col);
    }else if(cor == opponent){
        TABULEIRO[row][col] = mycolor;
        return fillTopRight(TABULEIRO,mycolor, row - 1, col + 1);
    }

    return INV_POINT;
}

const fillTopLeft = function(TABULEIRO,mycolor, row, col){
    if(!boundsCheck(row, col)){
        return INV_POINT;
    }
    
    var cor = TABULEIRO[row][col];
    var opponent = enemy(mycolor);

    if(cor == mycolor){
        return new Point(row, col);
    }else if(cor == opponent){
        TABULEIRO[row][col] = mycolor;
        return fillTopLeft(TABULEIRO,mycolor, row - 1, col - 1);
    }

    return INV_POINT;
}

const fillTop = function(TABULEIRO,mycolor, row, col){
    if(!boundsCheck(row, col)){
        return INV_POINT;
    }
    
    var cor = TABULEIRO[row][col];
    var opponent = enemy(mycolor);

    if(cor == mycolor){
        return new Point(row, col);
    }else if(cor == opponent){
        TABULEIRO[row][col] = mycolor;
        return fillTop(TABULEIRO,mycolor, row - 1, col);
    }

    return INV_POINT;
}

const fillBottom = function(TABULEIRO,mycolor, row, col){
    if(!boundsCheck(row, col)){
        return INV_POINT;
    }
    
    var cor = TABULEIRO[row][col];
    var opponent = enemy(mycolor);

    if(cor == mycolor){
        return new Point(row, col);
    }else if(cor == opponent){
        TABULEIRO[row][col] = mycolor;
        return fillBottom(TABULEIRO,mycolor, row + 1, col);
    }

    return INV_POINT;
}

const fillBottomRight = function(TABULEIRO,mycolor, row, col){
    if(!boundsCheck(row, col)){
        return INV_POINT;
    }
    
    var cor = TABULEIRO[row][col];
    var opponent = enemy(mycolor);

    if(cor == mycolor){
        return new Point(row, col);
    }else if(cor == opponent){
        TABULEIRO[row][col] = mycolor;
        return fillBottomRight(TABULEIRO,mycolor, row + 1, col + 1);
    }

    return INV_POINT;
}

const fillBottomLeft = function(TABULEIRO,mycolor, row, col){
    if(!boundsCheck(row, col)){
        return INV_POINT;
    }
    
    var cor = TABULEIRO[row][col];
    var opponent = enemy(mycolor);

    if(cor == mycolor){
        return new Point(row, col);
    }else if(cor == opponent){
        TABULEIRO[row][col] = mycolor;
        return fillBottomLeft(TABULEIRO,mycolor, row + 1, col - 1);
    }

    return INV_POINT;
}

const fillRight = function(TABULEIRO,mycolor, row, col){
    if(!boundsCheck(row, col)){
        return INV_POINT;
    }
    
    var cor = TABULEIRO[row][col];
    var opponent = enemy(mycolor);

    if(cor == mycolor){
        return new Point(row, col);
    }else if(cor == opponent){
        TABULEIRO[row][col] = mycolor;
        return fillRight(TABULEIRO,mycolor, row, col + 1);
    }

    return INV_POINT;
}

const fillLeft = function(TABULEIRO,mycolor, row, col){
    if(!boundsCheck(row, col)){
        return INV_POINT;
    }
    
    var cor = TABULEIRO[row][col];
    var opponent = enemy(mycolor);

    if(cor == mycolor){
        return new Point(row, col);
    }else if(cor == opponent){
        TABULEIRO[row][col] = mycolor;
        return fillLeft(TABULEIRO,mycolor, row, col - 1);
    }

    return INV_POINT;
}

// --- Fill check

const fillCheckTopRight = function(TABULEIRO, opponent, row, col){
    if(!boundsCheck(row, col)){
        return INV_POINT;
    }
    
    var cor = TABULEIRO[row][col];
    if(cor == PLACEHOLDER){
        return INV_POINT;
    }

    var mycolor = enemy(opponent);

    if(cor == mycolor){
        return new Point(row, col);
    }else if(cor == opponent){
        return fillCheckTopRight(TABULEIRO,opponent, row - 1, col + 1);
    }

    return INV_POINT;
}

const fillCheckTopLeft = function(TABULEIRO, opponent, row, col){
    if(!boundsCheck(row, col)){
        return INV_POINT;
    }
    
    var cor = TABULEIRO[row][col];
    if(cor == PLACEHOLDER){
        return INV_POINT;
    }

    var mycolor = enemy(opponent);

    if(cor == mycolor){
        return new Point(row, col);
    }else if(cor == opponent){
        return fillCheckTopLeft(TABULEIRO,opponent, row - 1, col - 1);
    }

    return INV_POINT;
}

const fillCheckTop = function(TABULEIRO, opponent, row, col){
    if(!boundsCheck(row, col)){
        return INV_POINT;
    }
    
    var cor = TABULEIRO[row][col];
    if(cor == PLACEHOLDER){
        return INV_POINT;
    }

    var mycolor = enemy(opponent);

    if(cor == mycolor){
        return new Point(row, col);
    }else if(cor == opponent){
        return fillCheckTop(TABULEIRO,opponent, row - 1, col);
    }

    return INV_POINT;
}

const fillCheckBottom = function(TABULEIRO, opponent, row, col){
    if(!boundsCheck(row, col)){
        return INV_POINT;
    }
    
    var cor = TABULEIRO[row][col];
    if(cor == PLACEHOLDER){
        return INV_POINT;
    }

    var mycolor = enemy(opponent);

    if(cor == mycolor){
        return new Point(row, col);
    }else if(cor == opponent){
        return fillCheckBottom(TABULEIRO,opponent, row + 1, col);
    }

    return INV_POINT;
}

const fillCheckBottomRight = function(TABULEIRO, opponent, row, col){
    if(!boundsCheck(row, col)){
        return INV_POINT;
    }
    
    var cor = TABULEIRO[row][col];
    if(cor == PLACEHOLDER){
        return INV_POINT;
    }

    var mycolor = enemy(opponent);

    if(cor == mycolor){
        return new Point(row, col);
    }else if(cor == opponent){
        return fillCheckBottomRight(TABULEIRO,opponent, row + 1, col + 1);
    }

    return INV_POINT;
}

const fillCheckBottomLeft = function(TABULEIRO, opponent, row, col){
    if(!boundsCheck(row, col)){
        return INV_POINT;
    }
    
    var cor = TABULEIRO[row][col];
    if(cor == PLACEHOLDER){
        return INV_POINT;
    }

    var mycolor = enemy(opponent);

    if(cor == mycolor){
        return new Point(row, col);
    }else if(cor == opponent){
        return fillCheckBottomLeft(TABULEIRO,opponent, row + 1, col - 1);
    }

    return INV_POINT;
}

const fillCheckRight = function(TABULEIRO, opponent, row, col){
    if(!boundsCheck(row, col)){
        return INV_POINT;
    }
    
    var cor = TABULEIRO[row][col];
    if(cor == PLACEHOLDER){
        return INV_POINT;
    }

    var mycolor = enemy(opponent);

    if(cor == mycolor){
        return new Point(row, col);
    }else if(cor == opponent){
        return fillCheckRight(TABULEIRO,opponent, row, col + 1);
    }

    return INV_POINT;
}

const fillCheckLeft = function(TABULEIRO, opponent, row, col){
    if(!boundsCheck(row, col)){
        return INV_POINT;
    }
    
    var cor = TABULEIRO[row][col];
    if(cor == PLACEHOLDER){
        return INV_POINT;
    }

    var mycolor = enemy(opponent);

    if(cor == mycolor){
        return new Point(row, col);
    }else if(cor == opponent){
        return fillCheckLeft(TABULEIRO, opponent, row, col - 1);
    }

    return INV_POINT;
}