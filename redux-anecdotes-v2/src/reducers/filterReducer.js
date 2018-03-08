const initialState = ''

const reducer = (store = initialState, action) => {
    if(action.type === 'FILTER') {
        return action.filter.toLowerCase()
    }

    return store
}

export const filterCreation = (filter) => {
    return {
        type: 'FILTER',
        filter
    }
}

export default reducer