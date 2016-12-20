
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

function getMinLineLengthForWin(rowCells) {
    switch (rowCells.length) {
        case 3:
            return 3;
        case 9:
            return 5;
        case 15:
            return 7;
        case 30:
            return 9;
    }
}

function checkHorizontalLine(params) {
    return checkLine(params.colNum, params.rowCells, params.targetCell);
}

function checkVerticalLine(params) {
    return checkLine(params.rowNum, params.colCells, params.targetCell);
}

function checkRightDiagonalLine(params) {
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
    var minLineLengthForWin = getMinLineLengthForWin(rowCells);

    var params = {
        rowNum: +rowNum,
        colNum: +colNum,
        rowCells: rowCells,
        colCells: colCells,
        targetCell: cell
    };

    var taskList = [
        checkHorizontalLine,
        checkVerticalLine,
        checkRightDiagonalLine,
        checkLeftDiagonalLine
    ];

    for (var i = 0; i < taskList.length; i++) {
        var result = taskList[i](params);
        if (result.length >= minLineLengthForWin) {
            onWin(cell, result);
            return;
        }
    }
}