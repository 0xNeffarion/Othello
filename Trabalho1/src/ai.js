// MINIMAX CONFIG
const MAX_DEPTH = 5;
const MAX = WHITE;
const MIN = BLACK;

class Pair {
    constructor (key, value){
        this.key = key;
        this.value = value;
    }

    getKey() {
        return this.key;
    }

    getValue() {
        return this.value;
    }
}

const copyGame = function(){
    return [...JOGO];
}

const cpuPlay = function(TABULEIRO, cpuColor) {
    var JOGO_TMP = [...TABULEIRO];
    var mm = minimax(JOGO_TMP, MAX_DEPTH, cpuColor);
    console.log(mm);
    return JOGO_TMP;
}

const minimax = function(TABULEIRO, depth, player){
    if(depth <= 0 || isFull(TABULEIRO)){
        return countPoints(TABULEIRO, player);
    }

    var value;
    if(player === MAX){
        var children = getChildren(TABULEIRO, MAX);
        for(child in children){
            var tab = child.getKey();
            var play = child.getValue();
            value = Math.max(play.getValue(), minimax(tab, depth - 1, MIN));
        }

        return value;
    }else if(player === MIN){
        var children = getChildren(TABULEIRO, MIN);
        for(child in children){
            var tab = child.getKey();
            var play = child.getValue();
            value = Math.min(play.getValue(), minimax(tab, depth - 1, MAX));
        }

        return value;
    }
}

const getChildren = function(TABULEIRO, color){
    var nodes = [];
    for(var r = 0; r < ROWS; r++){
        for(var c = 0; c < COLS; c++){
            if(TABULEIRO[r][c] === PLACEHOLDER){
                var JOGO_COPY = [...TABULEIRO];
                var pair = abstractPlace(JOGO_COPY, color, r, c);
                nodes.push(new Pair(JOGO_COPY, pair));
            }
        }
    }

    return nodes;
}

const abstractPlace = function(TABULEIRO, color, row, col) {
    var point = new Point(row,col);
    fillPecas(TABULEIRO, row, col, color);
    var points = countPoints(TABULEIRO, color);
    clearPlaceholders(TABULEIRO);
    setPlaceholders(TABULEIRO, enemy(col));
    return new Pair(point, points);
}

const countPoints = function(TABULEIRO, color) {
    var c = 0;
    for(var r = 0; r < ROWS; r++){
        for(var c = 0; c < COLS; c++){
            if(TABULEIRO[r][c] === color){
                c += (color == MAX ? 1 : -1);
            }
        }
    }

    return c;
}
