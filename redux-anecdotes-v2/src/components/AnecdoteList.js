import React from 'react'
import { vote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'
import FilterForm from './FilterForm'
import { connect } from 'react-redux'

class AnecdoteList extends React.Component {
    
    handleVote = (anecdote) => async () => {
        this.props.vote(anecdote)
        this.props.showNotification(`you voted '${anecdote.content}'`, 5)
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
                                this.handleVote(anecdote)
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

const connectedAnecdoteList = connect(
    mapStateToProps,
    {
        vote,
        showNotification
    }
)(AnecdoteList)

export default connectedAnecdoteList
