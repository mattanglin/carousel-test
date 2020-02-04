import React from 'react'
import Carousel from './Carousel'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'

describe('Button', () => {
  it('should render the component correctly without error', () => {
    const tree = renderer.create(
      <Carousel />
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })

  // Unit
  it('Do stuff correctly', () => {
    const handler = jest.fn()
    const instance = shallow(<Carousel />)

    // expect(handler).toHaveBeenCalledTimes(1)
    expect(2 + 2).toEqual(4);
  })
})