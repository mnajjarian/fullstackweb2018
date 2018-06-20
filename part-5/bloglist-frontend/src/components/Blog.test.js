import React from 'react'
import { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Blog from './Blog'


describe('<Blog />', () => {
    it('after clicking name the details are displayed', () => {
        const blog = {
            title: 'title',
            author: 'author',
            url: 'url',
            likes: 2,
            user: {
                name: 'test'
            }
        }

        const user = {
            name: 'test'
        }
        const blogComponent = shallow(<Blog blog={blog} user={user} />)
        const nameDiv = blogComponent.find('.event')
        nameDiv.simulate('click')

        const detailDiv = blogComponent.find('.details')

        expect(detailDiv.getElement().props.style).toEqual({ display: '' })
    })
})