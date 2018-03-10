const initialState = {
    content: 'doot',
    display: 'none',
    id: 0
}

const getId = () => (100000*Math.random()).toFixed(0)

const reducer = (store = initialState, action) => {
    if(action.type === 'SHOW') {
        return {
            content: action.content,
            display: 'block',
            id: action.id
        }
    }
    if(action.type === 'HIDE') {
        if(store.id === action.id) {
            return {
                content: store.content,
                display: 'none',
                id: store.id
            }
        }
    }

    return store
}

export const showNotification = (content, time) => (dispatch) => {
    const id = getId()
    dispatch({
        type: 'SHOW',
        id,
        content
    })
    setTimeout(() => {
        dispatch({
            type: 'HIDE',
            id
        })
    }, time*1000)
}

export const show = (content, id) => (dispatch) => {
    dispatch({
        type: 'SHOW',
        id,
        content
    })
}

export const hide = (id) => (dispatch) => {
    dispatch({
        type: 'HIDE',
        id
    })
}

export default reducer