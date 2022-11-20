'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  // input { puzzle: '81char string puzzle', coordinate: 'F7', value: 8 }
  // expected output { valid: false, conflict: ['row', 'column, 'region'] } || { valid: true }
  // same value is already placed on same coordinate { valid: true }
  // coordinate value is being replaced { valid: true } if valid
  app.route('/api/check')
    .post((req, res) => {
      // check all fields are required
      if (!req.body.puzzle || !req.body.coordinate || !req.body.value)
        return res.json({ error: 'Required field(s) missing' });

      // check if puzzle string length is exactly 81 characters & has no invalid characters
      const validatePuzzle = solver.validate(req.body.puzzle);
      if (validatePuzzle) return res.json(validatePuzzle);

      // check if coordinate is valid
      if (!/^[a-i][1-9]$/i.test(req.body.coordinate))
        return res.json({ error: 'Invalid coordinate' });

      // check if value is valid
      if (!/^[1-9]$/.test(req.body.value))
        return res.json({ error: 'Invalid value' });

      // split coordinates
      const coords = [req.body.coordinate.slice(0, 1), req.body.coordinate.slice(1)];

      console.log(coords);

      // check for conflicts
      let conflicts = [];
      if (!solver.checkRowPlacement(req.body.puzzle, coords[0], coords[1], req.body.value))
        conflicts.push('row');
      if (!solver.checkColPlacement(req.body.puzzle, coords[0], coords[1], req.body.value))
        conflicts.push('column');
      if (!solver.checkRegionPlacement(req.body.puzzle, coords[0], coords[1], req.body.value))
        conflicts.push('region');
      if (conflicts.length > 0)
        return res.json({ valid: false, conflict: conflicts });

      return res.json({ valid: true });
    });

  
  // input { puzzle: '81 char string puzzle' }
  // expected output { solution: '81char string of solved puzzle' }
  app.route('/api/solve')
    .post((req, res) => {
      // check for required field
      if (!req.body.puzzle)
        return res.json({ error: 'Required field missing' });

      // check if puzzle string length is exactly 81 characters & has no invalid characters
      const validatePuzzle = solver.validate(req.body.puzzle);
      if (validatePuzzle) return res.json(validatePuzzle);

      // try to solve puzzle and return if solved or not solvable
      return res.json(solver.solve(req.body.puzzle));
    });
  
};
