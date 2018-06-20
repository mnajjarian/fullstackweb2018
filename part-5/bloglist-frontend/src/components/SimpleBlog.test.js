import React from 'react'
import { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import SimpleBlog from './SimpleBlog'

describe('<SimpleBlog />', () => {
    it('renders content', () => {
        const blog = {
        title: 'new title',
        author: 'new author',
        likes: 3
    }
    const blogComponent = shallow(<SimpleBlog blog={blog} />)
    const likeContent = blogComponent.find('.likeContent')

    expect(likeContent.text()).toContain(blog.title)
    })

    it('button is clicked twice', () => {
        const blog = {
            title: 'new title',
            author: 'new author',
            likes: 3
        }

    const mockButton = jest.fn()

    const blogComponent = shallow(
    <SimpleBlog 
    blog={blog}
    onClick={mockButton} />)

    const button = blogComponent.find('button')
    button.simulate('click')
    button.simulate('click')

    expect(mockButton.mock.calls.length).toBe(2)
    })
    
})