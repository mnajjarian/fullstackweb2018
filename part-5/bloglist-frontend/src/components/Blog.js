import React from 'react'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  toggleVisibility = () => {
    if(this.state.visible) {
      this.setState({ visible: this.state.visible })
    }
    this.setState({ visible: !this.state.visible })
}


  render() {
    const showWhenVisible = { display: this.state.visible ? '' : 'none' }

    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }

    const showDeleteButton = () => {
      if (this.props.blog.user.name === this.props.user.name) {
        return (
          <div>
            <button onClick={this.props.removeBlog} >delete</button>
          </div>
        )
      }
    }
    return(
    <div style={blogStyle} onClick={this.toggleVisibility} className='event' >
    {this.props.blog.title} {this.props.blog.author}
    <div style={showWhenVisible} className='details' > 
      <div >
        <a href={this.props.blog.url} >{this.props.blog.url}</a>
      </div>
      <div>
        {this.props.blog.likes} likes <button onClick={this.props.handleUpdate}>like</button>
      <div>added by {this.props.blog.user.name} </div>
      {showDeleteButton()}
      
    </div>
    </div>
    </div>
    )
  }
}

/*Blog.propTypes = {
  handleUpdate: propTypes.func.isRequired,
  removeBlog: propTypes.func.isRequired
}*/

export default Blog