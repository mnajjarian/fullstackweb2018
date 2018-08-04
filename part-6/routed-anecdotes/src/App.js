import React from 'react'
import { BrowserRouter as Router, Route, Link, Redirect, NavLink } from 'react-router-dom'
import { Table, Grid, Row, Col, FormGroup, ControlLabel, FormControl, Button, Alert,
         Nav, Navbar, NavItem } from 'react-bootstrap'

const Menu = () => (
  <div>
    <h1>Software anecdotes</h1>
  <div style={{backgroundColor: 'rgb(153, 255, 204)', padding: 5, margin: 5}} >  
    <NavLink exact to='/' activeStyle={{backgroundColor: 'grey'}} >anecdotes</NavLink> &nbsp;
    <NavLink to='/create' activeStyle={{backgroundColor: 'grey'}} >create new</NavLink> &nbsp;
    <NavLink to='/about' activeStyle={{backgroundColor: 'grey'}} >about</NavLink>
  </div>
  </div>
)

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <Table striped >
      <tbody>
      {anecdotes.map(anecdote => 
      <tr key={anecdote.id} >
      <td>
      <Link to={`/anecdotes/${anecdote.id}`}>
      {anecdote.content}</Link>
      </td>
      </tr>
    )}
    </tbody>
    </Table >  
  </div>
)

const Anecdote = ({ anecdote }) => {
  return(
    <div>
      <h2>{anecdote.content}</h2>
      <div> has {anecdote.votes} vote </div> <br />
  <div>for more info see {<a href={anecdote.info}>{anecdote.info}</a>} </div> <br />
    </div>
  )
}

const About = () => (
  <Grid>
    <Row className='show-grid' >
    <Col xs={12} md={8} >
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>
    
    <em>An anecdote is a brief, revealing account of an individual person or an incident. 
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself, 
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative. 
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </Col>
  <Col sm={6} md={4} >
  <img height='300' alt='Edsger Wybe Dijkstra' src='https://alchetron.com/cdn/edsger-w-dijkstra-001b4812-11ec-408e-8cff-d72478926bf-resize-750.jpeg'/>
  </Col>
  </Row>
  </Grid>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.

    See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code. 
  </div>
)

class CreateNew extends React.Component {
  constructor() {
    super()
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      content: '',
      author: '',
      info: ''
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
  }

  render() { 
    return(
      <div>
        <h2>Create a new anecdote</h2>
        <form onSubmit={this.handleSubmit}>
          <FormGroup>
            <ControlLabel>Content</ControlLabel>
            <FormControl
            type='text' name='content' value={this.state.content} onChange={this.handleChange} />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Author</ControlLabel>
            <FormControl type='text' name='author' value={this.state.author} onChange={this.handleChange} />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Url for more info</ControlLabel>
            <FormControl type='url' name='info' value={this.state.info} onChange={this.handleChange} />
          </FormGroup> 
          <Button bsStyle='success' type='submit' >create</Button>
        </form>
      </div>  
    )

  }
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
    this.setState({ anecdotes: this.state.anecdotes.concat(anecdote), 
      notification: 'a new anecdote Goto statement considered harmful created!' })
      setTimeout(() => {
        this.setState({ notification: ''})
      }, 10000);
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

  render() {
    const notifyStyle = {
      color: 'green',
      borderStyle: 'solid',
      borderColor: 'green',
      borderWidth: 1,
      borderRadius: 5,
      padding: 5,
      fontSize: 18,
      display: this.state.notification === '' ? 'none' : ''
    }
    const Notification = () => {
      return(
        <div style={notifyStyle}  >
          {this.state.notification}
        </div>
      )
    }
    return (
      <div className='container' >
        
        <div>
        <Router >
          <div>  
            {(this.state.notification &&
            <Alert>
              {this.state.notification}
            </Alert>
          )}
          <Navbar inverse collapseOnSelect >
            <Navbar.Header>
              <Navbar.Brand>
              Software anecdotes
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav>
                <NavItem>
                  <Link exact to='/'  >anecdotes</Link>
                </NavItem>
                <NavItem>
                  <Link to='/create'  >create new</Link>
                </NavItem>
                <NavItem>
                  <Link to='/about'  >about</Link>
                </NavItem>
              </Nav>
            </Navbar.Collapse>
          </Navbar>    
            <Route exact path='/' render={() => <AnecdoteList anecdotes={this.state.anecdotes} /> } />
            <Route path='/anecdotes/:id' render={({ match }) => 
            <Anecdote anecdote={this.anecdoteById(match.params.id)} /> } />
            <Route path='/create' render={() => 
            this.state.notification === ''
            ? <CreateNew addNew={this.addNew}/>
            : <Redirect to='/' /> }  />
            <Route path='/about' render={() => <About />} />
          </div>
        </Router>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
