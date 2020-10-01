import React, { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BoardContext from './BoardContext'
import Board from './Board'
import { useParams } from 'react-router-dom';

const CardsFromDB = [
    {id: 1, title:"hey bu",description: "hello"},
    {id: 2, title:"hey bu",description: "yall"}
  ]
  


const BoardPage=()=>{
    const params = useParams()
    const boardId = Number(params.boardid)
    const [lists,setLists] = useState([])
    const [cards,setCards] = useState([])
    const [board,setBoard] = useState({})
    const [loading,setLoading] = useState(true)

    let userBoard = useSelector(state => state.entities.boards.userBoards[boardId])
    let userCards = useSelector(state => state.entities.cards.userCards)
    let userLists = useSelector(state => state.entities.lists.userLists)
    useEffect(()=>{
      if (userBoard && userCards && userLists) {
        setLists(Object.values(userLists))
        setBoard(userBoard)
        setCards(Object.values(userCards))
        setLoading(false)
      }
    }, [userBoard, userCards, userLists])

    const updateLists = (a,b,c)=>{
        console.log(a,b,"removed",c)
    }

    const Lists = {}
    lists.forEach(list=>{
        Lists[list.id] = {title: list.title, cards: list.cards}
        console.log("DBLISTS",Lists)
    })

    // const ListsFromDB = {
    //     1:{
    //       title: "hello",
    //       cards: CardsFromDB
    //     },
    //     2:{
    //       title: "hello",
    //       cards: []
    //     },
    //     3:{
    //       title: "hello",
    //       cards: []
    //     },
    //     4:{
    //       title: "hello",
    //       cards: []
    //     }
    // }
    if (loading) return "loading"

    return(
        <BoardContext.Provider value={{Lists, updateLists}}>
            <Board/>
        </BoardContext.Provider>
    )
}

export default BoardPage