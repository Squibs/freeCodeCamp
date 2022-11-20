const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver();

const validPuzzle = '..839.7.575.....964..1.......16.29846.9.312.7..754.....62..5.78.8...3.2...492...1';

suite('Unit Tests', () => {

  test('Logic handles a valid puzzle string of 81 characters', (done) => {
    const validPuzzleSolution = '218396745753284196496157832531672984649831257827549613962415378185763429374928561';
    assert.strictEqual(solver.validate(validPuzzle), undefined);
    assert.deepEqual(solver.solve(validPuzzle), { solution: validPuzzleSolution });
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
    assert.strictEqual(solver.checkRowPlacement(validPuzzle, 'B', '0', '8'), true);
    done();
  });
  
  test('Logic handles an invalid row placement', (done) => {
    assert.strictEqual(solver.checkRowPlacement(validPuzzle, 'B', '0', '5'), false);
    done();
  });
  
  test('Logic handles a valid column placement', (done) => {
    assert.strictEqual(solver.checkColPlacement(validPuzzle, 'B', '0', '8'), true);
    done();
  });
  
  test('Logic handles an invalid column placement', (done) => {
    assert.strictEqual(solver.checkColPlacement(validPuzzle, 'B', '0', '1'), false);
    done();
  });
  
  test('Logic handles a valid region (3x3 grid) placement', (done) => {
    assert.fail();
    done();
  });
  
  test('Logic handles an invalid region (3x3 grid) placement', (done) => {
    assert.fail();
    done();
  });
  
  test('Valid puzzle strings pass the solver', (done) => {
    assert.fail();
    done();
  });
  
  test('Invalid puzzle strings fail the solver', (done) => {
    assert.fail();
    done();
  });
  
  test('Solver returns the expected solution for an incomplete puzzle', (done) => {
    assert.fail();
    done();
  });

});
