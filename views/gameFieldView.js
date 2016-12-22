
function getCellSize(size) {
    switch (size) {
        case 3: return 107;
        case 9: return 64;
        case 15: return 32;
        case 30: return 15;
    }
}

function changeSizesOfAllComponents(size, td) {
    switch (size){
        case 3:
            break;
        case 9:
            td.style.fontSize = '46px';
            td.style.borderWidth = "5px";
            break;
        case 15:
            td.style.fontSize = '25px';
            td.style.borderWidth = "4px";
            break;
        case 30:
            td.style.fontSize = '12px';
            td.style.borderWidth = "1.5px";
    }
    return true;
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
            changeSizesOfAllComponents(size, td);
        }
        gameField.appendChild(tableRow);
    }


    _('game-field-container').innerHTML = '';
    _('game-field-container').appendChild(gameField);
    changeSizesOfAllComponents(gameField);
    gameField.onclick = onClickHandler;
    return gameField;
}

function getCell(rowIndex, colIndex) {
    return gameField.querySelector('td[data-row="' + rowIndex + '"][data-col="' + colIndex + '"]');
}