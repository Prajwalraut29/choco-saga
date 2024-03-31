
import { useEffect } from 'react';
import './App.css';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { createBoard } from './utils/createBoard';
import { moveBelow, updateBoard } from './store';
import Board from './components/Board';
import { isColumnOfFour } from './utils/moveCheckLogic';
import { formulaForColumnOfFour } from './utils/formulas';

function App() {
  const dispatch = useAppDispatch()
  const board = useAppSelector(({ candyCrush: { board } }) => board)
  const boardSize = useAppSelector(({ candyCrush: { boardSize } }) => boardSize)


  useEffect(() => {
    dispatch(updateBoard(createBoard(boardSize)))

  }, [boardSize, dispatch])
  useEffect(() => {
    const timeout = setTimeout(() => {
      const newBoard = [...board];
      isColumnOfFour(newBoard, boardSize, formulaForColumnOfFour(boardSize))
      dispatch(updateBoard(newBoard))
      dispatch(moveBelow())
    }, 150);
    return () => clearInterval(timeout)
  }, [board, boardSize, dispatch])
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <p className='text-3xl font-bold font-serif bg-orange-300 rounded-full my-3'>Chocklate Saga</p>
      <Board />
    </div>
  );
}

export default App;
