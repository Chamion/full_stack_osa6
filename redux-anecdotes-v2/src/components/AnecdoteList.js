import React from 'react'
import { voteCreation } from '../reducers/anecdoteReducer'
import { showCreation, hideCreation, getId } from '../reducers/notificationReducer'
import FilterForm from './FilterForm'
import { connect } from 'react-redux'

class AnecdoteList extends React.Component {
    
    handleVote = (id, content) => () => {
        this.props.voteCreation(id)
        this.showNotification(content)
    }
    
    showNotification(content) {
        const notificationContent = 'You voted \'' + content + '\'.'
        const id = getId()
        this.props.showCreation(notificationContent, id)
        setTimeout(() => {
            this.props.hideCreation(id)
        }, 5000)
    }
    
    render() {
        const anecdotes = this.props.anecdotes
        return (
            <div>
                <h2>Anecdotes</h2>
                <FilterForm />
                {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
                    <div key={anecdote.id}>
                        <div>
                            {anecdote.content}
                        </div>
                        <div>
                            has {anecdote.votes}
                            <button onClick={
                                this.handleVote(anecdote.id, anecdote.content)
                            }>
                                vote
                            </button>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        anecdotes: state.anecdotes.filter(a => {
            return a.content.toLowerCase().includes(state.filter)
        })
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        voteCreation: (value) => {
            dispatch(voteCreation(value))
        },
        showCreation: (content, id) => {
            dispatch(showCreation(content, id))
        },
        hideCreation: (value) => {
            dispatch(hideCreation(value))
        }
    }
}

const connectedAnecdoteList = connect(
    mapStateToProps,
    mapDispatchToProps
)(AnecdoteList)

export default connectedAnecdoteList
