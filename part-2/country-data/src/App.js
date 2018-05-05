import React from 'react';
import axios from 'axios'
import FilterCountry from './components/FilterCountry'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: [],
      filter: ''
    }
  }

  componentDidMount = () => {
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      this.setState({
        countries: response.data
      })
    })
  }

  handleFilterChange = (event) => {
    this.setState({
      filter: event.target.value
    })
  }

  handleClicked = (country) => {
    return() => {
    this.setState({
      filter: country
    })
  }
}
  
  render() {
    return (
      <div>
        find countries <input value={this.state.filter} onChange={this.handleFilterChange} />
        <FilterCountry countries={this.state.countries} filter={this.state.filter} handleClicked={this.handleClicked} />
        
      </div>
    );
  }
}
export default App;
