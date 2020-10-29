// Check plays

const checkTopRight = function(opponent, row, col, found){
    if(row >= ROWS || row < 0 || col >= COLS || col < 0){
        return INV_POINT;
    }

    if(isEmpty(row, col) && found){
        return new Point(row, col);
    }

    var cor = JOGO[row][col];

    if(cor == opponent){
        return checkTopRight(opponent, row - 1, col + 1, true);
    }

    return INV_POINT;
}

const checkTopLeft = function(opponent, row, col, found){
    if(row >= ROWS || row < 0 || col >= COLS || col < 0){
        return INV_POINT;
    }

    if(isEmpty(row, col) && found){
        return new Point(row, col);
    }

    var cor = JOGO[row][col];

    if(cor == opponent){
        return checkTopLeft(opponent, row - 1, col - 1, true);
    }

    return INV_POINT;
}

const checkTop = function(opponent, row, col, found){
    if(row >= ROWS || row < 0 || col >= COLS || col < 0){
        return INV_POINT;
    }

    if(isEmpty(row, col) && found){
        return new Point(row, col);
    }

    var cor = JOGO[row][col];

    if(cor == opponent){
        return checkTop(opponent, row - 1, col, true);
    }

    return INV_POINT;
}

const checkBottom = function(opponent, row, col, found){
    if(row >= ROWS || row < 0 || col >= COLS || col < 0){
        return INV_POINT;
    }

    if(isEmpty(row, col) && found){
        return new Point(row, col);
    }

    var cor = JOGO[row][col];

    if(cor == opponent){
        return checkBottom(opponent, row + 1, col, true);
    }

    return INV_POINT;
}

const checkBottomRight = function(opponent, row, col, found){
    if(row >= ROWS || row < 0 || col >= COLS || col < 0){
        return INV_POINT;
    }

    if(isEmpty(row, col) && found){
        return new Point(row, col);
    }

    var cor = JOGO[row][col];

    if(cor == opponent){
        return checkBottomRight(opponent, row + 1, col + 1, true);
    }

    return INV_POINT;
}

const checkBottomLeft = function(opponent, row, col, found){
    if(row >= ROWS || row < 0 || col >= COLS || col < 0){
        return INV_POINT;
    }

    if(isEmpty(row, col) && found){
        return new Point(row, col);
    }

    var cor = JOGO[row][col];

    if(cor == opponent){
        return checkBottomLeft(opponent, row + 1, col - 1, true);
    }

    return INV_POINT;
}

const checkRight = function(opponent, row, col, found){
    if(row >= ROWS || row < 0 || col >= COLS || col < 0){
        return INV_POINT;
    }

    if(isEmpty(row, col) && found){
        return new Point(row, col);
    }

    var cor = JOGO[row][col];

    if(cor == opponent){
        return checkRight(opponent, row, col + 1, true);
    }

    return INV_POINT;
}

const checkLeft = function(opponent, row, col, found){
    if(row >= ROWS || row < 0 || col >= COLS || col < 0){
        return INV_POINT;
    }

    if(isEmpty(row, col) && found){
        return new Point(row, col);
    }

    var cor = JOGO[row][col];

    if(cor == opponent){
        return checkLeft(opponent, row, col - 1, true);
    }

    return INV_POINT;
}


// Fill spots

const fillTopRight = function(mycolor, row, col){
    if(row >= ROWS || row < 0 || col >= COLS || col < 0){
        return INV_POINT;
    }
    
    var cor = JOGO[row][col];
    var opponent = oposto(mycolor);

    if(cor == mycolor){
        return new Point(row, col);
    }else if(cor == opponent){
        JOGO[row][col] = mycolor;
        return fillTopRight(opponent, row - 1, col + 1);
    }

    return INV_POINT;
}

const fillTopLeft = function(mycolor, row, col){
    if(row >= ROWS || row < 0 || col >= COLS || col < 0){
        return INV_POINT;
    }
    
    var cor = JOGO[row][col];
    var opponent = oposto(mycolor);

    if(cor == mycolor){
        return new Point(row, col);
    }else if(cor == opponent){
        JOGO[row][col] = mycolor;
        return fillTopLeft(opponent, row - 1, col - 1);
    }

    return INV_POINT;
}

const fillTop = function(mycolor, row, col){
    if(row >= ROWS || row < 0 || col >= COLS || col < 0){
        return INV_POINT;
    }
    
    var cor = JOGO[row][col];
    var opponent = oposto(mycolor);

    if(cor == mycolor){
        return new Point(row, col);
    }else if(cor == opponent){
        JOGO[row][col] = mycolor;
        return fillTop(opponent, row - 1, col);
    }

    return INV_POINT;
}

const fillBottom = function(mycolor, row, col){
    if(row >= ROWS || row < 0 || col >= COLS || col < 0){
        return INV_POINT;
    }
    
    var cor = JOGO[row][col];
    var opponent = oposto(mycolor);

    if(cor == mycolor){
        return new Point(row, col);
    }else if(cor == opponent){
        JOGO[row][col] = mycolor;
        return fillBottom(opponent, row + 1, col);
    }

    return INV_POINT;
}

const fillBottomRight = function(mycolor, row, col){
    if(row >= ROWS || row < 0 || col >= COLS || col < 0){
        return INV_POINT;
    }
    
    var cor = JOGO[row][col];
    var opponent = oposto(mycolor);

    if(cor == mycolor){
        return new Point(row, col);
    }else if(cor == opponent){
        JOGO[row][col] = mycolor;
        return fillBottomRight(opponent, row + 1, col + 1);
    }

    return INV_POINT;
}

const fillBottomLeft = function(mycolor, row, col){
    if(row >= ROWS || row < 0 || col >= COLS || col < 0){
        return INV_POINT;
    }
    
    var cor = JOGO[row][col];
    var opponent = oposto(mycolor);

    if(cor == mycolor){
        return new Point(row, col);
    }else if(cor == opponent){
        JOGO[row][col] = mycolor;
        return fillBottomLeft(opponent, row + 1, col - 1);
    }

    return INV_POINT;
}

const fillRight = function(mycolor, row, col){
    if(row >= ROWS || row < 0 || col >= COLS || col < 0){
        return INV_POINT;
    }
    
    var cor = JOGO[row][col];
    var opponent = oposto(mycolor);

    if(cor == mycolor){
        return new Point(row, col);
    }else if(cor == opponent){
        JOGO[row][col] = mycolor;
        return fillRight(opponent, row, col + 1);
    }

    return INV_POINT;
}

const fillLeft = function(mycolor, row, col){
    if(row >= ROWS || row < 0 || col >= COLS || col < 0){
        return INV_POINT;
    }
    
    var cor = JOGO[row][col];
    var opponent = oposto(mycolor);

    if(cor == mycolor){
        return new Point(row, col);
    }else if(cor == opponent){
        JOGO[row][col] = mycolor;
        return fillLeft(opponent, row, col - 1);
    }

    return INV_POINT;
}

// --- Fill check

const fillCheckTopRight = function(opponent, row, col){
    if(row >= ROWS || row < 0 || col >= COLS || col < 0){
        return INV_POINT;
    }
    
    var cor = JOGO[row][col];
    var mycolor = oposto(opponent);

    if(cor == mycolor){
        return new Point(row, col);
    }else if(cor == opponent){
        return fillCheckTopRight(opponent, row - 1, col + 1);
    }

    return INV_POINT;
}

const fillCheckTopLeft = function(opponent, row, col){
    if(row >= ROWS || row < 0 || col >= COLS || col < 0){
        return INV_POINT;
    }
    
    var cor = JOGO[row][col];
    var mycolor = oposto(opponent);

    if(cor == mycolor){
        return new Point(row, col);
    }else if(cor == opponent){
        return fillCheckTopLeft(opponent, row - 1, col - 1);
    }

    return INV_POINT;
}

const fillCheckTop = function(opponent, row, col){
    if(row >= ROWS || row < 0 || col >= COLS || col < 0){
        return INV_POINT;
    }
    
    var cor = JOGO[row][col];
    var mycolor = oposto(opponent);

    if(cor == mycolor){
        return new Point(row, col);
    }else if(cor == opponent){
        return fillCheckTop(opponent, row - 1, col);
    }

    return INV_POINT;
}

const fillCheckBottom = function(opponent, row, col){
    if(row >= ROWS || row < 0 || col >= COLS || col < 0){
        return INV_POINT;
    }
    
    var cor = JOGO[row][col];
    var mycolor = oposto(opponent);

    if(cor == mycolor){
        return new Point(row, col);
    }else if(cor == opponent){
        return fillCheckBottom(opponent, row + 1, col);
    }

    return INV_POINT;
}

const fillCheckBottomRight = function(opponent, row, col){
    if(row >= ROWS || row < 0 || col >= COLS || col < 0){
        return INV_POINT;
    }
    
    var cor = JOGO[row][col];
    var mycolor = oposto(opponent);

    if(cor == mycolor){
        return new Point(row, col);
    }else if(cor == opponent){
        return fillCheckBottomRight(opponent, row + 1, col + 1);
    }

    return INV_POINT;
}

const fillCheckBottomLeft = function(opponent, row, col){
    if(row >= ROWS || row < 0 || col >= COLS || col < 0){
        return INV_POINT;
    }
    
    var cor = JOGO[row][col];
    var mycolor = oposto(opponent);

    if(cor == mycolor){
        return new Point(row, col);
    }else if(cor == opponent){
        return fillCheckBottomLeft(opponent, row + 1, col - 1);
    }

    return INV_POINT;
}

const fillCheckRight = function(opponent, row, col){
    if(row >= ROWS || row < 0 || col >= COLS || col < 0){
        return INV_POINT;
    }
    
    var cor = JOGO[row][col];
    var mycolor = oposto(opponent);

    if(cor == mycolor){
        return new Point(row, col);
    }else if(cor == opponent){
        return fillCheckRight(opponent, row, col + 1);
    }

    return INV_POINT;
}

const fillCheckLeft = function(opponent, row, col){
    if(row >= ROWS || row < 0 || col >= COLS || col < 0){
        return INV_POINT;
    }
    
    var cor = JOGO[row][col];
    var mycolor = oposto(opponent);

    if(cor == mycolor){
        return new Point(row, col);
    }else if(cor == opponent){
        return fillCheckLeft(opponent, row, col - 1);
    }

    return INV_POINT;
}