
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


function isCellInTheVictoryLine(cell) {
    var rowNum = cell.dataset.row;
    var colNum = cell.dataset.col;
    var cols = gameField.querySelectorAll('td[data-col="' + colNum + '"]');
    var rows = gameField.querySelectorAll('td[data-row="' + rowNum + '"]');
    var verUpWay = 0;
    var verDownWay = 0;
    var horRightWay = 0;
    var horLeftWay = 0;
    var leftGiagDown = 0;
    var leftDiagUp = 0;
    var rightDiagDown =0;
    var rightDiagUp = 0;

    for (var i = rowNum; i < rowNum + 5; i++) {
        if (cols[i] === undefined) break;
        if (cell.innerHTML !== cols[i].innerHTML) {
            break;
        }
        verDownWay++;
    }
    if (verDownWay === 5) return true;

    for (i = rowNum; i > rowNum - 5; i--) {
        if (cols[i] === undefined) break;
        if (cell.innerHTML !== cols[i].innerHTML) {
            break;
        }
        verUpWay++;
    }
    if (verUpWay === 5) return true;
    if (verDownWay + verUpWay - 1 == 5) return true;


// TODO решить проблему, когда появляется комбинация из 6. НАЧАЛО ВТОРАЯ ЧАСТЬ - проверка по горизонтали
// TODO исправить цифру 5, на переменную, которая будет задавать число в зависимости от размера поля


    for ( i = colNum; i < colNum + 5; i++) {
        if (rows[i] === undefined) break;
        if (cell.innerHTML !== rows[i].innerHTML) {
            break;
        }
        horRightWay++;
    }
    if (horRightWay === 5) return true;

    for (i = colNum; i > colNum - 5; i--) {
        if (rows[i] === undefined) break;
        if (cell.innerHTML !== rows[i].innerHTML) {
            break;
        }
        horLeftWay++;
    }
    if (horLeftWay === 5) return true;
    if (horRightWay + horLeftWay - 1 == 5) return true;

    // ПО ДИАГОНАЛИ

    for (i = colNum, j = rowNum; i < colNum + 5 && j < rowNum + 5; i++, j++) {
        var td = gameField.querySelector('td[data-row="' + j + '"][data-col="' + i + '"]');
        if (td == undefined || null) break;
        if (cell.innerHTML !== td.innerHTML) {
            break;
        }
        leftGiagDown++;
    }
    if (leftGiagDown === 5) return true;

    for (i = colNum, j = rowNum; i > colNum - 5 && j > rowNum - 5; i--, j--) {
        td = gameField.querySelector('td[data-row="' + j + '"][data-col="' + i + '"]');
        if (td == undefined || null) break;
        if (cell.innerHTML !== td.innerHTML) {
            break;
        }
        leftDiagUp++;
    }
    if (leftDiagUp === 5) return true;
    if (leftDiagUp + leftGiagDown - 1 == 5) return true;


    // ПО ДИАГОНАЛИ НА ОБОРОТ

    for (i = colNum, j = rowNum; i > colNum - 5 && j < rowNum + 5; i--, j++) {
        td = gameField.querySelector('td[data-row="' + j + '"][data-col="' + i + '"]');
        if (td == undefined || null) break;
        if (cell.innerHTML !== td.innerHTML) {
            break;
        }
        rightDiagDown++;
    }
    if (rightDiagDown === 5) return true;

    for (i = colNum, j = rowNum; i < colNum + 5 && j > rowNum - 5; i++, j--) {
        td = gameField.querySelector('td[data-row="' + j + '"][data-col="' + i + '"]');
        if (td == undefined || null) break;
        if (cell.innerHTML !== td.innerHTML) {
            break;
        }
        rightDiagUp++;
    }
    if (rightDiagUp === 5) return true;
    if (rightDiagDown + rightDiagUp - 1 == 5) return true;
    return false;
}

function _(id) {
    return document.getElementById(id);
}
