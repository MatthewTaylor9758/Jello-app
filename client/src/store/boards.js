import Cookies from 'js-cookie'
import {setUserLists} from './lists'
import {setUserCards} from './cards'

const SET_USER_BOARDS = '/entities/boards/SET_USER_BOARDS'
const CREATE_BOARD = '/entities/boards/CREATE_BOARD'
// const DELETE_USER_BOARD = 'entities/boards/DELETE_BOARD'

export const addBoard = (board) => {
    return {
        type: CREATE_BOARD,
        board
    }
}

export const setUserBoards = (boards) => {
    return {
        type: SET_USER_BOARDS,
        boards
    }
}


export const createBoard = (board) => async dispatch => {
    const csrfToken = Cookies.get("XSRF-TOKEN")
    const res = await fetch(`/api/boards`,{
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": csrfToken,
        },
        body: JSON.stringify(board)
    })
    res.data = await res.json()
    dispatch(addBoard(res.data))
    return res
}


export const loadUserBoards = (userId) => async dispatch => {
    const response = await fetch(`/api/boards/${userId}`);
    const boards = await response.json();
    if (response.ok) {
        dispatch(setUserBoards(boards.boards))
        dispatch(setUserLists(boards.lists))
        dispatch(setUserCards(boards.cards))
    }
}

export default function boards(state={},action){
    const newState = Object.assign({},state)
    const userBoards = Object.assign({},state.usersBoards)
    switch (action.type){
        case SET_USER_BOARDS:
            newState.userBoards = userBoards
            Object.values(action.boards).forEach(board=>{
                newState.userBoards[board.id] = board
            })
            return newState;
        case CREATE_BOARD:
            newState.userBoards = userBoards;
            newState.userBoards[action.board.id] = action.board
            return newState
        // case DELETE_USER_BOARD:
        //     newState.userBoards = userBoards
        //     delete newState.userBoards[action.boardId]
        //     return newState
        default:
            return state;
    }
}
