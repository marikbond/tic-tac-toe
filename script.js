
var x = 'X';
var o = 'O';
var nextSymbol = x;
var lastWinner = null;
var gameField = null;

function onClickHandler(event) {
    if (nextSymbol === 'none') return false;
    var cell = event.target;
    while (cell != gameField) {
        if (cell.tagName == 'TD') {
            turnHandler(cell);
            break;
        }
        cell = cell.parentNode;
    }
}

_('field-creator').onclick = function () {
    var select = document.forms.fieldSize.elements.shape;
    for (var i = 0; i < select.options.length; i++) {
        var option = select.options[i];
        if(option.selected) {
            var size = parseInt(option.value, 10);
            gameField = createGameField(size, onClickHandler);
        }
    }
};

function createGameField(size, onClickHandler) {
    var gameField = document.createElement('table');
    gameField.id = "game-field";
    for (var i = 0; i < size; i++) {
        var tableRow = document.createElement('tr');
        for (var j = 0; j < size; j++) {
            var td = document.createElement('td');
            td.dataset.row = i;
            td.dataset.col = j;
            tableRow.appendChild(td);
        }
        gameField.appendChild(tableRow);
    }
    _('game-field-container').innerHTML = '';
    _('game-field-container').appendChild(gameField);
    gameField.onclick = onClickHandler;
    return gameField;
}


function turnHandler(cell) {
    if (!cell.innerHTML) {
        cell.innerHTML = nextSymbol;
        nextSymbol = cell.innerHTML == x ? o : x;
        if (isCellInTheVictoryLine(cell)) {
            onWin(cell);
        }
    }
}

function getCell(i, j) {
    return gameField.querySelector('td[data-row="' + j + '"][data-col="' + i + '"]');
}

function onWin(cell) {
    var symbol = cell.innerHTML;
    var spanId = symbol == x ? 'x-score' : 'o-score';
    var span = _(spanId);
    span.innerHTML = +span.innerHTML + 1;
    lastWinner = symbol;
    gameField.className = 'disabled-field';
    alert('Win: ' + symbol);
    nextSymbol = 'none';
}

_('reset-button').onclick = function () {
    gameField.onclick = onClickHandler;
    var tdList = gameField.getElementsByTagName('td');
    for (var i = 0; i < tdList.length; i++) {
        tdList[i].innerHTML = '';
    }
    gameField.className = '';
    nextSymbol = lastWinner;
};


function checkLine(startIndex, cells) {
    var directionIncrement = [1, -1];
    var result = 1;
    for (var i = 0; i <  directionIncrement.length; i++) {
        var increment =  directionIncrement[i];
        var index = startIndex + increment;
        while (cells[index] && cells[index].innerHTML == cells.innerHTML) {
            result++;
            index += increment;
        }
    }
    return result;
}

function checkHorizontalLine(params) {
    return checkLine(params.colNum, params.rowCells);
}

    function checkVerticalLine(params) {
     return checkLine(params.rowNum, params.colCells);
 }
//
// function checkRightDiagonal(???) {
//     return checkDiagonal(???);
// }

function isCellInTheVictoryLine(cell) {
    var rowNum = cell.dataset.row;
    var colNum = cell.dataset.col;
    var colCells = gameField.querySelectorAll('td[data-col="' + colNum + '"]');
    var rowCells = gameField.querySelectorAll('td[data-row="' + rowNum + '"]');
    var minSymbolDurationNeededForVictory = 5;

    var params = {
        rowNum: rowNum,
        colNum: colNum,
        rowCells: rowCells,
        colCells: colCells
    };

    var result = checkHorizontalLine(params);
    if (result >= minSymbolDurationNeededForVictory) {
        return true;
    }
    checkVerticalLine(params);
    if (result >= minSymbolDurationNeededForVictory) {
        return true;
    }


    // var horizontal = checkLine(colNum, rows);
    // if (horizontal >= 5) return true;
    // var vertical = checkLine(rowNum, cols);
    // if (vertical) return true;

    return false;
}

function _(id) {
    return document.getElementById(id);
}
