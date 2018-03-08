import React from 'react'
import { createCreation } from '../reducers/anecdoteReducer'
import { showCreation, hideCreation, getId } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

class AnecdoteForm extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault()
        const content = e.target.anecdote.value
        this.props.createCreation(content)
        this.showNotification(content)
        e.target.anecdote.value = ''
    }
    
    showNotification(content) {
        const notificationContent = 'New anecdote \'' + content + '\' created.'
        const id = getId()
        this.props.showCreation(notificationContent, id)
        setTimeout(() => {
            this.props.hideCreation(id)
        }, 5000)
    }
    
    render() {
        return (
            <div>
                <h2>create new</h2>
                <form onSubmit={this.handleSubmit}>
                    <div><input name='anecdote'/></div>
                    <button>create</button>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createCreation: (value) => {
            dispatch(createCreation(value))
        },
        showCreation: (content, id) => {
            dispatch(showCreation(content, id))
        },
        hideCreation: (value) => {
            dispatch(hideCreation(value))
        }
    }
}

const connectedAnecdoteForm = connect(
    null,
    mapDispatchToProps
)(AnecdoteForm)

export default connectedAnecdoteForm
