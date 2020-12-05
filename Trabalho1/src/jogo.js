// ------------------ Constantes ------------------------------

// PEÇAS
const BLACK = -1;
const WHITE = 1;
const PLACEHOLDER = 2;
const EMPTY = 0;

// TAMANHO DO TABULEIRO
const ROWS = 8;
const COLS = 8;

// ------------------ Variaveis ------------------------------

// COR DOS JOGADORES
var PLAYER = WHITE;
var CPU = BLACK;

// JOGADOR DO TURNO DE AGORA
var TURN = PLAYER;

var againstCPU = false;
var againstPLAYER = false;

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
const countPieces = function(TABULEIRO, color){
    var count = 0;
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            if(TABULEIRO[r][c] === color){
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

    setPlaceholders(JOGO, TURN);
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

// Cria e poem uma peça com a cor desejada e poem na linha 'row' e coluna 'col'
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
                dot.addEventListener("click", function() {
                    if(!isSleeping){
                        jogarPeca(row, col);
                    }
                });
            }

            colElement[0].appendChild(dot);
        }
    }
}

// Verifica se a coordenada dada esta vazia ou tem placeholder
const isEmpty = function(row, col){
    return JOGO[row][col] === EMPTY || JOGO[row][col] === PLACEHOLDER;
}

const updateEstado = function(){
    var jogador = (TURN == WHITE) ? "Branco" : "Preto";
    addMsg("E o turno do jogador " + jogador);
    document.getElementById("jogador_turno").innerText = jogador;
    updatePontos();
}

const clearPlaceholders = function(TABULEIRO){
    for(let r = 0; r < ROWS; r++){
        for(let c = 0; c < COLS; c++){
            if(TABULEIRO[r][c] == PLACEHOLDER){
                TABULEIRO[r][c] = 0;
            }
        }
    }
}

const canPlay = function(TABULEIRO){
    return countPieces(TABULEIRO, PLACEHOLDER) > 0;
}

// Cria placeholders para a jogada do utilizador
const setPlaceholders = function(TABULEIRO, color){
    clearPlaceholders(TABULEIRO);

    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            if(TABULEIRO[r][c] !== color){
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
                TABULEIRO[tr.getX()][tr.getY()] = PLACEHOLDER;
            }

            if(!tl.equals(INV_POINT)){
                TABULEIRO[tl.getX()][tl.getY()] = PLACEHOLDER;
            }

            if(!top.equals(INV_POINT)){
                TABULEIRO[top.getX()][top.getY()] = PLACEHOLDER;
            }

            if(!br.equals(INV_POINT)){
                TABULEIRO[br.getX()][br.getY()] = PLACEHOLDER;
            }

            if(!bl.equals(INV_POINT)){
                TABULEIRO[bl.getX()][bl.getY()] = PLACEHOLDER;
            }

            if(!right.equals(INV_POINT)){
                TABULEIRO[right.getX()][right.getY()] = PLACEHOLDER;
            }

            if(!bottom.equals(INV_POINT)){
                TABULEIRO[bottom.getX()][bottom.getY()] = PLACEHOLDER;
            }

            if(!left.equals(INV_POINT)){
                TABULEIRO[left.getX()][left.getY()] = PLACEHOLDER;
            }

        }
    }
}

const copyTable = function(table){
    var NT = new Array(ROWS);

    for(let i = 0; i < COLS; i++){
        NT[i] = constructRows();
    }

    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            NT[r][c] = table[r][c];
        }
    }

    return NT;
}

// ---

// Jogo acabou
/*const isFull = function(TABULEIRO){
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            if(TABULEIRO[r][c] == EMPTY || TABULEIRO[r][c] == PLACEHOLDER){
                return false;
            }
        }
    }

    return true;
}*/

// CPU Play
const cpuJogarPeca = async function(row, col){

    addMsg("O jogador selecionou a peca em " + "(" + row + ", " + col + ")");
    // JOGADOR
    fillPecas(JOGO, row, col, TURN);

    if(winTrigger()){
        winnerPopup();
    }

    // Switch turn
    TURN = enemy(TURN);
    drawGame();
    setPlaceholders(JOGO, TURN);
    updateEstado();

    // CPU Play
    if(canPlay(JOGO)){
        isSleeping = true;
        await sleep(CPU_SLEEP_MS);
        var coord = cpuPlay(JOGO, TURN);
        fillPecas(JOGO, coord.getX(), coord.getY(), TURN);

        addMsg("O cpu selecionou a peca em " + "(" + coord.getX() + ", " + coord.getY() + ")");
        isSleeping = false;

        if(winTrigger()){
            winnerPopup();
        }
    }

    // Draw my turn
    TURN = enemy(TURN);
    setPlaceholders(JOGO, TURN);
    drawGame();
    updateEstado();

    // Can't make a move
    if(!canPlay(JOGO)){
        isSleeping = true;
        TURN = enemy(TURN);
        await sleep(CPU_SLEEP_MS);
        var coord = cpuPlay(JOGO, TURN);
        //fillPecas(JOGO, coord.getX(), coord.getY(), TURN);
        //addMsg("O cpu selecionou a peca em " + "(" + coord.getX() + ", " + coord.getY() + ")");
        TURN = enemy(TURN);
        setPlaceholders(JOGO, TURN);
        drawGame();
        updateEstado();
        isSleeping = false;

        if(winTrigger()){
            winnerPopup();
            checkWin();
            updateWinSettings();
        }
    }
}

const updatePontos = function(){
    var branco = countPoints(JOGO, WHITE);
    var preto = countPoints(JOGO, BLACK);
    var empty = countPoints(JOGO, EMPTY) + countPoints(JOGO, PLACEHOLDER);

    document.getElementById("pontos_oponente").innerText = CPU == WHITE ? branco : preto;
    document.getElementById("pontos_jogador").innerText = PLAYER == WHITE ? branco : preto;
    document.getElementById("pontos_vazio").innerText = empty;
}

// Inicializa os valores das vitorias com WebStorage
const updateWinSettings = function(){
    let val = parseInt(localStorage.getItem("PC"));
    document.getElementById("PC_vic").innerText = val;
    let vi = parseInt(localStorage.getItem("USER"));
    document.getElementById("Minhas_vic").innerText = vi;
    let a = "aqui";
    console.log(a);
}

const checkWin = function(){
  let key =  "PC";
  localStorage.setItem(key, localStorage.getItem(key));

  let chave = "USER";
  localStorage.setItem(chave, localStorage.getItem(chave));

  /*let bool = canPlay(JOGO);
  console.log(bool);*/
      var branco = countPoints(JOGO, WHITE);
      var preto = countPoints(JOGO, BLACK);
      var myScore = branco;
      var opponentScore = preto;

        if(myScore>opponentScore){
          let val = parseInt(localStorage.getItem(chave));
          //console.log(val);
          var pcVict = 0;
          userVict = val+1;
          localStorage.setItem(chave, userVict);
        } else{
          let vi = parseInt(localStorage.getItem(key));
          //console.log(vi);
          var userVict = 0;
          pcVict = vi+1;
          localStorage.setItem(key, pcVict);
        }


    let val = localStorage.getItem(key);
    //console.log(val);
    document.getElementById("PC_vic").innerText = val;
    let vi = localStorage.getItem(chave);
    //console.log(vi);
    document.getElementById("Minhas_vic").innerText = vi;

}



const fillPecas = function(TABULEIRO, r, c, color){
    TABULEIRO[r][c] = color;
    var opponent = enemy(color);
    var tr = fillCheckTopRight(TABULEIRO, opponent, r - 1, c + 1);
    var tl = fillCheckTopLeft(TABULEIRO, opponent, r - 1, c - 1);
    var top = fillCheckTop(TABULEIRO, opponent, r - 1, c);

    var br = fillCheckBottomRight(TABULEIRO, opponent, r + 1, c + 1);
    var bl = fillCheckBottomLeft(TABULEIRO, opponent, r + 1, c - 1);
    var bottom = fillCheckBottom(TABULEIRO, opponent, r + 1, c);

    var right = fillCheckRight(TABULEIRO, opponent, r, c + 1);
    var left = fillCheckLeft(TABULEIRO, opponent, r, c - 1);

    if(!tr.equals(INV_POINT)){
        fillBottomLeft(TABULEIRO, color, tr.getX() + 1, tr.getY() - 1);
    }

    if(!tl.equals(INV_POINT)){
        fillBottomRight(TABULEIRO, color, tl.getX() + 1, tl.getY() + 1);
    }

    if(!top.equals(INV_POINT)){
        fillBottom(TABULEIRO, color, top.getX() + 1, top.getY());
    }

    if(!br.equals(INV_POINT)){
        fillTopLeft(TABULEIRO, color, br.getX() - 1, br.getY() - 1);
    }

    if(!bl.equals(INV_POINT)){
        fillTopRight(TABULEIRO, color, bl.getX() - 1, bl.getY() + 1);
    }

    if(!right.equals(INV_POINT)){
        fillLeft(TABULEIRO, color, right.getX(), right.getY() - 1);
    }

    if(!bottom.equals(INV_POINT)){
        fillTop(TABULEIRO, color, bottom.getX() - 1, bottom.getY());
    }

    if(!left.equals(INV_POINT)){
        fillRight(TABULEIRO, color, left.getX(), left.getY() + 1);
    }

}

// Desenha o jogo baseado na matriz JOGO
const drawGame = function(){
    var table = document.getElementById("tabela-jogo");
    if(table == null){
        return;
    }

    var color;
    for(let r = 0; r < ROWS; r++){
        for(let c = 0; c < COLS; c++){
            color = JOGO[r][c];
            setColor(r, c, color);
        }
    }
}

// Inicializa um jogo novo com o cpu
const cpuStartGame = function(difficulty, myColor) {
    MAX_DEPTH = difficulty;
    PLAYER = myColor;
    CPY = enemy(myColor);
    TURN = PLAYER;
    emptyTable();
    fillStartingPositions();
    drawGame();
    updateEstado();
}

// Clica num disco
const jogarPeca = function(row, col){
    if(currentGameInfo != null){
        playerJogarPeca(row,col);
    }else{
        cpuJogarPeca(row, col);
    }
}

// Inicializa um jogo novo com outro jogador
const playerStartGame = function(startingBoard, turn){
    console.log("Starting a new game...");

    emptyTable();
    JOGO = copyTable(startingBoard);

    PLAYER = currentGameInfo.getColor();
    CPU = enemy(PLAYER);
    TURN = (turn == utilizador.getNickname() ? PLAYER : CPU);

    if(TURN == PLAYER){
        setPlaceholders(JOGO, PLAYER);
    }

    drawGame();
    updateEstado();


    if(TURN == PLAYER){
        toggleLoadOverlay(false);
    }else{
        toggleLoadOverlay(true);
    }

    console.log("New game started");
}

const updateBoard = function(update){
    console.log("Updating board with new info");
    JOGO = copyTable(update.getRealBoard());

    var myColor = currentGameInfo.getColor();
    if(update.getTurn() == utilizador.getNickname()){
        TURN = myColor;
        setPlaceholders(JOGO, myColor);
    }else{
        TURN = enemy(myColor);
    }

    drawGame();
    updateEstado();
    console.log("Done");
}

const playerJogarPeca = async function(row, col){
    await playDisc(row, col);
}

const winTrigger = function(){
    return (countPieces(JOGO, EMPTY) + countPieces(JOGO, PLACEHOLDER)) === 0;
}

const getWinner = function(){
    var player = countPieces(JOGO, PLAYER);
    var cpu = countPieces(JOGO, CPU);

    if(player === cpu){
        return null;
    }

    return (player > cpu) ? PLAYER : CPU;
}

const winnerPopup = function(){
    var winner = getWinner();
    var msg = "N/A";
    if(winner == null){
        msg = "Jogo Empatado!";
    }else if(winner === PLAYER){
        msg = "O Jogador Ganhou!";
    }else if(winner === CPU){
        msg = "O CPU Ganhou!";
    }

    showPopup(msg);
    //updateWinSettings();
    addMsg(msg);
}
