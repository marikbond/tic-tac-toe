
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
    var durations = [1, -1];
    var result = 1;
    for (var i = 0; i < durations.length; i++) {
        var increment = durations[i];
        var index = startIndex + increment;
        while (cells[index] && cells[index].innerHTML == cells.innerHTML) {
            result++;
            index += increment;
        }
    }
    return result;
}

function checkHorizontal(targetCell) {
    console.log(targetCell);
    return checkLine(targetCell);
}
//
// function checkVertical(????) {
//     return checkLine(???);
// }
//
// function checkRightDiagonal(???) {
//     return checkDiagonal(???);
// }

function isCellInTheVictoryLine(cell) {
    // для того чтобы не передавать эти переменные как рагументы
    // их можно передать в одно мобъекте как значения свойств.
    // {
    //   row: значение
    //   .....
    // }
    var rowNum = cell.dataset.row;
    var colNum = cell.dataset.col;
    var colCells = gameField.querySelectorAll('td[data-col="' + colNum + '"]');
    var rowCells = gameField.querySelectorAll('td[data-row="' + rowNum + '"]');
    var balbal = 5;

    var targetCell = {
        col: colNum,
        row: rowNum
    };
    console.log(targetCell);

    var result = checkHorizontal(targetCell);
    if (result.lenght >= balbal) {

    }
    // checkVertical();
    // checkRightDiagonal();
    // checkLeftDiagonal();


    var horizontal = checkLine(colNum, rows);
    if (horizontal >= 5) return true;
    var vertical = checkLine(rowNum, cols);
    if (vertical) return true;





    for (var i = rowNum; i < rowNum + 5; i++) {
        if (!cols[i] || cell.innerHTML !== cols[i].innerHTML) break;
        verDownWay++;
    }
    if (verDownWay === 5) return true;

    for (var i = rowNum; i > rowNum - 5; i--) {
        if (!cols[i] || cell.innerHTML !== cols[i].innerHTML) break;
        verUpWay++;
    }
    if (verUpWay === 5) return true;
    if (verDownWay + verUpWay - 1 == 5) return true;


// TODO решить проблему, когда появляется комбинация из 6. НАЧАЛО ВТОРАЯ ЧАСТЬ - проверка по горизонтали
// TODO исправить цифру 5, на переменную, которая будет задавать число в зависимости от размера поля


    for (var i = colNum; i < colNum + 5; i++) {
        if (!rows[i] || cell.innerHTML !== rows[i].innerHTML) break;
        horRightWay++;
    }

    if (horRightWay === 5) return true;

    for (var i = colNum; i > colNum - 5; i--) {
        if (rows[i] === undefined) break;
        if (cell.innerHTML !== rows[i].innerHTML) {
            break;
        }
        horLeftWay++;
    }
    if (horLeftWay === 5) return true;
    if (horRightWay + horLeftWay - 1 == 5) return true;

    // ПО ДИАГОНАЛИ
    for (var i = colNum, j = rowNum; i < colNum + 5 && j < rowNum + 5; i++, j++) {
        var td = getCell(i, j);
        if (!td || cell.innerHTML !== td.innerHTML) break;
        leftGiagDown++;
    }
    if (leftGiagDown === 5) return true;

    for (index = colNum, j = rowNum; index > colNum - 5 && j > rowNum - 5; index--, j--) {
        td = gameField.querySelector('td[data-row="' + j + '"][data-col="' + index + '"]');
        if (!td || cell.innerHTML !== td.innerHTML) break;
        leftDiagUp++;
    }
    if (leftDiagUp === 5) return true;
    if (leftDiagUp + leftGiagDown - 1 == 5) return true;


    // ПО ДИАГОНАЛИ НА ОБОРОТ

    for (var i = colNum, j = rowNum; i > colNum - 5 && j < rowNum + 5; i--, j++) {
        td = gameField.querySelector('td[data-row="' + j + '"][data-col="' + i + '"]');
        if (td == undefined || null) break;
        if (cell.innerHTML !== td.innerHTML) {
            break;
        }
        rightDiagDown++;
    }
    if (rightDiagDown === 5) return true;

    for (index = colNum, j = rowNum; index < colNum + 5 && j > rowNum - 5; index++, j--) {
        td = gameField.querySelector('td[data-row="' + j + '"][data-col="' + index + '"]');
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
