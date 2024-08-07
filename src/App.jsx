/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
import {useEffect, useState} from 'react';


export default function App () {
  const initialBoard = [];
  const [winner,setWinner]=useState(false)
  const [turn,setTurn]=useState(0)
  const [board, setBoard] = useState ([]);
  for (let i = 0; i < 3; i++) {
    const row = [];
    for (let j = 0; j < 3; j++) {
      row.push ({j,v:-1});
    }
    initialBoard.push (row);
  }
  if (winner) {
    alert (`${turn?"O":"X"} wins`);
    setWinner(false)
  }

  useEffect (() => {
    setBoard (initialBoard);
  }, []);
  useEffect(()=>{
    console.log('Use effect')
    if(board.length>0){
      console.log ('newBoard is:', board);
      console.log ('turn is:', turn);
      let currChance=turn?0:1
        for(let i=0;i<3;i++){
        if(board[i][0].v==currChance && board[i][1].v== currChance && board[i][2].v==currChance){
              setWinner(true)
              setBoard(initialBoard)
            }
        }
        for(let j=0;j<3;j++){
          if(board[0][j].v==currChance && board[1][j].v==currChance && board[2][j].v==currChance){
            setWinner (true);  
            setBoard(initialBoard) 
            }
        }
        if(board[0][0].v==currChance && board[1][1].v==currChance && board[2][2].v==currChance){
          setWinner (true);
          setBoard(initialBoard)
        }
        if(board[0][2].v == currChance && board[1][1].v == currChance && board[2][0].v == currChance){
          setWinner (true);
          setBoard(initialBoard)
        }
    }
  },[board])
  console.log (board);
  const handleClick=(row,col)=>{
    setBoard((board)=>{
      let newBoard=[...board]
      newBoard[row][col].v=turn
      return newBoard
    })
    setTurn((turn)=>{
      if(turn==0)return 1;
      return 0;
    })
  }
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className=''>
        {board.map ((row, index1) => {
          return (
            <div className='flex'>
              {row.map ((col,index2) => {
                return <div className='border border-black p-4 w-20 h-20 md:w-40 md:h-40 flex items-center justify-center bg-slate-400'
                onClick={()=>{if(board[index1][index2].v==-1)handleClick(index1,index2)}}
                >
                { 
                 board[index1][index2].v==0?(<div className='w-8 h-8 md:w-16 md:h-16 rounded-full bg-slate-400 border-2 md:border-4 border-black'></div>):board[index1][index2].v==1?(<div className='text-3xl md:text-8xl'>X</div>):null
                }
                </div>
              })}
            </div>
          )
        })}
      </div>
    </div>
  );
}
