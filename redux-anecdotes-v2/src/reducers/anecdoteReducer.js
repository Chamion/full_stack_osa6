import anecdoteService from '../services/anecdotes'

const getId = () => (100000*Math.random()).toFixed(0)

const reducer = (store = [], action) => {
    if (action.type==='VOTE') {
        const old = store.filter(a => a.id !==action.id)
        const voted = store.find(a => a.id === action.id)
        return [...old, { ...voted, votes: voted.votes+1} ]
    }
    if (action.type === 'CREATE') {
        return [...store, action.newAnecdote]
    }
    if (action.type === 'INIT_ANECDOTES') {
        return action.anecdotes
    }

    return store
}

export const vote = (anecdote) => async (dispatch) => {
    await anecdoteService.update(anecdote.id, { ...anecdote, votes: anecdote.votes+1})
    dispatch({
        type: 'VOTE',
        id: anecdote.id
    })
}

export const create = (content) => async (dispatch) => {
    const newAnecdote = {
        content,
        id: getId(),
        votes:0
    }
    await anecdoteService.addNew(newAnecdote)
    dispatch({
        type: 'CREATE',
        newAnecdote
    })
}

export const initAnecdotes = () => async (dispatch) => {
    const res = await anecdoteService.getAll()
    const anecdotes = res.data
    dispatch({
        type: 'INIT_ANECDOTES',
        anecdotes
    })
}

export default reducer