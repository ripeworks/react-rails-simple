/* global $, Turbolinks */
import { createElement } from 'react'
import { render, unmountComponentAtNode } from 'react-dom'

const ComponentHelper = {
  init (components) {
    ComponentHelper.components = components

    const {CHANGE, BEFORE_UNLOAD} = Turbolinks.EVENTS
    $(document).on(CHANGE, e => ComponentHelper.mountAll())
    $(document).on(BEFORE_UNLOAD, e => ComponentHelper.unmountAll())
  },

  // render React components into
  // placeholder elements that look like:
  // <div data-react-class="Component" data-react-props="{}"></div>
  mountAll () {
    const {components} = ComponentHelper

    $('div[data-react-class]').each((i, node) => {
      const propsRaw = node.getAttribute('data-react-props')
      const props = propsRaw ? JSON.parse(propsRaw) : {}
      const className = node.getAttribute('data-react-class')
      if (!components[className]) throw new Error(`React component ${className} not found.`)
      render(createElement(components[className], props), node)
    })
  },

  // unmount all React components
  // that were mounted with mountAll()
  unmountAll () {
    $('div[data-react-class]').each((i, node) => {
      unmountComponentAtNode(node)
    })
  }
}

export default ComponentHelper
