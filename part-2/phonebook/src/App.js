import React from 'react';
import Filter from './components/Filter'
import New from './components/New'
import Search from './components/Search'
import personService from './services/persons'
import './index.css'
import Notification from './components/Notification'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filter: '',
      error: null
    }
  }

  componentDidMount = () => {
    personService
    .getAll()
    .then(persons => {
      this.setState({persons})
    })
  }
  addName = (event) => {
    event.preventDefault()
    if(this.state.persons.find(n => n.name === this.state.newName)) {
      if(window.confirm(this.state.newName + ' is already in the list, do you want to update your stored number?')) {
        this.personUpdate()
      } else {
      return this.setState({newName: '', newNumber: ''})
      }
    } else {
    const newObject = {
      name: this.state.newName,
      number: this.state.newNumber
    }
    personService
    .create(newObject)
    .then(response => {
      const persons = this.state.persons.concat(newObject)
      this.setState({
      persons,
      newName: '',
      newNumber: '',
      error: this.state.newName + ' has been added'
    })
    setTimeout(() => {
      this.setState({error: null})
    }, 5000);
    })
  }
}
personUpdate = () => {
  const person = this.state.persons.find(n => n.name === this.state.newName)
  const changePerson = {...person, number: this.state.newNumber}

  personService
  .update(changePerson.id, changePerson)
  .then(response => {
    this.setState({
      persons: this.state.persons.map(n => n.name !== this.state.newName ? n: changePerson),
      newName: '',
      newNumber: '',
      error: this.state.newName + ' has been updated'
    })
    setTimeout(() => {
      this.setState({error: null})
    }, 5000);
  }).catch(error => {
    this.setState({error: this.state.newName + ' is already deleted.'})
  })
}

handleDelete = (id, name) => {
  return() => {
    if(window.confirm(`are you sure for delete ${name}`)) {
      personService
      .remove(id)
      .then(response => {
        const persons = this.state.persons.splice(id, 1)
        this.setState({persons, error: name + ' has been deleted'})
      })
      setTimeout(() => {
        this.setState({error: null})
      }, 5000);
    } else {
      return null
    }
  }
}
  handleNameChange = (event) => {
    this.setState({newName: event.target.value})
  }

  handleNumberChange = (event) => {
    this.setState({newNumber: event.target.value})
  }

  handleFilterChange = (event) => {
    this.setState({filter: event.target.value})
  }

  render() {
    return (
      <div>
        <h1>Phone book</h1>
        <Notification message={this.state.error} />
        <Search filter={this.state.filter} handleFilterChange={this.handleFilterChange} />
        <New handleNameChange={this.handleNameChange} handleNumberChange={this.handleNumberChange}
            addName={this.addName} newName={this.state.newName} newNumber={this.state.newNumber} />
        <Filter persons={this.state.persons} filter={this.state.filter} handleDelete={this.handleDelete} />
      </div>
    )
  }
}

export default App