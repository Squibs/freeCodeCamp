class SudokuSolver {

  validate(puzzleString) {
    if (puzzleString.length > 81 || puzzleString.length < 81)
        return { error: 'Expected puzzle to be 81 characters long' };
    
    let invalidCharacters = false;
      [...puzzleString].forEach((square) => {
        if (!/[1-9\.]/i.test(square)) invalidCharacters = true;
      });
      if (invalidCharacters) return { error: 'Invalid characters in puzzle' };
  }

  // puzzleString-> 81char string, row-> A-I, col-> 1-9, value-> 1-9 actual placed number
  checkRowPlacement(puzzleString, row, column, value) {
    const puzzle = puzzleString.match(/.{1,9}/g).map((pRow) => pRow.split(''));
    const existingRowNumbers = puzzle[row.toLowerCase().charCodeAt(0) - 97];
    if (existingRowNumbers[Number(column) - 1] === value)
      return true;
    return (!existingRowNumbers.some((number) => number === value));
  }

  checkColPlacement(puzzleString, row, column, value) {
    let existingColumnNumbers = [];
    for (let i = Number(column) - 1; i <= 80; i += 9) {
      existingColumnNumbers.push(puzzleString[i]);
    }
    if (existingColumnNumbers[(row.toLowerCase().charCodeAt(0) - 97)] === value)
      return true;
    return (!existingColumnNumbers.some((val) => val === value));
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    // split string into groups of 3
    const puzzle = puzzleString.match(/.{1,3}/g).map((pRow) => pRow.split(''));

    // store each region as own array
    let puzzleAsRegions = [[],[],[],[],[],[],[],[],[]];
    let k = 0;
    
    for (let i = 0; i <= 26; i += 9) {  
      for (let j = i; j <= 8 + i; j += 3) {
        puzzleAsRegions[k].push(puzzle[j]);
        puzzleAsRegions[k + 1].push(puzzle[j + 1]);
        puzzleAsRegions[k + 2].push(puzzle[j + 2]);
      }

      k += 3;
    }

    puzzleAsRegions = puzzleAsRegions.map((region) => region.flat());

    // find correct region based on given coordinate (row, column)
    const findRegion = {
      '[a-c][1-3]': 0, '[a-c][4-6]': 1, '[a-c][7-9]': 2,
      '[d-f][1-3]': 3, '[d-f][4-6]': 4, '[d-f][7-9]': 5,
      '[g-i][1-3]': 6, '[g-i][4-6]': 7, '[g-i][7-9]': 8,
    };

    let regionIndex = -1;

    for (const [key, region] of Object.entries(findRegion)) {
      const myKeyAsRegex = new RegExp(key, 'i');
      if (myKeyAsRegex.test(`${row}${column}`))
        regionIndex = region;
    }

    // check if value at coordinate is the exact same as what is being checked
    const findLocalRegion = { '[adg147]': 0, '[beh258]': 1, '[cfi369]': 2 };
    let localRegionCoords = [-1, -1];

    for (const [key, region] of Object.entries(findLocalRegion)) {
      const myKeyAsRegex = new RegExp(key, 'i');
      if (myKeyAsRegex.test(`${row}`))
        localRegionCoords[0] = region;
      if (myKeyAsRegex.test(`${column}`))
        localRegionCoords[1] = region;
    }
    /* taking the specific region and splitting it three arrays so local region coords work */
    if (puzzleAsRegions[regionIndex].flat().join('').match(/.{1,3}/g)
        .map((pRow) => pRow.split(''))[localRegionCoords[0]][localRegionCoords[1]] === value)
      return true;

    // check if number exists in region already
    return (!puzzleAsRegions[regionIndex].some((val) => val === value));
  }

  solve(puzzleString) {
    // size of 2D matrix N*N
    const N = 9;
    let count = 0;

    // recursive function that solves sudoku puzzle
    // starts on one row going through each column before moving onto the next row
    const solveSudoku = (grid, row, col) => {
      count += 1;
      // if end of rows and columns
      if (row === N - 1 && col === N)
        return true;

      // reached end of columns
      if (col === N) {
        row += 1;
        col = 0;
      }

      // if current coordinate is already solved move to next
      if (grid[row][col] != '.')
        return solveSudoku(grid, row, col + 1);

      // check if each number is safe
      for(let num = 1; num < 10; num += 1) {
        // if current number is safe
        if (
          this.checkRowPlacement(grid.flat().join(''), String.fromCharCode(row + 97), `${col + 1}`, `${num}`) &&
          this.checkColPlacement(grid.flat().join(''), String.fromCharCode(row + 97), `${col + 1}`, `${num}`) &&
          this.checkRegionPlacement(grid.flat().join(''), String.fromCharCode(row + 97), `${col + 1}`, `${num}`)
        ) {
          grid[row][col] = `${num}`; // assign safe number

          // check rest of solution with this number
          if (solveSudoku(grid, row, col + 1))
            return true;
        }

        // set number back to 0 if it wasn't the solution
        grid[row][col] = '.';
      }
      
      // not solvable
      return false;
    };

    let grid = puzzleString.match(/.{1,9}/g).map((pRow) => pRow.split(''));

    if (solveSudoku(grid, 0, 0)) {
      console.log(`recursion count: ${count}`);
      return { solution: grid.flat().join('') };
    }
    else {
      return { error: 'Puzzle cannot be solved' };
    }
  }
  
}

module.exports = SudokuSolver;

