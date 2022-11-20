const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver();

const validPuzzle = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';

suite('Unit Tests', () => {

  test('Logic handles a valid puzzle string of 81 characters', (done) => {
    const validPuzzleSolution = '769235418851496372432178956174569283395842761628713549283657194516924837947381625';
    assert.strictEqual(solver.validate(validPuzzle), undefined);
    done();
  });
  
  test('Logic handles a puzzle string with invalid characters (not 1-9 or .)', (done) => {
    const invalidPuzzle = '..839.7.575.....16...964..1notavalidstringatall..62..5.78.8...3.2....16...492...1';
    assert.deepEqual(solver.validate(invalidPuzzle), { error: 'Invalid characters in puzzle' });
    done();
  });
  
  test('Logic handles a puzzle string that is not 81 characters in length', (done) => {
    const incorrectLengthPuzzle = '....964..1.......16.29846.9.312.7..754.....62..5.78.';
    assert.deepEqual(solver.validate(incorrectLengthPuzzle), { error: 'Expected puzzle to be 81 characters long' });
    done();
  });
  
  test('Logic handles a valid row placement', (done) => {
    assert.strictEqual(solver.checkRowPlacement(validPuzzle, 'B', '1', '8'), true);
    done();
  });
  
  test('Logic handles an invalid row placement', (done) => {
    assert.strictEqual(solver.checkRowPlacement(validPuzzle, 'B', '1', '5'), false);
    done();
  });
  
  test('Logic handles a valid column placement', (done) => {
    assert.strictEqual(solver.checkColPlacement(validPuzzle, 'B', '1', '8'), true);
    done();
  });
  
  test('Logic handles an invalid column placement', (done) => {
    assert.strictEqual(solver.checkColPlacement(validPuzzle, 'B', '1', '1'), false);
    done();
  });
  
  test('Logic handles a valid region (3x3 grid) placement', (done) => {
    assert.strictEqual(solver.checkRegionPlacement(validPuzzle, 'C', '2', '3'), true);
    done();
  });
  
  test('Logic handles an invalid region (3x3 grid) placement', (done) => {
    assert.strictEqual(solver.checkRegionPlacement(validPuzzle, 'C', '2', '2'), false);
    done();
  });
  
  test('Valid puzzle strings pass the solver', (done) => {
    const validPuzzle2 = '82..4..6...16..89...98315.749.157.............53..4...96.415..81..7632..3...28.51';
    const validPuzzle2Solution = '827549163531672894649831527496157382218396475753284916962415738185763249374928651';
    const validPuzzle3 = '.7.89.....5....3.4.2..4..1.5689..472...6.....1.7.5.63873.1.2.8.6..47.1..2.9.387.6';
    const validPuzzle3Solution = '473891265851726394926345817568913472342687951197254638734162589685479123219538746';
    assert.deepEqual(solver.solve(validPuzzle2), { solution: validPuzzle2Solution });
    assert.deepEqual(solver.solve(validPuzzle3), { solution: validPuzzle3Solution });
    done();
  });
  
  test('Invalid puzzle strings fail the solver', (done) => {
    const invalidPuzzle = '999..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
    assert.deepEqual(solver.solve(invalidPuzzle), { error: "Puzzle cannot be solved" });
    done();
  });
  
  test('Solver returns the expected solution for an incomplete puzzle', (done) => {
    const validPuzzleSolution = '769235418851496372432178956174569283395842761628713549283657194516924837947381625';
    assert.deepEqual(solver.solve(validPuzzle), { solution: validPuzzleSolution });
    done();
  });

});
