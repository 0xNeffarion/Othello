const boundsCheck = function(row, col){
    if(row >= ROWS || row < 0 || col >= COLS || col < 0){
        return false;
    }

    return true;
}

// ------------------------------------------------------
// Recursively check available plays

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
    var mycolor = enemy(opponent);

    if(cor == mycolor){
        return new Point(row, col);
    }else if(cor == opponent){
        return fillCheckLeft(TABULEIRO, opponent, row, col - 1);
    }

    return INV_POINT;
}