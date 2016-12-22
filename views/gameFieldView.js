
function getCellSize(size) {
    switch (size) {
        case 3:
            return 107;
        case 9:
            return 70;
        case 15:
            return 32;
        case 30:
            return 15;
    }
}

function createGameField(size, onClickHandler) {
    var gameField = document.createElement('table');
    gameField.id = "game-field";
    var cellSize = getCellSize(size);
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


    _('game-field-container').innerHTML = '';
    _('game-field-container').appendChild(gameField);
    gameField.onclick = onClickHandler;
    return gameField;
}

function getCell(rowIndex, colIndex) {
    return gameField.querySelector('td[data-row="' + rowIndex + '"][data-col="' + colIndex + '"]');
}