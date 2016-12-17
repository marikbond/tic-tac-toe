
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
        isCellInTheVictoryLine(cell, onWin);
    }
}

function getCell(rowIndex, colIndex) {
    return gameField.querySelector('td[data-row="' + rowIndex + '"][data-col="' + colIndex + '"]');
}

function onWin(cell, cells) {
    for (var i = 0; i < cells.length; i++) {
        var tdCell = cells[i];
        tdCell.style.backgroundColor = 'yellow';
    }
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

function checkLine(startIndex, cells, targetCell) {
    var directionIncrement = [1, -1];
    var result = [targetCell];
    for (var i = 0; i < directionIncrement.length; i++) {
        var increment = directionIncrement[i];
        var index = startIndex + increment;
        while (cells[index] && cells[index].innerHTML == targetCell.innerHTML) {
            result.push(cells[index]);
            index += increment;
        }
    }
    return result;
}

function deterlineLengthOfWinnerLine(rowCells) {
    switch (rowCells.length) {
        case 3:
            var minSymbolDurationNeededForVictory = 3;
            break;
        case 9:
            minSymbolDurationNeededForVictory = 5;
            break;
        case 15:
            minSymbolDurationNeededForVictory = 7;
            break;
        case 30:
            minSymbolDurationNeededForVictory = 9;
            break;
    }
    return minSymbolDurationNeededForVictory;
}

function checkHorizontalLine(params) {
    return checkLine(params.colNum, params.rowCells, params.targetCell);
}

function checkVerticalLine(params) {
    return checkLine(params.rowNum, params.colCells, params.targetCell);
}

function checkRightDiagonalLines(params) {
    var directionIncrement = [1, -1];
    var result = [params.targetCell];
    for (var i = 0; i < directionIncrement.length; i++) {
        var increment = directionIncrement[i];
        var colIndex = params.colNum + increment;
        var rowIndex = params.rowNum + increment;
        var cell = getCell(rowIndex, colIndex);
        while (cell && cell.innerHTML === params.targetCell.innerHTML) {
            result.push(cell);
            colIndex += increment;
            rowIndex += increment;
            cell = getCell(rowIndex, colIndex);
        }
    }
    return result;
}

function checkLeftDiagonalLine(params) {
    var directionIncrement = [1, -1];
    var result = [params.targetCell];
    for (var i = 0; i < directionIncrement.length; i++) {
        var increment = directionIncrement[i];
        var colIndex = params.colNum - increment;
        var rowIndex = params.rowNum + increment;
        var cell = getCell(rowIndex, colIndex);
        while (cell && cell.innerHTML === params.targetCell.innerHTML) {
            result.push(cell);
            colIndex -= increment;
            rowIndex += increment;
            cell = getCell(rowIndex, colIndex);
        }
    }
    return result;
}

function isCellInTheVictoryLine(cell, onWin) {
    var rowNum = cell.dataset.row;
    var colNum = cell.dataset.col;
    var colCells = gameField.querySelectorAll('td[data-col="' + colNum + '"]');
    var rowCells = gameField.querySelectorAll('td[data-row="' + rowNum + '"]');
    var  minSymbolDurationNeededForVictory = deterlineLengthOfWinnerLine(rowCells);
    var params = {
        rowNum: +rowNum,
        colNum: +colNum,
        rowCells: rowCells,
        colCells: colCells,
        targetCell: cell
    };

    var waysArr = [checkHorizontalLine(params), checkVerticalLine(params), checkRightDiagonalLines(params), checkLeftDiagonalLine(params)];
    for (var i = 0; i < waysArr.length; i++) {
        var result = waysArr[i];
        if (result.length >= minSymbolDurationNeededForVictory) {
            onWin(cell, result);
            return;
        }
    }
    return false;
}

function _(id) {
    return document.getElementById(id);
}