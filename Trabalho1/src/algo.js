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

const fillTopRight = function(mycolor, row, col){
    if(!boundsCheck(row, col)){
        return INV_POINT;
    }
    
    var cor = JOGO[row][col];
    var opponent = enemy(mycolor);

    if(cor == mycolor){
        return new Point(row, col);
    }else if(cor == opponent){
        JOGO[row][col] = mycolor;
        return fillTopRight(mycolor, row - 1, col + 1);
    }

    return INV_POINT;
}

const fillTopLeft = function(mycolor, row, col){
    if(!boundsCheck(row, col)){
        return INV_POINT;
    }
    
    var cor = JOGO[row][col];
    var opponent = enemy(mycolor);

    if(cor == mycolor){
        return new Point(row, col);
    }else if(cor == opponent){
        JOGO[row][col] = mycolor;
        return fillTopLeft(mycolor, row - 1, col - 1);
    }

    return INV_POINT;
}

const fillTop = function(mycolor, row, col){
    if(!boundsCheck(row, col)){
        return INV_POINT;
    }
    
    var cor = JOGO[row][col];
    var opponent = enemy(mycolor);

    if(cor == mycolor){
        return new Point(row, col);
    }else if(cor == opponent){
        JOGO[row][col] = mycolor;
        return fillTop(mycolor, row - 1, col);
    }

    return INV_POINT;
}

const fillBottom = function(mycolor, row, col){
    if(!boundsCheck(row, col)){
        return INV_POINT;
    }
    
    var cor = JOGO[row][col];
    var opponent = enemy(mycolor);

    if(cor == mycolor){
        return new Point(row, col);
    }else if(cor == opponent){
        JOGO[row][col] = mycolor;
        return fillBottom(mycolor, row + 1, col);
    }

    return INV_POINT;
}

const fillBottomRight = function(mycolor, row, col){
    if(!boundsCheck(row, col)){
        return INV_POINT;
    }
    
    var cor = JOGO[row][col];
    var opponent = enemy(mycolor);

    if(cor == mycolor){
        return new Point(row, col);
    }else if(cor == opponent){
        JOGO[row][col] = mycolor;
        return fillBottomRight(mycolor, row + 1, col + 1);
    }

    return INV_POINT;
}

const fillBottomLeft = function(mycolor, row, col){
    if(!boundsCheck(row, col)){
        return INV_POINT;
    }
    
    var cor = JOGO[row][col];
    var opponent = enemy(mycolor);

    if(cor == mycolor){
        return new Point(row, col);
    }else if(cor == opponent){
        JOGO[row][col] = mycolor;
        return fillBottomLeft(mycolor, row + 1, col - 1);
    }

    return INV_POINT;
}

const fillRight = function(mycolor, row, col){
    if(!boundsCheck(row, col)){
        return INV_POINT;
    }
    
    var cor = JOGO[row][col];
    var opponent = enemy(mycolor);

    if(cor == mycolor){
        return new Point(row, col);
    }else if(cor == opponent){
        JOGO[row][col] = mycolor;
        return fillRight(mycolor, row, col + 1);
    }

    return INV_POINT;
}

const fillLeft = function(mycolor, row, col){
    if(!boundsCheck(row, col)){
        return INV_POINT;
    }
    
    var cor = JOGO[row][col];
    var opponent = enemy(mycolor);

    if(cor == mycolor){
        return new Point(row, col);
    }else if(cor == opponent){
        JOGO[row][col] = mycolor;
        return fillLeft(mycolor, row, col - 1);
    }

    return INV_POINT;
}

// --- Fill check

const fillCheckTopRight = function(opponent, row, col){
    if(!boundsCheck(row, col)){
        return INV_POINT;
    }
    
    var cor = JOGO[row][col];
    var mycolor = enemy(opponent);

    if(cor == mycolor){
        return new Point(row, col);
    }else if(cor == opponent){
        return fillCheckTopRight(opponent, row - 1, col + 1);
    }

    return INV_POINT;
}

const fillCheckTopLeft = function(opponent, row, col){
    if(!boundsCheck(row, col)){
        return INV_POINT;
    }
    
    var cor = JOGO[row][col];
    var mycolor = enemy(opponent);

    if(cor == mycolor){
        return new Point(row, col);
    }else if(cor == opponent){
        return fillCheckTopLeft(opponent, row - 1, col - 1);
    }

    return INV_POINT;
}

const fillCheckTop = function(opponent, row, col){
    if(!boundsCheck(row, col)){
        return INV_POINT;
    }
    
    var cor = JOGO[row][col];
    var mycolor = enemy(opponent);

    if(cor == mycolor){
        return new Point(row, col);
    }else if(cor == opponent){
        return fillCheckTop(opponent, row - 1, col);
    }

    return INV_POINT;
}

const fillCheckBottom = function(opponent, row, col){
    if(!boundsCheck(row, col)){
        return INV_POINT;
    }
    
    var cor = JOGO[row][col];
    var mycolor = enemy(opponent);

    if(cor == mycolor){
        return new Point(row, col);
    }else if(cor == opponent){
        return fillCheckBottom(opponent, row + 1, col);
    }

    return INV_POINT;
}

const fillCheckBottomRight = function(opponent, row, col){
    if(!boundsCheck(row, col)){
        return INV_POINT;
    }
    
    var cor = JOGO[row][col];
    var mycolor = enemy(opponent);

    if(cor == mycolor){
        return new Point(row, col);
    }else if(cor == opponent){
        return fillCheckBottomRight(opponent, row + 1, col + 1);
    }

    return INV_POINT;
}

const fillCheckBottomLeft = function(opponent, row, col){
    if(!boundsCheck(row, col)){
        return INV_POINT;
    }
    
    var cor = JOGO[row][col];
    var mycolor = enemy(opponent);

    if(cor == mycolor){
        return new Point(row, col);
    }else if(cor == opponent){
        return fillCheckBottomLeft(opponent, row + 1, col - 1);
    }

    return INV_POINT;
}

const fillCheckRight = function(opponent, row, col){
    if(!boundsCheck(row, col)){
        return INV_POINT;
    }
    
    var cor = JOGO[row][col];
    var mycolor = enemy(opponent);

    if(cor == mycolor){
        return new Point(row, col);
    }else if(cor == opponent){
        return fillCheckRight(opponent, row, col + 1);
    }

    return INV_POINT;
}

const fillCheckLeft = function(opponent, row, col){
    if(!boundsCheck(row, col)){
        return INV_POINT;
    }
    
    var cor = JOGO[row][col];
    var mycolor = enemy(opponent);

    if(cor == mycolor){
        return new Point(row, col);
    }else if(cor == opponent){
        return fillCheckLeft(opponent, row, col - 1);
    }

    return INV_POINT;
}