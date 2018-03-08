import React from 'react'
import { filterCreation } from '../reducers/filterReducer'
import { connect } from 'react-redux'

class FilterForm extends React.Component {
    handleChange = (e) => {
        e.preventDefault()
        const filter = e.target.value
        this.props.filterCreation(filter)
    }
    
    render() {
        const style = {
            marginBottom: 10
        }
        return (
            <div style={style}>
                <span>filter </span>
                <input type='text' name='filter' onChange={this.handleChange} />
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        filterCreation: (value) => {
            dispatch(filterCreation(value))
        }
    }
}

const connectedFilterForm = connect(
    null,
    mapDispatchToProps
)(FilterForm)

export default connectedFilterForm