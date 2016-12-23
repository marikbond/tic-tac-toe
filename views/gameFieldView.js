
function createGameField(size, onClickHandler) {
    var gameField = document.createElement('table');
    gameField.id = "game-field";
    for (var i = 0; i < size; i++) {
        var tableRow = document.createElement('tr');
        for (var j = 0; j < size; j++) {
            var td = document.createElement('td');
            var fieldConfig = config.gameField;
            td.dataset.row = i;
            td.dataset.col = j;
            var cellSize = fieldConfig[size].cellSize + 'px';
            td.style.width = cellSize;
            td.style.height = cellSize;
            td.style.borderWidth = fieldConfig[size].borderWidth + 'px';
            td.style.fontSize = fieldConfig[size].fontSize + 'px';
            tableRow.appendChild(td);
        }
        gameField.appendChild(tableRow);
    }


    _('game-field-container').innerHTML = '';
    _('game-field-container').appendChild(gameField);
    gameField.onclick = onClickHandler;
    return gameField;
}

function getCell(rowIndex, colIndex) {
    return gameField.querySelector('td[data-row="' + rowIndex + '"][data-col="' + colIndex + '"]');
}