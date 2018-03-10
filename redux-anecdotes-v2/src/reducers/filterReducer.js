const initialState = ''

const reducer = (store = initialState, action) => {
    if(action.type === 'FILTER') {
        return action.filter.toLowerCase()
    }

    return store
}

export const filter = (filter) => (dispatch) => {
    dispatch({
        type: 'FILTER',
        filter
    })
}

export default reducer