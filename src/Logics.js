function isSafe(grid, row, col, num) {
    return !usedInRow(grid, row, num) && !usedInCol(grid, col, num) && !usedInBox(grid, row - row % 3, col - col % 3, num);
}

function usedInRow(grid, row, num) {
    for (let i = 0; i < 9; i++) {
        if (grid[row][i] === num) {
            return true;
        }
    }
    return false;
}

function usedInCol(grid, col, num) {
    for (let i = 0; i < 9; i++) {
        if (grid[i][col] === num) {
            return true;
        }
    }
    return false;
}

function usedInBox(grid, startRow, startCol, num) {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (grid[i + startRow][j + startCol] === num) {
                return true;
            }
        }
    }
    return false;
}


function isValidSet(set) {
    set = set.filter(x => x);
    return new Set(set).size === set.length;
}

const SUDOKU_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9];


function fillGrid(grid) {
    let row = -1;
    let col = -1;
    let isEmpty = true;
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (grid[i][j] === null) {
                row = i;
                col = j;
                isEmpty = false;
                break;
            }
        }
        if (!isEmpty) {
            break;
        }

    }
    if (isEmpty) {
        return true;
    }
    let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    for (let i = numbers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }
    for (let num of numbers) {
        if (isSafe(grid, row, col, num)) {
            grid[row][col] = num;
            if (fillGrid(grid)) {
                return true;
            }
            else {
                grid[row][col] = null;
            }
        }
    }
    return false;
}



function removeSomeNumbers(grid) {

    let count = Math.floor(Math.random() * 20) + 40;
    while (count !== 0) {
        let cellId = Math.floor(Math.random() * 81);
        let i = Math.floor(cellId / 9);
        let j = cellId % 9;
        if (grid[i][j] !== null) {
            count--;
            grid[i][j] = null;
        }
    }




}

function isValidSudoku(grid) {
    for (let i = 0; i < 9; i++) {
        if (!isValidSet(grid[i])) {
            return false;
        }
    }
    for (let i = 0; i < 9; i++) {
        let column = [];
        for (let j = 0; j < 9; j++) {
            column.push(grid[j][i]);
        }
        if (!isValidSet(column)) {
            return false;
        }
    }
    for (let i = 0; i < 9; i += 3) {
        for (let j = 0; j < 9; j += 3) {
            let subgrid = [];
            for (let k = i; k < i + 3; k++) {
                for (let l = j; l < j + 3; l++) {
                    subgrid.push(grid[k][l]);
                }
            }
            if (!isValidSet(subgrid)) {
                return false;
            }
        }
    }
    return true;
}

function solveSudoku(grid) {
    let row = -1;
    let col = -1;
    let isEmpty = true;
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (grid[i][j] === null) {
                row = i;
                col = j;
                isEmpty = false;
                break;
            }
        }
        if (!isEmpty) {
            break;
        }

    }
    if (isEmpty) {
        return true;
    }
    for (let num = 1; num <= 9; num++) {
        if (isSafe(grid, row, col, num)) {
            grid[row][col] = num;
            if (solveSudoku(grid)) {
                return true;
            }
            else {
                grid[row][col] = null;
            }
        }
    }
    return false;
}


function isSudokuSolved(grid) {
    if (!isValidSudoku(grid)) {
        return false;
    }
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (grid[i][j] === null) {
                return false;
            }
        }
    }
    return true;
}

export { isSafe, usedInRow, usedInCol, usedInBox, isValidSet, SUDOKU_NUMBERS, fillGrid, removeSomeNumbers, isValidSudoku, solveSudoku, isSudokuSolved }