
function createGameField(size, onClickHandler) {
    var fieldConfig = config.gameField;
    var gameField = document.createElement('table');
    gameField.id = "game-field";
    gameField.onclick = onClickHandler;
    gameField.style.width = fieldConfig[size].fieldWidth;
    gameField.style.fontSize = fieldConfig[size].fontSize + 'px';
    _('game-field-container').innerHTML = '';
    _('game-field-container').appendChild(gameField);
    var fieldWidth = parseInt(getComputedStyle(gameField).width);
    var cellSize = fieldWidth / size;
    for (var i = 0; i < size; i++) {
        var tableRow = document.createElement('tr');
        for (var j = 0; j < size; j++) {
            var td = document.createElement('td');
            td.dataset.row = i;
            td.dataset.col = j;
            td.style.width = cellSize + 'px';
            td.style.height = cellSize + 'px';
            tableRow.appendChild(td);
        }
        gameField.appendChild(tableRow);
    }
    return gameField;
}

function getCell(rowIndex, colIndex) {
    return gameField.querySelector('td[data-row="' + rowIndex + '"][data-col="' + colIndex + '"]');
}