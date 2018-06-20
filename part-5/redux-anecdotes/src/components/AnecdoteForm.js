import React from 'react'
import PropTypes from 'prop-types'
import actionFor from '../actionCreator'

class AnecdoteForm extends React.Component {
    componentDidMount() {
        const { store } = this.context
        this.unsubscribe = store.subscribe(() =>
          this.forceUpdate()
        )
      }
    
    componentWillUnmount() {
        this.unsubscribe()
      }

    addAnecdote = (event) => {
        event.preventDefault()
        const anecdote = event.target.anecdote.value
        this.context.store.dispatch(
          actionFor.addAnecdote(anecdote)
        )
        event.target.anecdote.value = ''
      }
    render() {
        
        return(
            <div>
               <h2>create new</h2>
               <form onSubmit={this.addAnecdote} >
                 <div>
                     <input name='anecdote' />
                 </div>
                 <button type='submit' >create</button> 
               </form>
            </div>
        )
    }
}

AnecdoteForm.contextTypes = {
    store: PropTypes.object
}

export default AnecdoteForm