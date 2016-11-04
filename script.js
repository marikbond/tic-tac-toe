
var x = 'X';
var o = 'O';
var nextSymbol = x;

var gameField = createGameField();
gameField.onclick = turnHandler(event);
function createGameField(field) {
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
    var gameFieldContainer = document.getElementById('game-field-container');
    gameFieldContainer.appendChild(gameField);
}
function turnHandler(event) {
    var target = event.target;
    while (target != gameField) {
         if (target.tagName == 'TD') {
             chooseTheSymbol();
             break;
         }
         target = target.parentNode;
    }
    return false;
}

function chooseTheSymbol() {
    console.log('row: ' + target.dataset.row + ' col: ' + target.dataset.col);
    if (!target.innerHTML) {
        target.innerHTML = nextSymbol;
        nextSymbol = target.innerHTML == x ? o : x;
        var victory = checkTheWin(target.innerHTML.parentNode);
        if (victory) {
            handleWinner(target.innerHTML);
        }
    }
}

// TODO 2 на основании dataset написать алгоритм перебора ячеек для поиска победит
function handleWinner(symbol) {
    var spanId = symbol == x ? 'x-score' : 'o-score';
    var span = document.getElementById(spanId);
    span.innerHTML = +span.innerHTML + 1;
    gameField.onclick = function () {
        return false;
    };
    gameField.className = 'disabled-field';
    alert('Win: ' + symbol);
    nextSymbol = symbol;
}

var resetButton = document.getElementById('reset-button');
resetButton.onclick = function () {
    gameField.onclick = turnHandler;
    var tdList = gameField.getElementsByTagName('td');
    for (var i = 0; i < tdList.length; i++) {
        tdList[i].innerHTML = '';
    }
    gameField.className = '';
};

function checkTheWin() {
    var rowNum = target.dataset.row;
}




