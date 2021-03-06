import Cookies from 'js-cookie'
import {setUserLists} from './lists'
import {setUserCards} from './cards'

const SET_USER_BOARDS = '/entities/boards/SET_USER_BOARDS'
const CREATE_BOARD = '/entities/boards/CREATE_BOARD'
const UPDATE_BOARD = '/entities/boards/UPDATE_BOARD'
const UPDATE_LIST = '/entities/boards/UPDATE_LIST'
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

export const updateBoard=(board)=>{
    return{
        type: UPDATE_BOARD,
        board
    }
}

export const createBoard = (title, userId, color) => async dispatch => {
    if (!title || !userId) return;
    const test = JSON.stringify({title, userId, color})
    const csrfToken = Cookies.get("XSRF-TOKEN")
    const res = await fetch(`/api/boards/create`,{
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": csrfToken,
        },
        body: test
    })
    debugger
    res.data = await res.json()
    if (res.data['board']) {
        dispatch(addBoard(res.data['board']))
        return res
    }
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

export default function boards(state={userBoards:{}},action){
    const newState = Object.assign({},state)
    const userBoards = Object.assign({},state.userBoards)
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
        case UPDATE_BOARD:
            newState.userBoards = userBoards;
            const boardToUpdate = Object.assign({},state.userBoards[action.board.id])
            boardToUpdate.lists = action.board.lists
            newState.userBoards[action.board.id] = boardToUpdate
            return newState
        case UPDATE_LIST:
            newState.userBoards = userBoards;
            const boardUpdate = Object.assign({},state.userBoards[action.boardId])
            const listToUpdate = Object.assign({},state.userBoards[action.boardId].lists[action.listId])
            const cardListToUpdate = Object.assign({},state.userBoards[action.boardId].lists[action.listId].cards)
            newState.userBoards[action.boardId] = boardUpdate
            boardUpdate.lists[action.listId] = listToUpdate
            listToUpdate.cards = cardListToUpdate
            newState.userBoards[action.boardId].lists[action.listId].cards = action.cards
            return newState
        // case DELETE_USER_BOARD:
        //     newState.userBoards = userBoards
        //     delete newState.userBoards[action.boardId]
        //     return newState
        default:
            return state;
    }
}
