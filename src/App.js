import React, { useEffect } from 'react'
import './App.css';
import GridRow from './GridRow';
import { fillGrid, isSudokuSolved, removeSomeNumbers, solveSudoku } from './Logics';


const INITIAL_STATE = [
  [null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null]
]

export default function App() {

  // 1 2 3 4 5 6 7 8 9
  // 1 2 3 4 5 6 7 8 9
  // 1 2 3 4 5 6 7 8 9
  // 1 2 3 4 5 6 7 8 9
  // 1 2 3 4 5 6 7 8 9
  // 1 2 3 4 5 6 7 8 9
  // 1 2 3 4 5 6 7 8 9
  // 1 2 3 4 5 6 7 8 9
  // 1 2 3 4 5 6 7 8 9



  const [gameGrid, setGrid] = React.useState(INITIAL_STATE)
  const [isSolved, setSolved] = React.useState(false)


  useEffect(() => {
    if (isSudokuSolved(gameGrid)) {
      setSolved(true)
    }
    else {
      setSolved(false)
    }
  }, [gameGrid])







  const changeValue = (value, row, col) => {
    const newGrid = [...gameGrid] //copy banako
    if (/^[1-9]$/.test(value)) {
      newGrid[row][col] = parseInt(value)
    }
    else if (value === '0') {
      return
    }
    else {
      newGrid[row][col] = null
    }
    setGrid(newGrid)
  }


  function iterate(item, row) {// index


    return <GridRow key={row} item={item} row={row} grid={gameGrid} setGrid={changeValue} />


  }








  function generateSudoku() {
    let newgrid = JSON.parse(JSON.stringify(INITIAL_STATE));
    fillGrid(newgrid);
    let solvedSudoku = JSON.parse(JSON.stringify(newgrid));
    removeSomeNumbers(solvedSudoku);
    setGrid(solvedSudoku);
  }

  function solveIt() {
    let newgrid = JSON.parse(JSON.stringify(gameGrid));
    solveSudoku(newgrid);
    setGrid(newgrid);
  }


  const reset = () => {
    setGrid(INITIAL_STATE)
  }



  return (
    <div className='global-box'>
      <div>
        <div className='box' key={gameGrid}>
          {gameGrid.map(iterate)}
        </div>
        <div className='second-box'>
          <b>Sudoku Status: </b>
          {isSolved ? <span style={{ color: 'green' }}>Solved</span> : <span style={{ color: 'red' }}>Not Solved</span>}
          <br />
          <div className='flex' style={{ marginTop: 20 }}>

            <button
              onClick={() => generateSudoku()}
            >Generate</button>
            &nbsp;&nbsp;
            <button
              onClick={() => solveIt()}
            >Solve</button>
            &nbsp;&nbsp;
            <button
              onClick={reset}
            >Reset</button>
            
          </div>
        </div>
      </div>


    </div >

  )
}