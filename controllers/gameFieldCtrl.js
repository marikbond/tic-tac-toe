
function onClickHandler(event) {
    if (gameField.classList.contains('disabled-field')) return false;
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
    var gameSizeSelect = document.getElementById('game-size');
    var gameSize = +gameSizeSelect.options[gameSizeSelect.selectedIndex].value;
    gameField = createGameField(gameSize, onClickHandler);
};

function turnHandler(cell) {
    if (!cell.innerHTML) {
        cell.innerHTML = nextSymbol;
        nextSymbol = cell.innerHTML == x ? o : x;
        isCellInTheVictoryLine(cell, onWin);
    }
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
    winnerSymbol = symbol;
    gameField.className = 'disabled-field';
}

_('reset-button').onclick = function () {
    var tdList = gameField.getElementsByTagName('td');
    for (var i = 0; i < tdList.length; i++) {
        var td = tdList[i];
        td.innerHTML = '';
        td.style.backgroundColor = '';
    }
    gameField.className = '';
    nextSymbol = winnerSymbol;
};