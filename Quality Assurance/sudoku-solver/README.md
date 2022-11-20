# Sudoku Solver

<p align="center"><img src="/Images/screenshots/screenshot-sudoku-solver.png" height="400" alt="Screenshot of my Sudoku Solver project."/></p>

<em>Completed November 20, 2022</em>

### [Sudoku Solver](https://sudoku-solver.sulph.repl.co/) (Click to view functional site)

[Link to files on replit](https://replit.com/@Sulph/sudoku-solver#controllers/sudoku-solver.js)

This project was again not dissimilar to the other projects of this *Quality Assurance* section. The real challenge of this project was coming up with the logic to check if the placement of a value in the puzzle was valid, or solving the entire puzzle itself.

I wanted to see if I could come up with a solution to solving sudoku puzzles on my own and for the most part I did just that. I was able to check individual rows, columns and regions if the placement of a value was valid or not. I found checking a region to be much more involved compared to checking a row or a column, and I feel like my solution for checking a region is over engineered. However, it is working.

I tried for a while to come up with a solution to solving the actual sudoku puzzle on my own, but in the end I didn't quite come up with a solution that was going to work. There are several algorithms people have made in order to solve sudoku puzzles, and the one I ended up following was from [GeeksforGeeks](https://www.geeksforgeeks.org/sudoku-backtracking-7/).

Essentially, through a recursive function, this algorithm starts in the top left corner of the puzzle and works through the row solving each square, before moving onto the next row. If at any point a placed value ends up not being correct, the function will fall back to a previously placed unit and try the next valid unit and try to solve again. This continues until the puzzle is solved, or the puzzle is deemed unsolvable. I replaced the region, row, and column checking in this algorithm with my own checking.

In the end I am satisfied with what I came up with solve sudoku puzzles. I have previously never really done sudoku puzzles, and had to play a few puzzles to remember how they even were solved in the first place.
