const initialState = {
    content: 'doot',
    display: 'none',
    id: 0
}

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

export const showCreation = (content, id) => {
    return {
        type: 'SHOW',
        id,
        content
    }
}

export const hideCreation = (id) => {
    return {
        type: 'HIDE',
        id
    }
}

export const getId = () => (100000*Math.random()).toFixed(0)

export default reducer