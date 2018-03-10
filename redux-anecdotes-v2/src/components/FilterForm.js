import React from 'react'
import { filter } from '../reducers/filterReducer'
import { connect } from 'react-redux'

class FilterForm extends React.Component {
    handleChange = (e) => {
        e.preventDefault()
        const filter = e.target.value
        this.props.filter(filter)
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

const connectedFilterForm = connect(
    null,
    {
        filter
    }
)(FilterForm)

export default connectedFilterForm