/* globals expect, describe, beforeAll, afterAll, it */
import { mount } from 'enzyme'
import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import sinon from 'sinon'
import { Modal, Provider } from '../../../dist'

const ESCAPE_KEY = 27
const ENTER_KEY = 13

describe('Modal', () => {
  let originalPortal
  beforeAll(() => {
    // react-test-renderer does not play nicely with ReactDOM.createPortal(), which
    // is used by Grommet's Layer component in the Modal component. To get it to
    // work without throwing an error, the ReactDOM.createPortal() method is stubbed
    // here.
    // see: https://github.com/facebook/react/issues/11565
    originalPortal = ReactDOM.createPortal
    ReactDOM.createPortal = node => node
  })

  afterAll(() => {
    ReactDOM.createPortal = originalPortal
  })

  it('renders correctly', () => {
    const component = renderer.create(
      <Provider>
        <Modal>Modal</Modal>
      </Provider>
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('Keyboard closing modals', () => {
  it('should call the callback of the top-most nested modal on Escape key press', () => {
    const firstModalSpy = sinon.spy()
    const secondModalSpy = sinon.spy()

    const component = mount(
      <Provider>
        <Modal done={firstModalSpy}>
          <Modal done={secondModalSpy}>Test</Modal>
        </Modal>
      </Provider>
    )

    // Escape key
    component
      .find('div[onKeyDown]')
      .forEach(node => node.simulate('keydown', { which: ESCAPE_KEY }))
    expect(firstModalSpy.notCalled).toBeTruthy()
    expect(secondModalSpy.calledOnce).toBeTruthy()
  })

  it('should call the callback of the only modal on Escape key press', () => {
    const modalSpy = sinon.spy()

    const component = mount(
      <Provider>
        <Modal done={modalSpy}>Test</Modal>
      </Provider>
    )

    // Escape key
    component
      .find('div[onKeyDown]')
      .forEach(node => node.simulate('keydown', { which: ESCAPE_KEY }))
    expect(modalSpy.calledOnce).toBeTruthy()
  })
})

describe('Keyboard submitting nested modals', () => {
  let originalAddEventListener
  let eventListenersMap = {}
  beforeAll(() => {
    // You cannot simulate events on the document object in enzyme, so we need to stub the `addEventListener` function.
    originalAddEventListener = window.document.addEventListener
    window.document.addEventListener = (event, cb) => {
      if (!eventListenersMap[event]) {
        eventListenersMap[event] = []
      }

      eventListenersMap[event].push(cb)
    }
  })

  afterAll(() => {
    window.document.addEventListener = originalAddEventListener
  })

  it('should call the callback of the top-most modal with done on Enter key press', () => {
    const firstModalSpy = sinon.spy()
    const secondModalSpy = sinon.spy()

    mount(
      <Provider>
        <Modal done={firstModalSpy}>
          <Modal done={secondModalSpy}>Test</Modal>
        </Modal>
      </Provider>
    )

    // Enter key
    eventListenersMap.keydown.forEach(fn =>
      fn({
        preventDefault: () => null,
        stopPropagation: () => null,
        which: ENTER_KEY
      })
    )
    expect(firstModalSpy.notCalled).toBeTruthy()
    expect(secondModalSpy.calledOnce).toBeTruthy()
  })
})
