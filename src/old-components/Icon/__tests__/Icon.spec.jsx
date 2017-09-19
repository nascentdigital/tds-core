import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { deprecate } from '../../../warn'

import Icon from '../Icon'

jest.mock('../../../warn', () => (
  { deprecate: jest.fn() }
))

describe('<Icon />', () => {
  const defaultProps = {
    glyph: 'checkmark'
  }
  const doShallow = (overrides = {}) => shallow(<Icon {...defaultProps} {...overrides} />)

  it('renders', () => {
    const icon = doShallow()

    expect(toJson(icon)).toMatchSnapshot()
  })

  it('needs a glyph', () => {
    const icon = doShallow({ glyph: 'spyglass' })

    expect(icon).toHaveClassName('icon-core-spyglass')
  })

  it('supports variants', () => {
    const icon = doShallow({ variant: 'secondary' })

    expect(icon).toHaveClassName('icon--secondary')
  })

  it('can be fixed width', () => {
    const icon = doShallow({ fixedWidth: true })

    expect(icon).toHaveClassName('icon--fw')
  })

  it('can be sized', () => {
    const icon = doShallow({ size: 'small' })

    expect(icon).toHaveClassName('icon--small')
  })

  it('supports custom CSS classes', () => {
    const icon = doShallow({ className: 'custom-class' })

    expect(icon).toHaveClassName('custom-class')
  })

  it('passes additional attributes to the icon element', () => {
    const icon = doShallow({ id: 'the-icon', role: 'button' })

    expect(icon).toHaveProp('id', 'the-icon')
    expect(icon).toHaveProp('role', 'button')
  })

  describe('deprecated props', () => {
    it('deprecates className', () => {
      jest.clearAllMocks()
      const icon = doShallow({ className: 'my-custom-class' })

      expect(icon).toHaveProp('className')
      expect(deprecate).toHaveBeenCalled()
    })

    it('deprecates style', () => {
      jest.clearAllMocks()
      const icon = doShallow({ style: 'color: hotpink' })

      expect(icon).toHaveProp('style')
      expect(deprecate).toHaveBeenCalled()
    })

    it('deprecates disabled variant', () => {
      jest.clearAllMocks()
      const icon = doShallow({ variant: 'disabled' })

      expect(icon).toHaveClassName('icon--disabled')
      expect(deprecate).toHaveBeenCalled()
    })
  })
})
