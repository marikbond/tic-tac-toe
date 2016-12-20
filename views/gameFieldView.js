
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
    switch (size) {
        case 3:
            td.style.width = '107px';
            td.style.height = '107px';
            break;
        case 9:
            td.style.width = '80px';
            td.style.height = '80px';
            break;
        case 15:
            td.style.width = '50px';
            td.style.height = '50px';
            break;
        case 30:
            td.style.width = '25px';
            td.style.height = '25px';
    }
    _('game-field-container').innerHTML = '';
    _('game-field-container').appendChild(gameField);
    gameField.onclick = onClickHandler;
    return gameField;
}

function getCell(rowIndex, colIndex) {
    return gameField.querySelector('td[data-row="' + rowIndex + '"][data-col="' + colIndex + '"]');
}