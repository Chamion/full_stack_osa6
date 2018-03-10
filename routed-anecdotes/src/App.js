import React from 'react'
import { Redirect, BrowserRouter as Router, Route, Link } from 'react-router-dom'
import 'bootstrap3/dist/css/bootstrap.css'
import 'bootstrap3/dist/css/bootstrap-theme.css'
import {Navbar, Panel, ListGroup, ListGroupItem, Form, FormGroup, FormControl, ControlLabel, Col} from 'react-bootstrap'

const Menu = () => {
    const headerStyle = {
        margin: '0',
    }
    return (
        <Navbar>
            <div className='container-fluid'>
                <Navbar.Header>
                    <Navbar.Brand>
                        <h1 style={headerStyle}>Software anecdotes</h1>
                    </Navbar.Brand>
                </Navbar.Header>
                <nav className='nav navbar-nav'>
                    <li><Link to='/'>anecdotes</Link></li>
                    <li><Link to='/create'>create new</Link></li>
                    <li><Link to='/about'>about</Link></li>
                </nav>
            </div>
        </Navbar>
    )
}

const AnecdoteList = ({ anecdotes }) => (
    <Panel>
        <Panel.Heading><h2>Anecdotes</h2></Panel.Heading>
        <Panel.Body>
            <ListGroup>
                {anecdotes.map(anecdote => <ListGroupItem key={anecdote.id} ><Link to={'anecdotes/'+anecdote.id}>{anecdote.content}</Link></ListGroupItem>)}
            </ListGroup>
        </Panel.Body>
    </Panel>
)

const About = () => {
    const imgStyle = {
        width: '100%'
    }
    return (
        <Panel>
            <Panel.Heading>
                <h2>About anecdote app</h2>
            </Panel.Heading>
            <Panel.Body>
                <Col sm={9}>
                    <p>According to Wikipedia:</p>
                    
                    <em>An anecdote is a brief, revealing account of an individual person or an incident. 
                        Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself, 
                        such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative. 
                        An anecdote is "a story with a point."</em>

                    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
                </Col>
                <Col sm={3}>
                    <img style={imgStyle} src='https://upload.wikimedia.org/wikipedia/commons/0/01/LinuxCon_Europe_Linus_Torvalds_03_%28cropped%29.jpg' alt='Linus Torvalds' />
                </Col>
            </Panel.Body>
        </Panel>
    )
}

const Footer = () => (
    <Panel>
        <Panel.Body>
            Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.
            See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code.
        </Panel.Body>
    </Panel>
)

class CreateNew extends React.Component {
    constructor() {
        super()
        this.state = {
            content: '',
            author: '',
            info: '',
            submitted: false
        }
    }

    handleChange = (e) => {
        console.log(e.target.name, e.target.value)
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.addNew({
            content: this.state.content,
            author: this.state.author,
            info: this.state.info,
            votes: 0
        })
        this.setState({
            submitted: true
        })
    }

    render() {
        if(this.state.submitted) {
            return <Redirect to='/' />
        }
        return(
            <Panel>
                <Panel.Heading>
                    <h2>create a new anecdote</h2>
                </Panel.Heading>
                <Panel.Body>
                    <Form horizontal onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Col sm={1}>
                                <ControlLabel>content</ControlLabel>
                            </Col>
                            <Col sm={11}>
                                <textarea name='content' value={this.state.content} onChange={this.handleChange} className='form-control'></textarea>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col sm={1}>
                                <ControlLabel>author</ControlLabel>
                            </Col>
                            <Col sm={11}>
                                <FormControl name='author' value={this.state.author} onChange={this.handleChange} />
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col sm={2}>
                                <ControlLabel>url for more info</ControlLabel>
                            </Col>
                            <Col sm={10}>
                                <FormControl name='info' value={this.state.info} onChange={this.handleChange} />
                            </Col>
                        </FormGroup> 
                        <FormGroup>
                            <Col sm={2}>
                                <FormControl type='submit' className='btn-primary' value='create' />
                            </Col>
                        </FormGroup>
                    </Form>
                </Panel.Body>
            </Panel>    
        )

    }
}

const AnecdoteView = (props) => {
    return (
        <Panel>
            <Panel.Heading>
                <h2>{props.anecdote.content} by {props.anecdote.author}</h2>
            </Panel.Heading>
            <Panel.Body>
                <p>has {props.anecdote.votes} votes</p>
                <p>for more info see <a href={props.anecdote.info}>{props.anecdote.info}</a></p>
            </Panel.Body>
        </Panel>
    )
}

const Notification = (props) => {
    var display
    if(props.notification === '') {
        display = 'none'
    } else {
        display = 'inline-block'
    }
    const style = {
        display,
        width: '100%',
        textAlign: 'center'
    }
    const panelStyle = {
        width: '80%',
        borderColor: '#76c442',
        borderWidth: 5,
        borderRadius: 20
    }
    return (
        <div style={style}>
            <center>
                <Panel style={panelStyle}>
                    <Panel.Body>
                        {props.notification}
                    </Panel.Body>
                </Panel>
            </center>
        </div>
    )
}

class App extends React.Component {
    constructor() {
        super()

        this.state = {
            anecdotes: [
                {
                    content: 'If it hurts, do it more often',
                    author: 'Jez Humble',
                    info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
                    votes: 0,
                    id: '1'
                },
                {
                    content: 'Premature optimization is the root of all evil',
                    author: 'Donald Knuth',
                    info: 'http://wiki.c2.com/?PrematureOptimization',
                    votes: 0,
                    id: '2'
                }
            ],
            notification: ''
        }
    }

    addNew = (anecdote) => {
        anecdote.id = (Math.random() * 10000).toFixed(0)
        this.setState({ anecdotes: this.state.anecdotes.concat(anecdote) })
        this.showNotification(`A new anecdote ${anecdote.content} created!`)
    }

    anecdoteById = (id) =>
        this.state.anecdotes.find(a => a.id === id)

    vote = (id) => {
        const anecdote = this.anecdoteById(id)

        const voted = {
            ...anecdote,
            votes: anecdote.votes + 1
        }

        const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

        this.setState({ anecdotes })
    }
    
    showNotification(notification) {
        this.setState({
            notification
        })
        setTimeout(() => {
            if(this.state.notification === notification) {
                this.setState({
                    notification: ''
                })
            }
        }, 10000)
    }

    render() {
        return (
            <div>
                <Router>
                    <div>
                        <Menu />
                        <Notification notification={this.state.notification} />
                        <Route exact path='/' render={() => <AnecdoteList anecdotes={this.state.anecdotes} />} />
                        <Route path='/about' render={() => <About />} />            
                        <Route path='/create' render={() => <CreateNew addNew={this.addNew} />} />
                        <Route exact path='/anecdotes/:id' render={
                            ({match}) => <AnecdoteView anecdote={
                                this.anecdoteById(match.params.id)
                            } />
                        } />
                    </div>
                </Router>
                <Footer />
            </div>
        );
    }
}

export default App;
