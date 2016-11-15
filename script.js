
var x = 'X';
var o = 'O';
var nextSymbol = x;

var gameField = createGameField();

gameField.onclick = onclickHandler;

function onclickHandler(event) {
    var cell = event.target;
    while (cell != gameField) {
        if (cell.tagName == 'TD') {
            turnHandler(cell);
            break;
        }
        cell = cell.parentNode;
    }
    return false;
}

function createGameField() {
    var gameField = document.createElement('table');
    gameField.id = "game-field";
    for (var i = 0; i < 3; i++) {
        var tableRow = document.createElement('tr');
        for (var j = 0; j < 3; j++) {
            var td = document.createElement('td');
            td.dataset.row = i;
            td.dataset.col = j;
            tableRow.appendChild(td);
        }
        gameField.appendChild(tableRow);
    }
    _('game-field-container').appendChild(gameField);
    return gameField;
}

function turnHandler(cell) {
    if (!cell.innerHTML) {
        cell.innerHTML = nextSymbol;
        nextSymbol = cell.innerHTML == x ? o : x;
        if (isCellInTheVictoryLine(cell)) {
            onWIn(cell);
        }
    }
}

function onWIn(cell) {
    var symbol = cell.innerHTML;
    var spanId = symbol == x ? 'x-score' : 'o-score';
    var span = _(spanId);
    span.innerHTML = +span.innerHTML + 1;
    gameField.onclick = function () {
        return false;
    };
    gameField.className = 'disabled-field';
    alert('Win: ' + symbol);
    nextSymbol = symbol;
}

_('reset-button').onclick = function () {
    gameField.onclick = onclickHandler;
    var tdList = gameField.getElementsByTagName('td');
    for (var i = 0; i < tdList.length; i++) {
        tdList[i].innerHTML = '';
    }
    gameField.className = '';
};

function isCellInTheVictoryLine(cell) {
    var res;
    if (!cell.innerHTML) {
        return false;
    }
    var rowNum = cell.dataset.row;
    var colNum = cell.dataset.col;
    var cols = gameField.querySelectorAll('td[data-col="' + colNum + '"]');
    var rows = gameField.querySelectorAll('td[data-row="' + rowNum + '"]');

    res = true;
    for (var i = 0; i < 3; i++) {
        if (cell.innerHTML !== cols[i].innerHTML) {
            res = false;
            break;
        }
    }
    if (res) return true;

    res = true;
    for (var i = 0; i < 3; i++) {
        if (cell.innerHTML !== rows[i].innerHTML) {
            res = false;
            break;
        }
    }
    if (res) return true;

    res = true;
    for (var i = 0; i < 3; i++) {
        var td = gameField.querySelector('td[data-row="' + i + '"][data-col="' + i + '"]');
        if (cell.innerHTML !== td.innerHTML) {
            res = false;
            break;
        }
    }
    if (res) return true;

    for (var i = 0, j = 2; i < 3 && j >= 0; i++, j--) {
        var td = gameField.querySelector('td[data-row="' + i + '"][data-col="' + j + '"]');
        if (cell.innerHTML !== td.innerHTML) {
            return false;
        }
    }
    return true;
}

function _(id) {
    return document.getElementById(id);
}
