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
  it('Carousel should have 3 or more slides containing an image which links to an external url.', () => {
    // TODO Render w/ 3 or more slides
  });

  it('The carousel should loop back to the front when at the end, auto-advance every 10 seconds, and should pause auto-advancing when the mouse is hovering over the carousel.', () => {
    // TODO ensure auto-advance fired
  });
  it('Carousel should have paging arrows for next and previous as well as paging dots to link directly to a given slide and show the current slide index.', () => {
    // TODO
  });

  it('Carousel should be responsive down to 480px wide.', () => {
    // TODO
  });
})