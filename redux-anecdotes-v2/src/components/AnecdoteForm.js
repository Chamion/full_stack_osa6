import React from 'react'
import { create } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

class AnecdoteForm extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault()
        const content = e.target.anecdote.value
        e.target.anecdote.value = ''
        this.props.create(content)
        this.props.showNotification(`New anecdote '${content}' created.`, 5)
    }
    
    render() {
        return (
            <div>
                <h2>create new</h2>
                <form onSubmit={this.handleSubmit}>
                    <input name='anecdote'/>
                    <button>create</button>
                </form>
            </div>
        )
    }
}

const connectedAnecdoteForm = connect(
    null,
    {
        create,
        showNotification
    }
)(AnecdoteForm)

export default connectedAnecdoteForm
