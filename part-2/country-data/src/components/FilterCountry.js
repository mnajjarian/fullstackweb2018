import React from 'react'

const FilterCountry = ({countries, filter, handleClicked}) => {
    const showCountry = countries.filter(x => x.name.toLowerCase().includes(filter.toLowerCase()))
    if(showCountry.length > 10 && filter.length > 0) {
      return(
        <div>
          {'too many maches, specify another filter'}
        </div>
      )
    } else if(showCountry.length === 1) {
        return(
            <div>
                {showCountry.map(x => <div key={x.name}>
                <h1>{x.name}</h1>
                <p>Capital: {x.capital}</p>
                <p>Populations: {x.population}</p>
                <img alt='' src={x.flag} height='300' width='500' />
                </div>)}
            </div>
        )
    } else {
      return(
        <div>{showCountry.map(x => <div onClick={handleClicked(x.name)} key={x.name}>{x.name}</div>)}</div>
      )
    }
  }

  export default FilterCountry