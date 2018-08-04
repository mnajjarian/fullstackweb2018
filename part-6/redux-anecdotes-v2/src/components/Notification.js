import React from 'react'
import { connect } from 'react-redux'

class Notification extends React.Component {


  render() {
    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }
    return (
      <div style={style}>
        {this.props.message}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    message: state.message
  }
}

export default connect(
  mapStateToProps
)(Notification)
